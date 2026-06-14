import { z } from "zod";

export const PostStatus = z.enum(["public", "private"]);
export type PostStatus = z.infer<typeof PostStatus>;

export const PostAuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string(),
});
export type PostAuthor = z.infer<typeof PostAuthorSchema>;

export const CommentSchema = z.object({
  id: z.string(),
  author: PostAuthorSchema,
  body: z.string(),
  reactions: z.number().default(0),
  created_at: z.string(),
});
export type Comment = z.infer<typeof CommentSchema>;

export const PostSchema = z.object({
  id: z.string(),
  author: PostAuthorSchema,
  title: z.string().optional(),
  content: z.string(),
  image: z.string().nullable().optional(),
  status: PostStatus.default("public"),
  created_at: z.string(),
  reactions: z.number().default(0),
  reaction_avatars: z.array(z.string()).default([]),
  comment_count: z.number().default(0),
  share_count: z.number().default(0),
  previous_comments: z.number().default(0),
  comments: z.array(CommentSchema).default([]),
});
export type Post = z.infer<typeof PostSchema>;

export interface Story {
  id: string;
  name: string;
  image: string;
  isOwn?: boolean;

  state?: "active" | "inactive";
}

export interface SuggestedPerson {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface FeedEvent {
  id: string;
  title: string;
  day: string;
  month: string;
  image: string;
  going: number;
}

export interface NotificationItem {
  id: string;
  image: string;

  text: string;
  highlight?: string;
  time: string;
}

export interface FriendItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  online: boolean;
  lastSeen?: string;
}

export interface RecommendedPerson {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export const CreatePostSchema = z.object({
  content: z.string().min(1, "Write something first"),
  image: z.string().url().optional(),
  status: PostStatus.optional(),
});
export type CreatePostInput = z.infer<typeof CreatePostSchema>;
