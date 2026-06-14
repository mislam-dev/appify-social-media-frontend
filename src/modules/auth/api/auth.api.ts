import { apiClient, type ApiEnvelope } from "@/lib/api-client";
import type { AuthTokens } from "@/lib/token-storage";
import type { LoginInput, RegisterPayload } from "@/modules/auth/types";
import type { User } from "@/modules/shared/types";

class AuthApi {
  async login(input: LoginInput): Promise<AuthTokens> {
    const res = await apiClient.post<ApiEnvelope<AuthTokens>>("/auth/login", {
      email: input.email,
      password: input.password,
    });
    return res.data.data;
  }

  async register(payload: RegisterPayload): Promise<{ message: string }> {
    const res = await apiClient.post<ApiEnvelope<null>>(
      "/auth/register",
      payload,
    );

    return { message: res.data.message };
  }

  async me(): Promise<User> {
    const res = await apiClient.get<ApiEnvelope<User>>("/auth/me");
    return res.data.data;
  }
}

export const authApi = new AuthApi();
