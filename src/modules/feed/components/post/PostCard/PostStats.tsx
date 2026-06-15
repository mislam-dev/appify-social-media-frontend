"use client";

import { AppImage } from "@/components/ui/AppImage";
import { cn } from "@/lib/utils/cn";
import { compactNumber } from "@/lib/utils/formatters";
import { useComments, usePostLikes } from "@/modules/feed/hooks";
import Link from "next/link";

export function PostStats({ postId }: { postId: string }) {
  const { data: likes } = usePostLikes(postId, true);
  const { data: comments } = useComments(postId);

  const likeCount = likes?.flat.length ?? 0;
  const commentCount = comments?.meta.total ?? comments?.items.length ?? 0;

  const avatars = (likes?.flat ?? []).slice(0, 9).map((item) => {
    const authorName = item.user ? `unknown`.trimEnd() : "Unknown";
    return `https://ui-avatars.com/api/?name=${authorName}`;
  });

  return (
    <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
      <div className="_feed_inner_timeline_total_reacts_image">
        {avatars.map((src, i) => (
          <AppImage
            key={i}
            src={src}
            alt=""
            width={24}
            height={24}
            className={cn(
              i === 0 ? "_react_img1" : "_react_img",
              i >= 2 && "_rect_img_mbl_none",
            )}
          />
        ))}
        <p className="_feed_inner_timeline_total_reacts_para">
          {compactNumber(likeCount)}
        </p>
      </div>
      <div className="_feed_inner_timeline_total_reacts_txt">
        <p className="_feed_inner_timeline_total_reacts_para1">
          <Link href="#">
            <span>{commentCount}</span> Comment
          </Link>
        </p>
        <p className="_feed_inner_timeline_total_reacts_para2">
          <span>0</span> Share
        </p>
      </div>
    </div>
  );
}
