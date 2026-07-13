import { Suspense } from "react";
import Email from "../components/atoms/email/email";
import Social from "../components/atoms/social/social";
import LoadingPage from "../components/organisms/LoadingPage";
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="w-full max-w-full overflow-x-hidden">
        <Social />
        <Email />
        {children}
      </div>
    </Suspense>
  );
}
