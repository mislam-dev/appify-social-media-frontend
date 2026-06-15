"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "@/modules/feed/api/comments.api";
import type {
  CreateCommentDto,
  UpdateCommentDto,
} from "@/modules/feed/api/dto";
import { feedKeys } from "@/modules/feed/hooks/queryKeys";

export function useComments(postId: string, enabled = true) {
  return useQuery({
    queryKey: feedKeys.comments(postId),
    queryFn: () => commentsApi.list(postId),
    enabled: enabled && Boolean(postId),
  });
}

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...feedKeys.comments(postId), "create"],
    mutationFn: (dto: CreateCommentDto) => commentsApi.create(postId, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: feedKeys.comments(postId),
      });
    },
  });
}

export function useUpdateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...feedKeys.comments(postId), "update"],
    mutationFn: ({ id, dto }: { id: string; dto: UpdateCommentDto }) =>
      commentsApi.update(postId, id, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: feedKeys.comments(postId),
      });
    },
  });
}

export function useDeleteComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...feedKeys.comments(postId), "delete"],
    mutationFn: (id: string) => commentsApi.remove(postId, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: feedKeys.comments(postId),
      });
    },
  });
}
