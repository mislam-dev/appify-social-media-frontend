"use client";

import { CommentBox } from "@/modules/feed/components/comment/CommentBox";
import type { Post } from "@/modules/feed/types";
import { PostCommentThread } from "./PostCommentThread";

export function PostComments({ post }: { post: Post }) {
  return (
    <>
      <div className="_feed_inner_timeline_cooment_area">
        <CommentBox />
      </div>

      <div className="_timline_comment_main">
        {post.previous_comments > 0 ? (
          <div className="_previous_comment">
            <button type="button" className="_previous_comment_txt">
              View {post.previous_comments} previous comments
            </button>
          </div>
        ) : null}
        {post.comments.map((comment) => (
          <PostCommentThread key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}
