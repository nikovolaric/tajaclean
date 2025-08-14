"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

export async function getIfVisible() {
  try {
    const { data, error } = await supabase
      .from("news")
      .select()
      .eq("id", 1)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function changeVisibility(visible: boolean) {
  try {
    const { error } = await supabase
      .from("news")
      .update({ visible })
      .eq("id", 1);

    if (error) throw error;

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}
