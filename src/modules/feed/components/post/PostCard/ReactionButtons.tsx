"use client";

import { cn } from "@/lib/utils/cn";
import { usePostLikes, useTogglePostLike } from "@/modules/feed/hooks/useLikes";
import { useState } from "react";

export function ReactionButtons({ postId }: { postId: string }) {
  const { mutate: togglePostLike, isPending } = useTogglePostLike(postId);
  const { data: likes } = usePostLikes(postId, true);

  const serverLiked = Boolean(likes?.isLiked);
  const [liked, setLiked] = useState(serverLiked);
  const [prevServerLiked, setPrevServerLiked] = useState(serverLiked);
  if (serverLiked !== prevServerLiked) {
    setPrevServerLiked(serverLiked);
    setLiked(serverLiked);
  }

  return (
    <div className="_feed_inner_timeline_reaction">
      <button
        type="button"
        disabled={isPending}
        onClick={() => {
          setLiked((v) => !v);
          togglePostLike(undefined, {
            onSuccess: (res) => setLiked(res.liked),
            onError: () => setLiked((v) => !v),
          });
        }}
        className={cn(
          "_feed_inner_timeline_reaction_emoji _feed_reaction",
          liked && "_feed_reaction_active",
        )}
      >
        <span className="_feed_inner_timeline_reaction_link">
          <span className="flex gap-x-2 items-center">
            <LikeIcon />
            Like
          </span>
        </span>
      </button>
      <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
        <span className="_feed_inner_timeline_reaction_link">
          <span className="flex gap-x-2">
            <CommentIcon />
            Comment
          </span>
        </span>
      </button>
      <button className="_feed_inner_timeline_reaction_share _feed_reaction">
        <span className="_feed_inner_timeline_reaction_link">
          <span className="flex gap-x-2">
            <ShareIcon />
            Share
          </span>
        </span>
      </button>
    </div>
  );
}

function LikeIcon({
  size = 24,
  color = "currentColor",
}: {
  size?: number | string;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 220 220"
      role="img"
      aria-label="Like"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Like</title>
      <path
        d="M86 96 L86 196 L168 196 C178 196 186 189 188 179 L200 119 C202 108 193 98 182 98 L132 98 L132 60 C132 45 120 33 105 33 C98 33 92 37 90 44 L86 96 Z"
        fill={color}
      />
      <rect x="44" y="96" width="34" height="100" rx="6" fill={color} />
    </svg>
  );
}

function HaHaIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      fill="none"
      viewBox="0 0 19 19"
    >
      <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z" />
      <path
        fill="#664500"
        d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"
      />
      <path
        fill="#fff"
        d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"
      />
      <path
        fill="#664500"
        d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"
      />
    </svg>
  );
}
function CommentIcon() {
  return (
    <svg
      className="_reaction_svg"
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      fill="none"
      viewBox="0 0 21 21"
    >
      <path
        stroke="#000"
        d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
      />
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.938 9.313h7.125M10.5 14.063h3.563"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      className="_reaction_svg"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="21"
      fill="none"
      viewBox="0 0 24 21"
    >
      <path
        stroke="#000"
        strokeLinejoin="round"
        d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
      />
    </svg>
  );
}
