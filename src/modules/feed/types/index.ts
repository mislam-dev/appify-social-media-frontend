import { z } from "zod";

export const PostStatus = z.enum(["public", "private"]);
export type PostStatus = z.infer<typeof PostStatus>;

export const PostAuthorSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
});
export type PostAuthor = z.infer<typeof PostAuthorSchema>;

export const CommentSchema = z.object({
  id: z.string(),
  text: z.string(),
  image: z.string().nullable().optional(),
  user_id: z.string(),
  created_at: z.string(),
});
export type Comment = z.infer<typeof CommentSchema>;

export const PostSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  content: z.string(),
  image: z.string().nullable().default(null),
  status: PostStatus,
  created_at: z.string(),
  updated_at: z.string(),
  user: PostAuthorSchema,
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
