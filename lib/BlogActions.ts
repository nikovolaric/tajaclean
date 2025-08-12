"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

export async function getAllBlogPosts() {
  try {
    const { data, error } = await supabase.from("blog").select();

    if (error) {
      throw error;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}
