import PageTransition from "@/app/components/organisms/animations/PageTransition";
import ThoughtClient from "@/app/components/organisms/clientPages/ThoughtClient";
import { Suspense } from "react";
import LoadingPage from "../components/organisms/LoadingPage";

export default async function ThoughtsPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <PageTransition>
        <ThoughtClient />
      </PageTransition>
    </Suspense>
  );
}
