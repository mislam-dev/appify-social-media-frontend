"use client";

import { postsApi } from "@/modules/feed/api/posts.api";
import { feedKeys } from "@/modules/feed/hooks/queryKeys";
import type { CreatePostInput } from "@/modules/feed/types";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export { feedKeys };

const PAGE_SIZE = 10;

export function usePosts() {
  return useInfiniteQuery({
    queryKey: feedKeys.posts(),
    queryFn: ({ pageParam }) => postsApi.list(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: ({ meta }) =>
      meta.page < meta.total_pages ? meta.page + 1 : undefined,
    select: (data) => ({
      ...data,
      flat: data.pages.flatMap((p) => p.items),
    }),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...feedKeys.posts(), "create"],
    mutationFn: (input: CreatePostInput) => postsApi.create(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: feedKeys.posts() });
    },
  });
}
