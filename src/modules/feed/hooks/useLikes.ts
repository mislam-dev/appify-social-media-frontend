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
import { useState } from "react";
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
        isLiked: data.pages[0]?.meta.is_liked ?? false,
        likeCount: data.pages[0]?.meta.total ?? 0,
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

/**
 * Encapsulates the like state for a single comment or reply: fetches the
 * likers, derives whether the current user has liked it, and exposes an
 * optimistic toggle. Reused by both comments and replies (a reply is a
 * comment with its own id, so the same `commentLikes` endpoint applies).
 */
export function useCommentLikeState(commentId: string) {
  const { data: likes } = useCommentLikes(commentId, true);
  const toggle = useToggleCommentLike(commentId);

  const likeCount = likes?.meta.total ?? likes?.items.length ?? 0;
  const serverLiked = Boolean(likes?.meta.is_liked);

  // Local optimistic mirror, re-synced during render when the server value
  // changes (React's recommended alternative to an effect).
  const [liked, setLiked] = useState(serverLiked);
  const [prevServerLiked, setPrevServerLiked] = useState(serverLiked);
  if (serverLiked !== prevServerLiked) {
    setPrevServerLiked(serverLiked);
    setLiked(serverLiked);
  }

  const displayCount = likeCount + (liked === serverLiked ? 0 : liked ? 1 : -1);

  const toggleLike = () => {
    setLiked((v) => !v);
    toggle.mutate(undefined, {
      onSuccess: (res) => setLiked(res.liked),
      onError: () => setLiked((v) => !v),
    });
  };

  return { liked, displayCount, toggleLike, isPending: toggle.isPending };
}
