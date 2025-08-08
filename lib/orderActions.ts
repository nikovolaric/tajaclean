"use server";

import { sendConfirmOrder } from "@/config/mail";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

export async function createOrder({
  buyer,
  delivery,
  cart,
  paymentMethod,
  subscribe,
  code,
}: {
  buyer: Record<string, string>;
  delivery: unknown;
  cart: {
    id: string;
    img: string;
    name: string;
    packQ: number;
    price: number;
    quantity: number;
    discountPrice?: number;
  }[];
  paymentMethod: string;
  subscribe: boolean;
  code?: string;
}) {
  try {
    const updatedCart = cart.map((i) => {
      return {
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        discountPrice: i.discountPrice,
      };
    });
    const total_price = parseFloat(
      cart
        .reduce(
          (c, a) => c + (a.discountPrice ? a.discountPrice : a.price),
          3.2,
        )
        .toFixed(2),
    );

    const body = {
      buyer,
      delivery,
      cart: updatedCart,
      payment_method: paymentMethod,
      total_price,
      subscribe,
      status: "Nepregledano",
      id: parseFloat(
        `${new Date().toLocaleDateString("sl-SI", { year: "2-digit" })}${Math.floor(
          Math.random() * 10000,
        )
          .toString()
          .padStart(4, "0")}`,
      ),
      code,
    };

    const { error } = await supabase.from("orders").insert(body);

    if (error) {
      throw error;
    }

    if (code)
      await supabase.rpc("increment", { x: 1, name: code.toUpperCase() });

    await sendConfirmOrder({
      orderId: String(body.id),
      buyer: { name: buyer.firstName, mail: buyer.email },
      date: new Date().toString(),
      totalPrice: total_price,
      cart: updatedCart,
      paymentMethod,
    });

    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      redirect("/nakup-uspesen");
    }
    return error;
  }
}

export async function updateOrderStatus({
  id,
  status,
}: {
  id: number;
  status: string;
}) {
  try {
    const { error } = await supabase
      .from("orders")
      .update({ status: status })
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      redirect("/nakup-uspesen");
    }
    return error;
  }
}
