"use client";
import Youtube from "@tiptap/extension-youtube";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Plugin } from "prosemirror-state";
import React from "react";

type Props = {
  value: any;
  onChange: (content: any) => void;
};

const YoutubeWithPaste = Youtube.extend({
  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          handlePaste: (view, event) => {
            const text = event.clipboardData?.getData("text/plain");

            if (!text) return false;

            const isYoutube = /youtube\.com|youtu\.be/.test(text);

            if (isYoutube) {
              this.editor.commands.setYoutubeVideo({
                src: text,
                width: 500,
                height: 350,
              });

              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});

const RichTextEditor: React.FC<Props> = ({ value, onChange }) => {
  const [height, setHeight] = React.useState(480);
  const [width, setWidth] = React.useState(640);

  const editor = useEditor({
    extensions: [
      StarterKit,
      YoutubeWithPaste.configure({
        controls: false,
        nocookie: true,
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {
      onChange(editor.getJSON());
    },
  });

  if (!editor) return null;

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor!.commands.setYoutubeVideo({
        src: url,
        width: 500,
        height: 350,
      });
    }
  };

  return (
    <div
      className="border-y border-black text-xs"
      onClick={() => editor.commands.focus()}
    >
      {/* Toolbar */}
      <div className="flex gap-2 border-b p-2 ">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-gray-300" : ""}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-gray-300" : ""}
        >
          Italics
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
          }
        >
          H1
        </button>
        {/* <button type="button" onClick={addYoutubeVideo}>
          Video
        </button> */}
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="text-white bg-black m-4" />
    </div>
  );
};

export default RichTextEditor;
