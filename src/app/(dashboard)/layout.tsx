"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { AUTH_ROUTES } from "@/lib/auth-options";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(AUTH_ROUTES.login);
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0f2f5]">
        <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#1890ff] border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
