"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { AUTH_ROUTES } from "@/lib/auth-options";
import { authService } from "@/modules/auth/services/auth.service";
import type {
  LoginInput,
  RegisterInput,
  RegisterPayload,
} from "@/modules/auth/types";

export function useLogin() {
  const router = useRouter();
  const { setSession } = useAuth();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async (input: LoginInput) => {
      const tokens = await authService.login(input);
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
      return authService.register(payload);
    },
    onSuccess: () => {
      router.push(AUTH_ROUTES.login);
    },
  });
}
