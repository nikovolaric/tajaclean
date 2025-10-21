"use client";

import Button from "@/components/Button";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TipTapImage from "@tiptap/extension-image";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { editPost, getOnePost } from "@/lib/blogActions";
import MenuBar from "./MenuBar";

function EditBlogForm() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const pathname = usePathname();
  const [blogData, setBlogData] = useState<{
    title: string;
    title_hr: string;
    html: string;
    html_hr: string;
    slug: string;
    coverImg: string;
  } | null>(null);
  const [coverImg, setCoverImg] = useState("");

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

      getOneBlogPost();
    },
    [slug, pathname],
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

  const editorHr = useEditor({
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

    if (editorHr && blogData?.html_hr) {
      editorHr.commands.setContent(blogData.html_hr);
    }
  }, [editor, blogData, editorHr]);

  async function handleAction(formData: FormData) {
    const editPostData: {
      title: string;
      html: string;
      coverImg?: File;
      title_hr?: string;
      html_hr?: string;
      slug: string;
    } = {
      title: "",
      html: "",
      slug: blogData!.slug,
    };

    if ((formData.get("coverImg") as File).name) {
      editPostData.coverImg = formData.get("coverImg") as File;
    }

    if (blogData && editor) {
      const title = formData.get("title") as string;
      const html = editor.getHTML();

      editPostData.title = title;
      editPostData.html = html;
    }

    if (blogData && editorHr) {
      const html_hr = editorHr.getHTML();
      const title_hr = formData.get("title_hr") as string;

      editPostData.title_hr = title_hr;
      editPostData.html_hr = html_hr;
    }

    if (editPostData.html === "<p></p>") {
      alert("Slovensko besedilo je obvezno!");
      return;
    }

    await editPost(editPostData);
  }

  if (slug && editor && editorHr)
    return (
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
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-black/75">
              Naslov blog objave (hrvaški)
            </label>
            <input
              className="w-full rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm"
              placeholder="Dodaj naslov (hrvaški)"
              name="title_hr"
              autoComplete="off"
              defaultValue={blogData?.title_hr}
            />
          </div>
          <div className="editor flex flex-col gap-8">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
          <hr />
          <div className="editor flex flex-col gap-8">
            <MenuBar editor={editorHr} />
            <EditorContent editor={editorHr} />
          </div>
          <hr />
          <div className="my-8 flex items-center gap-4">
            <input
              className="w-fit rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm"
              type="file"
              accept="image/*"
              name="coverImg"
              id="coverImg"
              hidden
              onChange={(e) => setCoverImg(e.target.files![0].name ?? "")}
            />
            {coverImg ? <p>{coverImg}</p> : <p>{blogData?.coverImg ?? ""}</p>}
            <label
              htmlFor="coverImg"
              className="text-secondary1 hover:text-primary cursor-pointer font-medium uppercase transition-colors duration-200"
            >
              Zamenjaj naslovno fotografijo
            </label>
          </div>
          <Button variant="primary" className="flex justify-center">
            Uredi blog objavo
          </Button>
        </form>
      </div>
    );
}

export default EditBlogForm;
