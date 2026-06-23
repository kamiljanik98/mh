import { z } from "zod";

export const uploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  bpm: z
    .string()
    .optional()
    .refine(
      (v) => !v || (/^\d+$/.test(v) && Number(v) >= 1 && Number(v) <= 999),
      "BPM must be a number between 1 and 999",
    ),
  scale: z.string().optional(),
  genre: z.string().optional(),
  tags: z.string().optional(),
});

export type UploadFormValues = z.infer<typeof uploadSchema>;
