import type { Paginated } from "@/modules/shared/types";
import { fullName } from "@/lib/utils/formatters";
import { CommentSchema, type Comment } from "@/modules/feed/types";
import {
  ApiReplySchema,
  type ApiReply,
  type CreateReplyDto,
  type UpdateReplyDto,
} from "./dto";
import { feedEndpoints } from "./endpoints";
import { del, getList, patchOne, postOne } from "./http";

/** Replies share the comment shape; reuse the UI `Comment` view-model. */
export function mapReply(raw: ApiReply): Comment {
  return CommentSchema.parse({
    id: raw.id,
    author: {
      id: raw.user?.id ?? raw.user_id,
      name: fullName(raw.user?.first_name, raw.user?.last_name) || "User",
      avatar: "/assets/images/comment_img.png",
    },
    body: raw.text,
    reactions: 0,
    created_at: raw.created_at,
  });
}

const parseReply = (raw: unknown) => mapReply(ApiReplySchema.parse(raw));

class RepliesApi {
  list(commentId: string, page = 1, limit = 10): Promise<Paginated<Comment>> {
    return getList<ApiReply, Comment>(
      feedEndpoints.commentReplies(commentId),
      { page, limit },
      parseReply,
    );
  }

  create(commentId: string, dto: CreateReplyDto): Promise<Comment> {
    return postOne(feedEndpoints.commentReplies(commentId), dto, parseReply);
  }

  update(commentId: string, id: string, dto: UpdateReplyDto): Promise<Comment> {
    return patchOne(feedEndpoints.commentReply(commentId, id), dto, parseReply);
  }

  remove(commentId: string, id: string): Promise<void> {
    return del(feedEndpoints.commentReply(commentId, id));
  }
}

export const repliesApi = new RepliesApi();
