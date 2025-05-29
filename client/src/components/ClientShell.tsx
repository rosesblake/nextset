"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/useAuthStore";
import { Spinner } from "@/components/ui/Spinner";
import { Topbar } from "./ui/Topbar";

export function ClientShell({ children }: { children: React.ReactNode }) {
  const loadUser = useAuthStore((s) => s.loadUser);
  const isLoading = useAuthStore((s) => s.isLoading);
  const currUser = useAuthStore((s) => s.currUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (isLoading || !currUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Topbar />
      <main>{children}</main>
    </>
  );
}
