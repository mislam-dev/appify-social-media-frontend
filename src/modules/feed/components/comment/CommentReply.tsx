"use client";

import { AppImage } from "@/components/ui/AppImage";
import { cn } from "@/lib/utils/cn";
import { timeAgo } from "@/lib/utils/formatters";
import { useCommentLikeState } from "@/modules/feed/hooks/useLikes";
import type { Comment } from "@/modules/feed/types";
import { useUser } from "@/modules/user/hooks/useUser";
import Link from "next/link";

export function CommentReply({ reply }: { reply: Comment }) {
  const { data: author, isError: authorIsError } = useUser(reply.user_id);
  const authorName = authorIsError
    ? "Unknown"
    : `${author?.first_name ?? ""} ${author?.last_name ?? ""}`.trimEnd() ||
      "Unknown";

  const { liked, displayCount, toggleLike, isPending } = useCommentLikeState(
    reply.id,
  );

  return (
    <div className="_comment_main mt-3">
      <div className="_comment_image">
        <Link href="#" className="_comment_image_link">
          <AppImage
            src={`https://ui-avatars.com/api/?name=${authorName}`}
            alt=""
            width={36}
            height={36}
            className="_comment_img1"
          />
        </Link>
      </div>
      <div className="_comment_area">
        <div className="">
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
                <span>{reply.text}</span>
              </p>
            </div>
          </div>
          <div>
            <div className="flex justify-between px-2">
              <ul className="_comment_reply_list gap-x-1">
                <li>
                  <span
                    role="button"
                    aria-pressed={liked}
                    aria-disabled={isPending}
                    style={{ cursor: "pointer" }}
                    className={cn(liked && "_reaction_active")}
                    onClick={toggleLike}
                  >
                    {liked ? "Liked" : "Like"}.
                  </span>
                </li>
                <li>
                  <span className="_time_link">
                    {timeAgo(reply.created_at)}
                  </span>
                </li>
              </ul>
              {displayCount && (
                <div className="flex">
                  <div className="_total_react flex gap-2">
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
            </div>
          </div>
        </div>
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
