import type { Paginated } from "@/modules/shared/types";
import {
  LikeEntitySchema,
  ToggleLikeSchema,
  type LikeEntity,
  type ToggleLikeResult,
} from "./dto";
import { feedEndpoints } from "./endpoints";
import { getList, postOne } from "./http";

class CommentLikesApi {
  list(
    commentId: string,
    page = 1,
    limit = 100,
  ): Promise<Paginated<LikeEntity>> {
    return getList<LikeEntity, LikeEntity>(
      feedEndpoints.commentLikes(commentId),
      { page, limit },
      (raw) => LikeEntitySchema.parse(raw),
    );
  }

  toggle(commentId: string): Promise<ToggleLikeResult> {
    return postOne(feedEndpoints.commentLikes(commentId), undefined, (raw) =>
      ToggleLikeSchema.parse(raw),
    );
  }
}

export const commentLikesApi = new CommentLikesApi();
