import { CommentSchema, type Comment } from "@/modules/feed/types";
import type { Paginated } from "@/modules/shared/types";
import {
  ApiCommentSchema,
  type ApiComment,
  type CreateCommentDto,
  type UpdateCommentDto,
} from "./dto";
import { feedEndpoints } from "./endpoints";
import { del, getList, patchOne, postOne } from "./http";

/** Map a raw API comment onto the UI `Comment` view-model. */
export function mapComment(raw: ApiComment): Comment {
  return CommentSchema.parse(raw);
}

const parseComment = (raw: unknown) => {
  return mapComment(ApiCommentSchema.parse(raw));
};

class CommentsApi {
  async list(
    postId: string,
    page = 1,
    limit = 10,
  ): Promise<Paginated<Comment>> {
    const d = getList<ApiComment, Comment>(
      feedEndpoints.postComments(postId),
      { page, limit },
      parseComment,
    );
    const result = await d;
    console.log({ ddd: result });
    return d;
  }

  create(postId: string, dto: CreateCommentDto): Promise<Comment> {
    return postOne(feedEndpoints.postComments(postId), dto, parseComment);
  }

  update(postId: string, id: string, dto: UpdateCommentDto): Promise<Comment> {
    return patchOne(feedEndpoints.postComment(postId, id), dto, parseComment);
  }

  remove(postId: string, id: string): Promise<void> {
    return del(feedEndpoints.postComment(postId, id));
  }
}

export const commentsApi = new CommentsApi();
