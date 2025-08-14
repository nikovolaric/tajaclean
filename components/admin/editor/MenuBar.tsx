import type { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Image as ImageIcon,
  Link,
  List,
  ListOrdered,
} from "lucide-react";
import React, { useCallback } from "react";

function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      const data = {
        isBold: ctx.editor.isActive("bold"),
        canBold: ctx.editor.can().chain().focus().toggleBold().run(),
        isItalic: ctx.editor.isActive("italic"),
        canItalic: ctx.editor.can().chain().focus().toggleItalic().run(),
        canClearMarks: ctx.editor.can().chain().focus().unsetAllMarks().run(),
        isParagraph: ctx.editor.isActive("paragraph"),
        isHeading1: ctx.editor.isActive("heading", { level: 1 }),
        isHeading2: ctx.editor.isActive("heading", { level: 2 }),
        isHeading3: ctx.editor.isActive("heading", { level: 3 }),
        isBulletList: ctx.editor.isActive("bulletList"),
        isOrderedList: ctx.editor.isActive("orderedList"),
        canUndo: ctx.editor.can().chain().focus().undo().run(),
        canRedo: ctx.editor.can().chain().focus().redo().run(),
        isLeft: ctx.editor.isActive({ textAlign: "left" }),
        isRight: ctx.editor.isActive({ textAlign: "right" }),
        isCenter: ctx.editor.isActive({ textAlign: "center" }),
        isJustify: ctx.editor.isActive({ textAlign: "justify" }),
        isLink: ctx.editor.isActive("link"),
      };

      return data;
    },
  });

  const addImage = useCallback(() => {
    const url = window.prompt("Vnesi URL slike");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const addLink = useCallback(() => {
    const url = window.prompt("Vnesi URL");

    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-black/50 bg-white px-4 py-1 shadow-xs">
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        disabled={!editorState.canBold}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isBold ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        B
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        disabled={!editorState.canItalic}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-medium italic ${editorState.isItalic ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        I
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setParagraph().run();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isParagraph ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        Paragraph
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isHeading1 ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        H1
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isHeading2 ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        H2
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleHeading({ level: 3 }).run();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isHeading3 ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        H3
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("left").run();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isLeft ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        <AlignLeft />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("center").run();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isCenter ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        <AlignCenter />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("right").run();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isRight ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        <AlignRight />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setTextAlign("justify").run();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isJustify ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        <AlignJustify />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isBulletList ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        <List />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isOrderedList ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        <ListOrdered />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleLink().run();
          if (!editorState.isLink) addLink();
        }}
        className={`cursor-pointer rounded-lg px-2 py-0.5 font-bold ${editorState.isLink ? "bg-secondary1 text-white" : "bg-gray-100"}`}
      >
        <Link />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setHorizontalRule().run();
        }}
        className="cursor-pointer rounded-lg bg-gray-100 px-2 py-0.5 font-bold"
      >
        Horizontal
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().setHardBreak().run();
        }}
        className="cursor-pointer rounded-lg bg-gray-100 px-2 py-0.5 font-bold"
      >
        Prelom
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          addImage();
        }}
        className="cursor-pointer rounded-lg bg-gray-100 px-2 py-0.5 font-bold"
      >
        <ImageIcon />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        disabled={!editorState.canUndo}
        className="cursor-pointer rounded-lg bg-gray-100 px-2 py-0.5 font-bold"
      >
        Undo
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().redo().run();
        }}
        disabled={!editorState.canRedo}
        className="cursor-pointer rounded-lg bg-gray-100 px-2 py-0.5 font-bold"
      >
        Redo
      </button>
    </div>
  );
}

export default MenuBar;
