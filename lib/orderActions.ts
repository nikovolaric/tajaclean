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
  notes,
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
  notes?: string;
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
    const total = parseFloat(
      cart
        .reduce(
          (c, a) =>
            c +
            (a.discountPrice
              ? a.discountPrice * a.quantity
              : a.price * a.quantity),
          0,
        )
        .toFixed(2),
    );

    function generateTotalPrice() {
      if (paymentMethod === "povzetje" && total < 40) {
        return total + 5.5;
      }
      if (paymentMethod !== "povzetje" && total < 40) {
        return total + 3.2;
      }
      return total;
    }

    function generateDelivery() {
      if (paymentMethod === "povzetje" && total < 40) {
        return 5.5;
      }
      if (paymentMethod !== "povzetje" && total < 40) {
        return 3.2;
      }
      return 0;
    }

    const body = {
      buyer,
      delivery,
      cart: updatedCart,
      payment_method: paymentMethod,
      total_price: generateTotalPrice(),
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
      notes,
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
      totalPrice: generateTotalPrice(),
      cart: updatedCart,
      paymentMethod,
      deliveryCost: generateDelivery(),
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

export async function getTopProductsByMonth(date = new Date()) {
  try {
    const { data, error } = await supabase.rpc("get_top_products_by_month", {
      target_month: date,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function getTotalOrdersByMonth(date = new Date()) {
  try {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const startOfNextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .gte("created_at", startOfMonth.toISOString())
      .lt("created_at", startOfNextMonth.toISOString());

    if (error) {
      throw error;
    }

    return data.length;
  } catch (error) {
    return error;
  }
}
