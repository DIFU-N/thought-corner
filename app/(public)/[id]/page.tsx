"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getThought } from "@/app/utils/services/api";
import { Thought } from "@/app/utils/types/thoughts";
import Link from "next/link";
import LoadingPage from "@/app/components/organisms/LoadingPage";
import Youtube from "@tiptap/extension-youtube";
import ThemeToggle from "@/app/components/molecules/themetoggle/ThemeToggle";

export default function ThoughtPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [thought, setThought] = useState<Thought | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize editor only **after thought is loaded**
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Youtube.configure({
          controls: true,
          nocookie: true,
        }),
      ],
      content: thought?.body ?? "",
      editable: false,
      immediatelyRender: false,
    },
    [thought],
  );

  useEffect(() => {
    if (id) {
      getThought(id)
        .then((data) => setThought(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <LoadingPage />;
  if (!thought) return <p>No thought found.</p>;

  const date = new Date(thought.date);

  return (
    <div className="min-h-screen justify-center w-full max-w-full bg-white dark:bg-black dark:text-white pt-32 px-[10%] md:px-[20%]">
      <div>
        <ThemeToggle />
      </div>
      <div className="flex justify-between">
        <div className="mx-5 flex flex-col gap-2 mb-6">
          <h1 className="text-4xl md:text-6xl font-serif">{thought.title}</h1>
          <p className="text-md font-serif text-gray-500">{thought.subtitle}</p>
          <p className="text-xs font-serif text-gray-500">
            {date.toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <Link
          href={`/addthought?id=${thought.id}`}
          className="px-4 py-2 bg-black dark:border dark:border-white mt-4 h-8 text-xs text-white rounded hover:bg-blue-700"
        >
          Edit
        </Link>
      </div>

      <div className="prose prose-thought">
        {editor ? (
          <EditorContent editor={editor} className="bg-white" />
        ) : (
          <p>Loading editor...</p>
        )}
      </div>
    </div>
  );
}
