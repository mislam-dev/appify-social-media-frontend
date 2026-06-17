"use client";

import { AUTH_ROUTES } from "@/lib/auth-options";
import { authApi } from "@/modules/auth/api/auth.api";

import { useAuth } from "@/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LoginInput } from "../schema/login-schema";
import { RegisterInput, RegisterPayload } from "../schema/register-schema";

export function useLogin() {
  const router = useRouter();
  const { setSession } = useAuth();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async (input: LoginInput) => {
      const tokens = await authApi.login(input);
      await setSession(tokens);
      return tokens;
    },
    onSuccess: () => {
      router.push(AUTH_ROUTES.afterLogin);
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: (input: RegisterInput) => {
      const payload: RegisterPayload = {
        first_name: input.first_name,
        last_name: input.last_name,
        email: input.email,
        password: input.password,
      };
      return authApi.register(payload);
    },
    onSuccess: () => {
      router.push(AUTH_ROUTES.login);
    },
  });
}
