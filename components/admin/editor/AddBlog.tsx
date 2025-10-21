"use client";

import Button from "@/components/Button";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TipTapImage from "@tiptap/extension-image";
import { Dispatch, SetStateAction, useState } from "react";
import { addPost } from "@/lib/blogActions";
import MenuBar from "./MenuBar";

function AddBlog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="grid grid-cols-[4fr_5fr] gap-x-5">
        <div />
        <Button
          variant="primary"
          className="flex justify-center"
          onClick={() => setIsOpen((isOpen) => !isOpen)}
        >
          {isOpen ? "Zapri obrazec" : "+  Dodaj novo blog objavo"}
        </Button>
      </div>
      {isOpen && <AddNoticeForm setIsOpen={setIsOpen} />}
    </>
  );
}

function AddNoticeForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [coverImg, setCoverImg] = useState("");

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

  async function handleAction(formData: FormData) {
    try {
      const addPostData: {
        title: string;
        html: string;
        coverImg: File;
        title_hr?: string;
        html_hr?: string;
      } = {
        title: "",
        html: "",
        coverImg: formData.get("coverImg") as File,
      };

      if (editor) {
        const html = editor.getHTML();
        const title = formData.get("title") as string;

        addPostData.title = title;
        addPostData.html = html;
      }

      if (editorHr) {
        const html_hr = editorHr.getHTML();
        const title_hr = formData.get("title_hr") as string;

        addPostData.title_hr = title_hr;
        addPostData.html_hr = html_hr;
      }

      if (addPostData.html === "<p></p>") {
        alert("Slovensko besedilo je obvezno!");
        return;
      }

      if (!addPostData.coverImg.name) {
        alert("Naslovna fotografije je obvezna.");
        return;
      }

      await addPost(addPostData);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (!editor || !editorHr) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">Dodaj novo blog objavo</p>
      <form
        className="flex flex-col gap-4 rounded-xl bg-white px-5 py-4 text-sm shadow-sm"
        action={handleAction}
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-black/75">
            Naslov blog objave
          </label>
          <input
            className="w-full rounded-xl border border-black/25 px-4 py-6 text-sm shadow-sm"
            placeholder="Dodaj naslov"
            name="title"
            required
            autoComplete="off"
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
          {coverImg && <p>{coverImg}</p>}
          <label
            htmlFor="coverImg"
            className="text-secondary1 hover:text-primary cursor-pointer font-medium uppercase transition-colors duration-200"
          >
            Dodaj naslovno fotografijo
          </label>
        </div>
        <Button variant="primary" className="flex justify-center">
          Objavi blog objavo
        </Button>
      </form>
    </div>
  );
}

export default AddBlog;
