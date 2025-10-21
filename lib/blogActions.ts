"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

export async function getAllBlogPosts({ hr }: { hr?: boolean }) {
  try {
    const query = supabase
      .from("blog")
      .select()
      .order("created_at", { ascending: false })
      .neq("title", null);

    if (hr) {
      query.neq("title_hr", null);
    }

    const { data, error } = await query;

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
  title_hr = null,
  html_hr = null,
  coverImg,
}: {
  title: string;
  html: string;
  title_hr?: string | null;
  html_hr?: string | null;
  coverImg: File;
}) {
  try {
    const data = {
      title,
      html,
      title_hr,
      html_hr,
      slug: slugify(title, { lower: true, trim: true }),
      coverImg: coverImg.name,
    };

    const { error } = await supabase.from("blog").insert(data);

    if (error) throw error;

    const { error: imgError } = await supabase.storage
      .from("blog")
      .upload(data.coverImg, coverImg);

    if (imgError) throw error;

    revalidatePath("/blog");
    revalidatePath("/admin/urejevalnik");
  } catch (error) {
    console.log(error);
  }
}

export async function editPost({
  title,
  html,
  title_hr = null,
  html_hr = null,
  coverImg,
  slug,
}: {
  title: string;
  html: string;
  title_hr?: string | null;
  html_hr?: string | null;
  coverImg?: File;
  slug: string;
}) {
  try {
    if (coverImg) {
      const { data: oldData, error: oldError } = await supabase
        .from("blog")
        .select()
        .eq("slug", slug)
        .single();

      if (oldError) {
        throw oldError;
      }

      await supabase.storage.from("blog").remove([oldData.coveImg]);
    }

    const data: {
      title: string;
      html: string;
      title_hr?: string | null;
      html_hr?: string | null;
      coverImg?: string;
      slug: string;
    } = {
      title,
      html,
      title_hr,
      html_hr,
      slug: slugify(title, { lower: true, trim: true }),
    };

    if (coverImg) {
      data.coverImg = coverImg.name;
    }

    console.log(data);

    const { error } = await supabase
      .from("blog")
      .update(data)
      .eq("slug", slug)
      .select();

    if (error) throw error;

    if (data.coverImg && coverImg) {
      const { error: imgError } = await supabase.storage
        .from("blog")
        .upload(data.coverImg, coverImg);

      if (imgError) throw error;
    }

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
