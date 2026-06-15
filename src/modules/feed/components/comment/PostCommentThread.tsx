"use client";

import { AppImage } from "@/components/ui/AppImage";
import { cn } from "@/lib/utils/cn";
import { timeAgo } from "@/lib/utils/formatters";
import { CommentBox } from "@/modules/feed/components/comment/CommentBox";
import { CommentReply } from "@/modules/feed/components/comment/CommentReply";
import {
  useCommentLikes,
  useToggleCommentLike,
} from "@/modules/feed/hooks/useLikes";
import { useCreateReply, useReplies } from "@/modules/feed/hooks/useReplies";
import type { Comment } from "@/modules/feed/types";
import { useUser } from "@/modules/user/hooks/useUser";
import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";
import { useState } from "react";

export function PostCommentThread({ comment }: { comment: Comment }) {
  const createReply = useCreateReply(comment.id);
  const toggleLike = useToggleCommentLike(comment.id);

  const { user: currentUser } = useAuth();
  const { data: likes } = useCommentLikes(comment.id, true);

  const likeCount = likes?.meta.total ?? likes?.items.length ?? 0;
  const serverLiked = Boolean(
    currentUser && likes?.items.some((l) => l.user.id === currentUser.id),
  );

  const [liked, setLiked] = useState(serverLiked);
  const [prevServerLiked, setPrevServerLiked] = useState(serverLiked);
  if (serverLiked !== prevServerLiked) {
    setPrevServerLiked(serverLiked);
    setLiked(serverLiked);
  }

  const displayCount = likeCount + (liked === serverLiked ? 0 : liked ? 1 : -1);

  const handleToggleLike = () => {
    setLiked((v) => !v);
    toggleLike.mutate(undefined, {
      onSuccess: (res) => setLiked(res.liked),
      onError: () => setLiked((v) => !v),
    });
  };

  const { data: author, isError: authorIsError } = useUser(comment.user_id);
  const authorName = authorIsError
    ? "Unknown"
    : `${author?.first_name ?? ""} ${author?.last_name ?? ""}`.trimEnd() ||
      "Unknown";

  const [isReplyOpen, setIsReplyOpen] = useState<boolean>(false);

  const { data: replies } = useReplies(comment.id, true);
  const replyList = replies?.items ?? [];

  return (
    <div className="_comment_main mt-4">
      <div className="_comment_image">
        <Link href="#" className="_comment_image_link">
          <AppImage
            src={`https://ui-avatars.com/api/?name=${authorName}`}
            alt=""
            width={40}
            height={40}
            className="_comment_img1"
          />
        </Link>
      </div>
      <div className="_comment_area">
        <div className="_comment_details !min-w-fit !max-w-full !mb-2">
          <div className="_comment_details_top">
            <div className="_comment_name">
              <Link href="#">
                <h4 className="_comment_name_title">{authorName}</h4>
              </Link>
            </div>
          </div>
          <div className="_comment_status">
            <p className="_comment_status_text">
              <span>{comment.text}</span>
            </p>
          </div>
          {/* comment stats */}
          {displayCount > 0 && (
            <div className="_total_reactions">
              <div className="_total_react">
                <span className="_reaction_like">
                  <LikeIcon />
                </span>
                <span className="_reaction_heart">
                  <HeartIcon />
                </span>
              </div>
              <span className="_total">{displayCount}</span>
            </div>
          )}
          <div className="_comment_reply">
            <div className="">
              <ul className="_comment_reply_list gap-x-1">
                <li>
                  <span
                    role="button"
                    aria-pressed={liked}
                    style={{ cursor: "pointer" }}
                    className={cn(liked && "_reaction_active")}
                    onClick={handleToggleLike}
                  >
                    {liked ? "Liked" : "Like"}.
                  </span>
                </li>
                <li>
                  <span onClick={() => setIsReplyOpen(!isReplyOpen)}>
                    Reply
                  </span>
                </li>
                <li>
                  <span>Share</span>
                </li>
                <li>
                  <span className="_time_link">
                    .{timeAgo(comment.created_at)}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {isReplyOpen && (
          <>
            {/* Replies — a single level of nesting beneath the comment. */}
            {replyList.length > 0 && (
              <div className="_comment_replies ml-5">
                {replyList.map((reply) => (
                  <CommentReply key={reply.id} reply={reply} />
                ))}
              </div>
            )}
            <CommentBox
              pending={createReply.isPending}
              onSubmit={(text) => createReply.mutate({ text })}
            />
          </>
        )}
      </div>
    </div>
  );
}

function LikeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
