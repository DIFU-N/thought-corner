"use client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "@/app/redux/store";
import { useAppDispatch } from "@/app/hooks/dispatch";
import { useEffect } from "react";
import { checkAuth } from "@/app/redux/thunks/authThunks";
import { readThoughts } from "@/app/redux/thunks/thoughtThunks";

const queryClient = new QueryClient();

function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(readThoughts());
  }, [dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthBootstrap>{children}</AuthBootstrap>
      </QueryClientProvider>
    </Provider>
  );
}
