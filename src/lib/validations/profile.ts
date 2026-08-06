import { z } from "zod";

export const bioSchema = z
  .string()
  .refine(
    (value) => value.trim().split(/\s+/).filter(Boolean).length <= 150,
    "Bio must be at most 150 words",
  );

export const nicknameSchema = z
  .string()
  .min(3, "Nickname must be at least 3 characters")
  .max(32, "Nickname must be at most 32 characters")
  .regex(
    /^[a-zA-Z0-9_.!@#$%&-]+$/,
    "Only letters, numbers, and !@#$%&_.- allowed",
  );

export const profileSchema = z.object({
  nickname: nicknameSchema,
  bio: bioSchema.optional().or(z.literal("")),
  avatar: z.instanceof(File).optional(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
