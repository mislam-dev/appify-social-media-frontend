"use client";

import { AppImage } from "@/components/ui/AppImage";
import { timeAgo } from "@/lib/utils/formatters";
import type { Comment } from "@/modules/feed/types";
import { useUser } from "@/modules/user/hooks/useUser";
import Link from "next/link";

export function CommentReply({ reply }: { reply: Comment }) {
  const { data: author, isError: authorIsError } = useUser(reply.user_id);
  const authorName = authorIsError
    ? "Unknown"
    : `${author?.first_name ?? ""} ${author?.last_name ?? ""}`.trimEnd() ||
      "Unknown";

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
          <div className="_comment_reply">
            <ul className="_comment_reply_list gap-x-1">
              <li>
                <span className="_time_link">.{timeAgo(reply.created_at)}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
