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
  is_liked: z.boolean().optional(),
});

export type PaginationMeta = z.infer<typeof PaginationMetaSchema>;

export interface Paginated<T> {
  items: T[];
  meta: PaginationMeta;
}

export type ApiResponse<T> = {
  status_code: number;
  message: string;
  data: T | object | [object];
  meta?: Record<string, string | number>;
  _links?: Record<string, string>;
};

export type ValidationErrorResponse = {
  request_id: string;
  status_code: number;
  message: string;
  errors: {
    property: string;
    constraints: string[];
  }[];
};

export type NonValidationErrorResponse = {
  error: string;
  message: string;
  request_id: string;
  status_code: number;
};
