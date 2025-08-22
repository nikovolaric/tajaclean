"use server";

import { sendConfirmOrder, sendNewOrderNotice } from "@/config/mail";
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
  code_value,
  paid,
  sumup_id,
}: {
  buyer: Record<string, string>;
  delivery: Record<string, string>;
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
  code_value?: number;
  paid: boolean;
  sumup_id?: string;
}) {
  try {
    const updatedCart = cart.map((i) => {
      return {
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        discountPrice: i.discountPrice,
        packQ: i.packQ,
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
      code,
      notes,
      code_value,
      paid,
      sumup_id,
    };

    const { error, data } = await supabase.from("orders").insert(body).select();

    if (error) {
      throw error;
    }

    if (code)
      await supabase.rpc("increment", { x: 1, p_name: code.toUpperCase() });

    if (subscribe) {
      await fetch("https://api.sender.net/v2/subscribers", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.SENDER_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: buyer.email }),
      });
    }

    await sendConfirmOrder({
      orderId: String(data[0].id),
      buyer: { name: buyer.firstName, mail: buyer.email },
      date: new Date().toString(),
      totalPrice: generateTotalPrice(),
      cart: updatedCart,
      paymentMethod,
      deliveryCost: generateDelivery(),
      code,
    });

    await sendNewOrderNotice({
      orderId: String(data[0].id),
      buyer: {
        name: `${buyer.firstName} ${buyer.lastName}`,
        mail: buyer.email,
        address: buyer.address,
        city: buyer.city,
        postal: buyer.postal,
        phone: buyer.phone,
        company: buyer.company,
      },
      delivery: {
        name: `${delivery.firstName} ${delivery.lastName}`,
        mail: delivery.email,
        address: delivery.address,
        city: delivery.city,
        postal: delivery.postal,
        phone: delivery.phone,
      },
      totalPrice: generateTotalPrice(),
      cart: updatedCart,
      paymentMethod,
      deliveryCost: generateDelivery(),
      date: new Date().toString(),
      code,
      notes,
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
  paid,
}: {
  id: number;
  status?: string;
  paid?: boolean;
}) {
  try {
    const { error } = await supabase
      .from("orders")
      .update({ status, paid })
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

export async function getTopProductsByLastDays({
  start_date,
  end_date = new Date(),
}: {
  start_date: Date;
  end_date?: Date;
}) {
  try {
    const { data, error } = await supabase.rpc("get_top_products_last_days", {
      start_date: start_date.toISOString().split("T")[0],
      end_date: end_date.toISOString().split("T")[0],
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function getSalesByDays({
  start_date,
  end_date = new Date(),
}: {
  start_date: Date;
  end_date?: Date;
}) {
  try {
    const { data, error } = await supabase.rpc("get_daily_sales_last_days", {
      start_date: start_date.toISOString().split("T")[0],
      end_date: end_date.toISOString().split("T")[0],
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function getOrdersByDays({
  start_date,
  end_date = new Date(),
}: {
  start_date: Date;
  end_date?: Date;
}) {
  try {
    const { data, error } = await supabase.rpc("get_daily_orders_count", {
      start_date: start_date.toISOString().split("T")[0],
      end_date: end_date.toISOString().split("T")[0],
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}

export async function getAverageByDays({
  start_date,
  end_date = new Date(),
}: {
  start_date: Date;
  end_date?: Date;
}) {
  try {
    const { data, error } = await supabase.rpc(
      "get_daily_average_order_value",
      {
        start_date: start_date.toISOString().split("T")[0],
        end_date: end_date.toISOString().split("T")[0],
      },
    );

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
    const startOfNextMonth = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      1,
    );

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .gte("created_at", startOfMonth.toISOString())
      .lt("created_at", startOfNextMonth.toISOString())
      .neq("status", "Preklicano");

    if (error) {
      throw error;
    }

    return data.length;
  } catch (error) {
    return error;
  }
}

export async function getOrder({ email, id }: { email?: string; id?: string }) {
  try {
    const query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (email) {
      query.eq("buyer->>email", email);
    }

    if (id) {
      query.eq("id", id);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    return error;
  }
}
