"use client";

import { AppImage } from "@/components/ui/AppImage";
import { PostComments } from "@/modules/feed/components/comment/PostComments";
import type { Post } from "@/modules/feed/types";
import { PostStats } from "./PostStats";
import { PostUserWithDate } from "./PostUserWithDate";
import { ReactionButtons } from "./ReactionButtons";
import { ThreeDotActionMenu } from "./ThreeDotMenu";

export function PostCard({ post }: { post: Post }) {
  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <PostUserWithDate
            created_at={post.created_at}
            status={post.status}
            userId={post.user_id}
          />

          <ThreeDotActionMenu />
        </div>

        {post.content ? (
          <p
            className="_feed_inner_timeline_post_para"
            style={{ marginBottom: 16 }}
          >
            {post.content}
          </p>
        ) : null}
        {post.image ? (
          <div className="_feed_inner_timeline_image">
            <AppImage
              src={post.image}
              alt=""
              width={620}
              height={420}
              className="_time_img"
            />
          </div>
        ) : null}
      </div>

      <PostStats postId={post.id} />

      <ReactionButtons postId={post.id} />

      <PostComments post={post} />
    </div>
  );
}
