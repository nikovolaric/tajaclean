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
      name: formData.get("name") as string,
      value: parseFloat(formData.get("value") as string) / 100,
      valid_until: formData.get("validUntil") as string,
    };

    const { error } = await supabase.from("discounts").insert(data);

    if (error) {
      return error;
    }

    revalidatePath("/admin/popusti");
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function deleteDiscount(id: string) {
  try {
    const { error } = await supabase.from("discounts").delete().eq("id", id);

    if (error) {
      return error;
    }

    revalidatePath("/admin/popusti");
  } catch (error) {
    console.log(error);
    return error;
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
      return error;
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateDiscount(formData: FormData, id: string) {
  try {
    const data = {
      name: formData.get("name") as string,
      value: parseFloat(formData.get("value") as string) / 100,
      valid_until: formData.get("validUntil") as string,
    };

    const { error } = await supabase
      .from("discounts")
      .update(data)
      .eq("id", id);

    if (error) {
      return error;
    }

    revalidatePath("/admin/popusti");
    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT")
      redirect("/admin/popusti");
    console.log(error);
    return error;
  }
}
