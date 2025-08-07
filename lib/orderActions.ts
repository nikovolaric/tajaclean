"use server";

import { createClient } from "@supabase/supabase-js";
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
}: {
  buyer: unknown;
  delivery: unknown;
  cart: {
    id: string;
    img: string;
    name: string;
    packQ: number;
    price: number;
    quantity: number;
  }[];
  paymentMethod: string;
  subscribe: boolean;
}) {
  try {
    const updatedCart = cart.map((i) => {
      return { name: i.name, price: i.price, qunatity: i.quantity };
    });
    const total_price = parseFloat(
      cart.reduce((c, a) => c + a.price, 3.2).toFixed(2),
    );

    const body = {
      buyer,
      delivery,
      cart: updatedCart,
      payment_method: paymentMethod,
      total_price,
      subscribe,
      status: "Nepregledano",
    };

    const { error } = await supabase.from("orders").insert(body);

    if (error) {
      throw error;
    }

    // redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT") {
      redirect("/nakup-uspesen");
    }
  }
}
