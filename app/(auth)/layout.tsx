"use client";
import { ReactNode, Suspense, useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks/dispatch";

function AuthLayoutClient({ children }: { children: ReactNode }) {
  const token = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (token) {
      router.push(redirectUrl);
      // console.log('asdsa');
    }
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [redirectUrl, router, token]);
  //   if (loading) {
  //     return <LoadingPage />;
  //   }

  return children;
}

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <AuthLayoutClient>{children}</AuthLayoutClient>
    </Suspense>
  );
}
