import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  avatar_url: z.string().optional(),
  headline: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const PaginationMetaSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  total_pages: z.number(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export interface Paginated<T> {
  items: T[];
  meta: PaginationMeta;
}
