"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { AUTH_ROUTES } from "@/lib/auth-options";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(AUTH_ROUTES.afterLogin);
    }
  }, [isAuthenticated, router]);

  if (status === "authenticated") return null;

  return <>{children}</>;
}
