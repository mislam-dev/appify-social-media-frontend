import { z } from "zod";
import { MIN_PASSWORD_LENGTH } from "@/lib/utils/validators";

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional().default(true),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `At least ${MIN_PASSWORD_LENGTH} characters`),
    confirm_password: z.string().min(1, "Please repeat your password"),
    agree: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms & conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;

export type RegisterPayload = Pick<
  RegisterInput,
  "first_name" | "last_name" | "email" | "password"
>;
