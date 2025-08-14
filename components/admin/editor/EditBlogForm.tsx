"use client";

import Button from "@/components/Button";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TipTapImage from "@tiptap/extension-image";
import { X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MenuBar from "./MenuBar";
import { editPost, getOnePost } from "@/lib/blogActions";

function EditBlogForm() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [blogData, setBlogData] = useState<{
    title: string;
    html: string;
    slug: string;
  } | null>(null);

  useEffect(
    function () {
      async function getOneBlogPost() {
        try {
          if (slug) {
            const data = await getOnePost({ slug });

            setBlogData(data);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (slug) {
        getOneBlogPost();
      }
    },
    [slug],
  );

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextStyleKit,
      TipTapImage,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[156px] border border-black/50 shadow-xs rounded-lg bg-white py-2 px-3 outline-none",
      },
    },
  });

  useEffect(() => {
    if (editor && blogData?.html) {
      editor.commands.setContent(blogData.html);
    }
  }, [editor, blogData]);

  async function handleAction(formData: FormData) {
    if (blogData && editor) {
      const title = formData.get("title") as string;
      const html = editor.getHTML();

      await editPost({ html, title, slug: blogData.slug });
    }
  }

  if (slug && editor)
    return (
      <EditorContext.Provider value={{ editor }}>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Dodaj novo blog objavo</p>
          <form
            className="relative flex flex-col gap-4 rounded-xl bg-white px-5 py-4 text-sm shadow-sm"
            action={handleAction}
          >
            <Link href="/admin/urejevalnik">
              <X className="absolute top-4 right-6 h-5 stroke-2 text-black/25" />
            </Link>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-black/75">
                Naslov blog objave
              </label>
              <input
                className="w-full rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm"
                placeholder="Dodaj naslov"
                name="title"
                autoComplete="off"
                defaultValue={blogData?.title}
              />
            </div>
            <div className="editor flex flex-col gap-8">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} />
            </div>
            <Button variant="primary" className="flex justify-center">
              Uredi blog objavo
            </Button>
          </form>
        </div>
      </EditorContext.Provider>
    );
}

export default EditBlogForm;
