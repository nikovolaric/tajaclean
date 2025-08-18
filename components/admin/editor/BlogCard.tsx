"use client";

import Link from "next/link";
import { useState } from "react";
import { CircleAlert, Pencil, RefreshCcw, Trash2 } from "lucide-react";
import { deletePost } from "@/lib/blogActions";

function BlogCard({
  blog,
}: {
  blog: {
    title: string;
    created_at: string;
    slug: string;
  };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);

      await deletePost({ slug: blog.slug });

      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-xl border border-red-500 bg-white px-5 py-4 text-sm shadow-sm">
        <p className="flex items-center gap-4 font-semibold">
          <CircleAlert className="w-4 flex-none stroke-2" />
          Novica je bila izbrisana.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[7fr_4fr_4fr] items-center gap-y-10 rounded-xl bg-white py-4 text-sm shadow-sm">
      <p className="px-5 font-semibold">{blog.title}</p>
      <p className="text-center text-sm">
        {new Date(blog.created_at).toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <div className="flex items-center justify-center gap-5">
        <Link href={{ query: { slug: blog.slug } }}>
          <Pencil className="h-5 stroke-2" />
        </Link>
        {isLoading ? (
          <RefreshCcw className="h-5 animate-spin" />
        ) : (
          <Trash2
            className="h-5 cursor-pointer stroke-2"
            onClick={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default BlogCard;
