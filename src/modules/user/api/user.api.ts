import { apiClient, type ApiEnvelope } from "@/lib/api-client";
import type { User } from "@/modules/shared/types";

/** Minimal user info returned when fetching a user by id. */
export type UserInfo = Pick<User, "first_name" | "last_name">;

export const userEndpoints = {
  user: (id: string) => `/users/${id}`,
} as const;

class UserApi {
  /** Get a single user by id, returning only their first and last name. */
  async getById(id: string): Promise<UserInfo> {
    const res = await apiClient.get<ApiEnvelope<User>>(userEndpoints.user(id));
    const { first_name, last_name } = res.data.data;
    return { first_name, last_name };
  }
}

export const userApi = new UserApi();
