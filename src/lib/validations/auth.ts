import * as z from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email address"),
  nickname: z
    .string()
    .min(3, "Nickname must be at least 3 characters")
    .max(20, "Nickname must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores allowed"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain one uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
