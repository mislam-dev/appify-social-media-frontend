import type { Paginated } from "@/modules/shared/types";
import {
  LikeEntitySchema,
  ToggleLikeSchema,
  type LikeEntity,
  type ToggleLikeResult,
} from "./dto";
import { feedEndpoints } from "./endpoints";
import { getList, postOne } from "./http";

class PostLikesApi {
  list(postId: string, page = 1, limit = 100): Promise<Paginated<LikeEntity>> {
    return getList<LikeEntity, LikeEntity>(
      feedEndpoints.postLikes(postId),
      { page, limit },
      (raw) => LikeEntitySchema.parse(raw),
    );
  }

  toggle(postId: string): Promise<ToggleLikeResult> {
    return postOne(feedEndpoints.postLikes(postId), undefined, (raw) =>
      ToggleLikeSchema.parse(raw),
    );
  }
}

export const postLikesApi = new PostLikesApi();
