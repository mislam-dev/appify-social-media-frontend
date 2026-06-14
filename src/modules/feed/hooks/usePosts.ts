"use client";

import { feedService } from "@/modules/feed/services/feed.service";
import type { CreatePostInput, Post } from "@/modules/feed/types";
import type { Paginated } from "@/modules/shared/types";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const feedKeys = {
  all: ["feed"] as const,
  posts: () => [...feedKeys.all, "posts"] as const,
};

const PAGE_SIZE = 5;

export function usePosts() {
  return useInfiniteQuery({
    queryKey: feedKeys.posts(),
    queryFn: ({ pageParam }) => feedService.getPosts(pageParam, PAGE_SIZE),
    initialPageParam: 1,
    getNextPageParam: (lastPage: Paginated<Post>) => {
      const { page, total_pages } = lastPage.meta;
      return page < total_pages ? page + 1 : undefined;
    },
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
    mutationFn: (input: CreatePostInput) => feedService.createPost(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: feedKeys.posts() });
    },
  });
}
