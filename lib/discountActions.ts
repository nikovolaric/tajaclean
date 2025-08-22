"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

export async function createDiscount(formData: FormData) {
  try {
    const data = {
      person_name: formData.get("person_name") as string,
      name: formData.get("name") as string,
      value: parseFloat(formData.get("value") as string) / 100,
      valid_until: (formData.get("validUntil") as string)
        ? new Date(formData.get("validUntil") as string)
        : null,
    };

    const { error } = await supabase.from("discounts").insert(data);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/popusti");
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}

export async function deleteDiscount(id: string) {
  try {
    const { error } = await supabase.from("discounts").delete().eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/popusti");
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}

export async function getOneDiscount(id: string) {
  try {
    const { data, error } = await supabase
      .from("discounts")
      .select()
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}

export async function getOneDiscountByName(name: string) {
  try {
    const { data, error } = await supabase
      .from("discounts")
      .select()
      .eq("name", name.toUpperCase())
      .eq("paused", false)
      .or(`valid_until.is.null,valid_until.gte.${new Date().toISOString()}`)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}

export async function updateDiscount(formData: FormData, id: string) {
  try {
    const data = {
      name: formData.get("name") as string,
      value: parseFloat(formData.get("value") as string) / 100,
      valid_until: (formData.get("validUntil") as string)
        ? new Date(formData.get("validUntil") as string)
        : null,
    };

    const { error } = await supabase
      .from("discounts")
      .update(data)
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/popusti");
    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT")
      redirect("/admin/popusti");
    console.log(error);
    return error as Error;
  }
}

export async function pauseDiscount(id: string) {
  try {
    const { error } = await supabase
      .from("discounts")
      .update({ paused: true })
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/popusti");
    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT")
      redirect("/admin/popusti");
    console.log(error);
    return error as Error;
  }
}

export async function playDiscount(id: string) {
  try {
    const { error } = await supabase
      .from("discounts")
      .update({ paused: false })
      .eq("id", id);

    if (error) {
      throw error;
    }

    revalidatePath("/admin/popusti");
    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT")
      redirect("/admin/popusti");
    console.log(error);
    return error as Error;
  }
}

export async function getAllDiscounts() {
  try {
    const { data, error } = await supabase.from("discounts").select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}

export async function getDiscountIncome(name: string) {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("total_price")
      .eq("code", name.toUpperCase());

    if (error) {
      throw error;
    }

    const income = data.reduce((c, a) => c + a.total_price, 0);

    return income;
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}

export async function getIncomeByDiscounts({
  start_date,
  end_date = new Date(),
}: {
  start_date: Date;
  end_date?: Date;
}) {
  try {
    const { data, error } = await supabase.rpc("get_orders_summary", {
      start_date: start_date.toISOString().split("T")[0],
      end_date: end_date.toISOString().split("T")[0],
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    return error as Error;
  }
}
