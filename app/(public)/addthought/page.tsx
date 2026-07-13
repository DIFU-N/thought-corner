"use client";

import ThemeToggle from "@/app/components/molecules/themetoggle/ThemeToggle";
import AddThoughtForm from "@/app/components/organisms/forms/AddThoughtForm";
import { getThought } from "@/app/utils/services/api";
import { Thought } from "@/app/utils/types/thoughts";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const AddThoughtsClient = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // will be null for new thoughts

  const [thought, setThought] = useState<Thought | null>(null);

  useEffect(() => {
    if (id) {
      getThought(id).then(setThought);
    }
  }, [id]);

  return (
    <div className="min-h-screen dark:bg-black">
      <div className="p-4 flex justify-end w-full">
        <ThemeToggle />
      </div>
      <div className="justify-center flex w-full max-w-full pt-20 lg:pt-32 px-[10%] md:px-[12%]">
        <AddThoughtForm thought={thought} />
      </div>
    </div>
  );
};

function AddThoughts() {
  return (
    <Suspense>
      <AddThoughtsClient />
    </Suspense>
  );
}
export default AddThoughts;
