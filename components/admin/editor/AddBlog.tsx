"use client";

import Button from "@/components/Button";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import TipTapImage from "@tiptap/extension-image";
import { Dispatch, SetStateAction, useState } from "react";
import MenuBar from "./MenuBar";
import { addPost } from "@/lib/blogActions";

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

  async function handleAction(formData: FormData) {
    try {
      if (editor) {
        const html = editor.getHTML();
        const title = formData.get("title") as string;

        if (html && title) {
          await addPost({ title, html });
        }

        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (!editor) {
    return <></>;
  }

  return (
    <EditorContext.Provider value={{ editor }}>
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
              autoComplete="off"
            />
          </div>
          <div className="editor flex flex-col gap-8">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
          </div>
          <Button variant="primary" className="flex justify-center">
            Objavi blog objavo
          </Button>
        </form>
      </div>
    </EditorContext.Provider>
  );
}

export default AddBlog;
