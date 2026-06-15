import {
  CreatePostSchema,
  PostSchema,
  type CreatePostInput,
  type Post,
} from "@/modules/feed/types";
import type { Paginated } from "@/modules/shared/types";
import {
  ApiPostSchema,
  type ApiPost,
  type CreatePostDto,
  type UpdatePostDto,
} from "./dto";
import { feedEndpoints } from "./endpoints";
import { del, getList, getOne, patchOne, postOne } from "./http";

/** Map a raw API post onto the UI `Post` view-model. */
export function mapPost(raw: ApiPost): Post {
  return PostSchema.parse(raw);
}

const parsePost = (raw: unknown) => mapPost(ApiPostSchema.parse(raw));

class PostsApi {
  list(page = 1, limit = 5): Promise<Paginated<Post>> {
    return getList<ApiPost, Post>(
      feedEndpoints.posts,
      { page, limit },
      mapPost,
    );
  }

  get(id: string): Promise<Post> {
    return getOne(feedEndpoints.post(id), parsePost);
  }

  create(input: CreatePostInput): Promise<Post> {
    const parsed = CreatePostSchema.parse(input);
    const payload: CreatePostDto = {
      content: parsed.content,
      image: parsed.image ?? null,
      status: parsed.status ?? "public",
    };
    return postOne(feedEndpoints.posts, payload, parsePost);
  }

  update(id: string, dto: UpdatePostDto): Promise<Post> {
    return patchOne(feedEndpoints.post(id), dto, parsePost);
  }

  remove(id: string): Promise<void> {
    return del(feedEndpoints.post(id));
  }
}

export const postsApi = new PostsApi();
