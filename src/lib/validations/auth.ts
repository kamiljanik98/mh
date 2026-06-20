import * as z from "zod";

const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Password must contain one uppercase letter")
  .regex(/[0-9]/, "Password must contain a number");

export const registerSchema = z.object({
  email: z.email("Invalid email address"),
  nickname: z
    .string()
    .min(3, "Nickname must be at least 3 characters")
    .max(32, "Nickname must be at most 32 characters")
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      "Only letters, numbers, underscores, dots and hyphens allowed",
    ),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const updatePasswordSchema = z.object({
  password: passwordSchema,
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;
