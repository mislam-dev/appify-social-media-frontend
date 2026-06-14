"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { tokenStorage, type AuthTokens } from "@/lib/token-storage";
import { authApi } from "@/modules/auth/api/auth.api";
import type { User } from "@/modules/shared/types";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  isAuthenticated: boolean;

  setSession: (tokens: AuthTokens) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {

    let active = true;

    void (async () => {
      await Promise.resolve();
      if (!active) return;

      const tokens = tokenStorage.get();
      if (!tokens) {
        setStatus("unauthenticated");
        return;
      }
      try {
        const profile = await authApi.me();
        if (!active) return;
        setUser(profile);
        setStatus("authenticated");
      } catch {
        tokenStorage.clear();
        if (!active) return;
        setUser(null);
        setStatus("unauthenticated");
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const setSession = useCallback(async (tokens: AuthTokens) => {
    tokenStorage.set(tokens);
    setStatus("loading");
    const profile = await authApi.me();
    setUser(profile);
    setStatus("authenticated");
  }, []);

  const logout = useCallback(() => {
    tokenStorage.clear();
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      isAuthenticated: status === "authenticated",
      setSession,
      logout,
    }),
    [user, status, setSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
