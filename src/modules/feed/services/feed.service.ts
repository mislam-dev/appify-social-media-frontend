import { apiClient, type ApiEnvelope } from "@/lib/api-client";
import type { Paginated, PaginationMeta } from "@/modules/shared/types";
import {
  CreatePostSchema,
  PostSchema,
  type CreatePostInput,
  type Post,
} from "@/modules/feed/types";
import { MOCK_POSTS } from "@/modules/feed/data/mock";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK !== "false";
const wait = (ms = 500) => new Promise((r) => setTimeout(r, ms));

interface RawPost {
  id: string;
  content: string;
  image: string | null;
  status: "public" | "private";
  created_at: string;
  user?: { id: string; first_name: string; last_name: string };
}

function fromApi(raw: RawPost): Post {
  return PostSchema.parse({
    id: raw.id,
    author: {
      id: raw.user?.id ?? "unknown",
      name: [raw.user?.first_name, raw.user?.last_name]
        .filter(Boolean)
        .join(" ") || "Unknown",
      avatar: "/assets/images/post_img.png",
    },
    content: raw.content,
    image: raw.image,
    status: raw.status,
    created_at: raw.created_at,
    reactions: 0,
    reaction_avatars: [],
    comment_count: 0,
    share_count: 0,
    previous_comments: 0,
    comments: [],
  });
}

export const feedService = {
  async getPosts(page = 1, limit = 5): Promise<Paginated<Post>> {
    if (USE_MOCK) {
      await wait();
      const start = (page - 1) * limit;
      const items = MOCK_POSTS.slice(start, start + limit);
      const meta: PaginationMeta = {
        page,
        limit,
        total: MOCK_POSTS.length,
        total_pages: Math.ceil(MOCK_POSTS.length / limit),
      };
      return { items, meta };
    }

    const res = await apiClient.get<
      ApiEnvelope<RawPost[]> & { meta?: PaginationMeta }
    >("/posts", { params: { page, limit } });

    const meta = (res.data.meta as PaginationMeta) ?? {
      page,
      limit,
      total: res.data.data.length,
      total_pages: 1,
    };
    return { items: res.data.data.map(fromApi), meta };
  },

  async createPost(input: CreatePostInput): Promise<Post> {
    const payload = CreatePostSchema.parse(input);

    if (USE_MOCK) {
      await wait();
      return PostSchema.parse({
        id: `post-local-${Date.now()}`,
        author: {
          id: "me",
          name: "Dylan Field",
          avatar: "/assets/images/profile.png",
        },
        content: payload.content,
        image: payload.image ?? null,
        status: payload.status ?? "public",
        created_at: new Date().toISOString(),
        reactions: 0,
        reaction_avatars: [],
        comment_count: 0,
        share_count: 0,
        previous_comments: 0,
        comments: [],
      });
    }

    const res = await apiClient.post<ApiEnvelope<RawPost>>("/posts", payload);
    return fromApi(res.data.data);
  },
};
