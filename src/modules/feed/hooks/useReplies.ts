"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { repliesApi } from "@/modules/feed/api/replies.api";
import type { CreateReplyDto, UpdateReplyDto } from "@/modules/feed/api/dto";
import { feedKeys } from "@/modules/feed/hooks/queryKeys";

export function useReplies(commentId: string, enabled = false) {
  return useQuery({
    queryKey: feedKeys.replies(commentId),
    queryFn: () => repliesApi.list(commentId),
    enabled: enabled && Boolean(commentId),
  });
}

export function useCreateReply(commentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...feedKeys.replies(commentId), "create"],
    mutationFn: (dto: CreateReplyDto) => repliesApi.create(commentId, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: feedKeys.replies(commentId),
      });
    },
  });
}

export function useUpdateReply(commentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...feedKeys.replies(commentId), "update"],
    mutationFn: ({ id, dto }: { id: string; dto: UpdateReplyDto }) =>
      repliesApi.update(commentId, id, dto),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: feedKeys.replies(commentId),
      });
    },
  });
}

export function useDeleteReply(commentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [...feedKeys.replies(commentId), "delete"],
    mutationFn: (id: string) => repliesApi.remove(commentId, id),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: feedKeys.replies(commentId),
      });
    },
  });
}
