"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

export async function getAllBlogPosts() {
  try {
    const { data, error } = await supabase
      .from("blog")
      .select()
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function addPost({
  title,
  html,
}: {
  title: string;
  html: string;
}) {
  try {
    const data = {
      title,
      html,
      slug: slugify(title, { lower: true, trim: true }),
    };

    const { error } = await supabase.from("blog").insert(data);

    if (error) throw error;

    revalidatePath("/blog");
    revalidatePath("/admin/urejevalnik");
  } catch (error) {
    console.log(error);
  }
}

export async function editPost({
  title,
  html,
  slug,
}: {
  title: string;
  html: string;
  slug: string;
}) {
  try {
    const data = {
      title,
      html,
      slug: slugify(title, { lower: true, trim: true }),
    };

    const { error } = await supabase.from("blog").update(data).eq("slug", slug);

    if (error) throw error;

    revalidatePath("/blog");
    revalidatePath("/admin/urejevalnik");
    redirect("/");
  } catch (error) {
    if ((error as Error).message === "NEXT_REDIRECT")
      redirect("/admin/urejevalnik");
    console.log(error);
  }
}

export async function getOnePost({ slug }: { slug: string }) {
  try {
    const { data, error } = await supabase
      .from("blog")
      .select()
      .eq("slug", slug)
      .single();

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function deletePost({ slug }: { slug: string }) {
  try {
    const { error } = await supabase.from("blog").delete().eq("slug", slug);

    if (error) throw error;

    revalidatePath("/blog");
    revalidatePath("/admin/urejevalnik");
  } catch (error) {
    console.log(error);
  }
}
