"use client";

import { userApi } from "@/modules/user/api/user.api";
import { userKeys } from "@/modules/user/hooks/queryKeys";
import { useQuery } from "@tanstack/react-query";

export { userKeys };

/** Fetch a single user by id (returns only first_name and last_name). */
export function useUser(id: string) {
  return useQuery({
    queryKey: userKeys.user(id),
    queryFn: () => userApi.getById(id),
    enabled: Boolean(id),
  });
}
