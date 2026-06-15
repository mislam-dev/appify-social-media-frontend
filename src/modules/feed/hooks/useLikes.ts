"use client";

import { commentLikesApi } from "@/modules/feed/api/comment-likes.api";
import { postLikesApi } from "@/modules/feed/api/post-likes.api";
import { feedKeys } from "@/modules/feed/hooks/queryKeys";
import { Paginated } from "@/modules/shared/types";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { LikeEntity } from "../api";

export function usePostLikes(postId: string, enabled = false) {
  return useInfiniteQuery({
    queryKey: feedKeys.postLikes(postId),
    queryFn: ({ pageParam }) => postLikesApi.list(postId, pageParam ?? 1, 100),
    enabled: enabled && Boolean(postId),
    initialPageParam: 1,
    getNextPageParam: (res: Paginated<LikeEntity>) => {
      const { page, total_pages } = res.meta;
      return page < total_pages ? page + 1 : undefined;
    },
    select: (data) => {
      return {
        ...data,
        flat: data.pages.flatMap((p) => p.items),
      };
    },
  });
}

export function useTogglePostLike(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...feedKeys.postLikes(postId), "toggle"],
    mutationFn: () => postLikesApi.toggle(postId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: feedKeys.postLikes(postId),
      });
    },
  });
}

export function useCommentLikes(commentId: string, enabled = false) {
  return useQuery({
    queryKey: feedKeys.commentLikes(commentId),
    queryFn: () => commentLikesApi.list(commentId),
    enabled: enabled && Boolean(commentId),
  });
}

export function useToggleCommentLike(commentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...feedKeys.commentLikes(commentId), "toggle"],
    mutationFn: () => commentLikesApi.toggle(commentId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: feedKeys.commentLikes(commentId),
      });
    },
  });
}
