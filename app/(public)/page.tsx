import PageTransition from "@/app/components/organisms/animations/PageTransition";
import ThoughtClient from "@/app/components/organisms/clientPages/ThoughtClient";
import { Suspense } from "react";

export default async function ThoughtsPage() {
  return (
    <Suspense>
      <PageTransition>
        <ThoughtClient />
      </PageTransition>
    </Suspense>
  );
}
