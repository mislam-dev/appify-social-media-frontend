import { z } from "zod";

/* ------------------------------------------------------------------ *
 * API DTOs — the exact wire contracts from swagger.yaml.
 * These are intentionally separate from the UI view-models in
 * `modules/feed/types`; the api layer maps DTO -> view-model so the
 * components never depend on the raw API shape.
 * ------------------------------------------------------------------ */

export const ApiUserSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().optional(),
});
export type ApiUser = z.infer<typeof ApiUserSchema>;

export const ApiPostSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  content: z.string(),
  image: z.string().nullable().optional(),
  status: z.enum(["public", "private"]).default("public"),
  created_at: z.string(),
  updated_at: z.string().optional(),
  user: z
    .object({
      first_name: z.string(),
      last_name: z.string(),
    })
    .optional(),
});
export type ApiPost = z.infer<typeof ApiPostSchema>;

export const ApiCommentSchema = z.object({
  id: z.string(),
  text: z.string(),
  image: z.string().nullable().optional(),
  post_id: z.string(),
  user_id: z.string(),
  parent_id: z.string().nullable().optional(),
  created_at: z.string(),
  updated_at: z.string().optional(),
  user: ApiUserSchema.optional(),
});
export type ApiComment = z.infer<typeof ApiCommentSchema>;

/** A reply is a Comment with a non-null parent_id. */
export const ApiReplySchema = ApiCommentSchema.extend({
  parent_id: z.string(),
});
export type ApiReply = z.infer<typeof ApiReplySchema>;

export const LikeEntitySchema = z.object({
  created_at: z.string().optional(),
  user: z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
  }),
});
export type LikeEntity = z.infer<typeof LikeEntitySchema>;

export const ToggleLikeSchema = z.object({ liked: z.boolean() });
export type ToggleLikeResult = z.infer<typeof ToggleLikeSchema>;

/* ----- Request bodies ----- */

export interface CreatePostDto {
  content: string;
  image?: string | null;
  status?: "public" | "private";
}
export type UpdatePostDto = Partial<CreatePostDto>;

export interface CreateCommentDto {
  text: string;
  image?: string | null;
}
export type UpdateCommentDto = Partial<CreateCommentDto>;

export interface CreateReplyDto {
  text: string;
  image?: string | null;
}
export type UpdateReplyDto = Partial<CreateReplyDto>;
