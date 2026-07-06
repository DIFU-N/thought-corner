"use client";

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
    <div className="min-h-screen flex justify-center w-full max-w-full bg-white pt-20 lg:pt-32 px-[10%] md:px-[12%]">
      <AddThoughtForm thought={thought} />
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
