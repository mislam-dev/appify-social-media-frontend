import { apiClient, request, type ApiEnvelope } from "@/lib/api-client";
import type { AuthTokens } from "@/lib/token-storage";
import type { User } from "@/modules/shared/types";
import { UserSchema } from "@/modules/shared/types";
import type { LoginInput, RegisterPayload } from "@/modules/auth/types";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";

const MOCK_USER: User = {
  id: "usr_dylan_field",
  first_name: "Dylan",
  last_name: "Field",
  email: "dylan@buddyscript.app",
  avatar_url: "/assets/images/profile.png",
  headline: "CEO of Figma",
};

const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export const authService = {
  async login(input: LoginInput): Promise<AuthTokens> {
    if (USE_MOCK) {
      await wait();
      if (!input.email || !input.password) {
        throw new Error("Invalid credentials");
      }
      return {
        auth_token: `mock.auth.${btoa(input.email)}`,
        refresh_token: `mock.refresh.${btoa(input.email)}`,
      };
    }

    const res = await apiClient.post<ApiEnvelope<AuthTokens>>("/auth/login", {
      email: input.email,
      password: input.password,
    });
    return res.data.data;
  },

  async register(payload: RegisterPayload): Promise<{ message: string }> {
    if (USE_MOCK) {
      await wait();
      return { message: "Registration successfully" };
    }

    const res = await apiClient.post<ApiEnvelope<null>>(
      "/auth/register",
      payload,
    );
    return { message: res.data.message };
  },

  async me(): Promise<User> {
    if (USE_MOCK) {
      await wait(300);
      return MOCK_USER;
    }

    const user = await request<User>((c) => c.get("/auth/me"));
    return UserSchema.parse(user);
  },
};
