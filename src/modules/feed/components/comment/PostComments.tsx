"use client";

import { CommentBox } from "@/modules/feed/components/comment/CommentBox";
import { PostCommentThread } from "@/modules/feed/components/comment/PostCommentThread";
import {
  useComments,
  useCreateComment,
} from "@/modules/feed/hooks/useComments";
import type { Post } from "@/modules/feed/types";
import { useState } from "react";

const PREVIEW_COUNT = 2;

export function PostComments({ post }: { post: Post }) {
  const createComment = useCreateComment(post.id);
  const { data } = useComments(post.id);
  const [showAll, setShowAll] = useState(false);

  const comments = data?.items ?? [];
  const visible =
    showAll || comments.length <= PREVIEW_COUNT
      ? comments
      : comments.slice(-PREVIEW_COUNT);
  const hiddenCount = comments.length - visible.length;

  return (
    <>
      <div className="_feed_inner_timeline_cooment_area">
        <CommentBox
          pending={createComment.isPending}
          onSubmit={(text) => createComment.mutate({ text })}
        />
      </div>

      <div className="_timline_comment_main">
        {hiddenCount > 0 ? (
          <div className="_previous_comment">
            <button
              type="button"
              className="_previous_comment_txt"
              onClick={() => setShowAll(true)}
            >
              View {hiddenCount} previous comments
            </button>
          </div>
        ) : null}
        {visible.map((comment) => (
          <PostCommentThread key={comment.id} comment={comment} />
        ))}
      </div>
    </>
  );
}
