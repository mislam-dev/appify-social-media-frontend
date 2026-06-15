"use client";

import { AppImage } from "@/components/ui/AppImage";
import { timeAgo } from "@/lib/utils/formatters";
import type { PostStatus } from "@/modules/feed/types";
import { useUser } from "@/modules/user/hooks/useUser";
import Link from "next/link";

export function PostUserWithDate({
  created_at,
  status = "public",
  userId,
}: {
  created_at: string;
  status?: PostStatus;
  userId: string;
}) {
  const { data, isError } = useUser(userId);
  if (isError) {
    return <p className="text-rose-500">Something went wrong!</p>;
  }
  return (
    <div className="_feed_inner_timeline_post_box">
      <div className="_feed_inner_timeline_post_box_image">
        <AppImage
          src={`https://ui-avatars.com/api/?name=${data?.first_name + " " + data?.last_name}&size=48`}
          alt={`${data?.first_name} ${data?.last_name}`}
          width={48}
          height={48}
          className="_post_img"
        />
      </div>
      <div className="_feed_inner_timeline_post_box_txt">
        <h4 className="_feed_inner_timeline_post_box_title">{`${data?.first_name} ${data?.last_name}`}</h4>
        <p className="_feed_inner_timeline_post_box_para">
          {timeAgo(created_at)} .{" "}
          <Link href="#">{status === "private" ? "Private" : "Public"}</Link>
        </p>
      </div>
    </div>
  );
}
