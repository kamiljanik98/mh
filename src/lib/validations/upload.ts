import { z } from "zod";

const stemCategories = [
  "vocals",
  "drums",
  "bass",
  "melody",
  "guitar",
  "synth",
  "fx",
  "other",
] as const;

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
  description: z.string().optional(),
  audio: z
    .instanceof(File)
    .refine((f) => f.size > 0, "Audio file required")
    .refine((f) => f.type.startsWith("audio/"), "File must be an audio file"),
  cover: z
    .instanceof(File)
    .refine((f) => f.type.startsWith("image/"), "Cover must be an image file")
    .optional(),
  stems: z
    .array(
      z.object({
        file: z
          .instanceof(File)
          .refine((f) => f.size > 0, "Stem file required")
          .refine(
            (f) => f.type.startsWith("audio/"),
            "Stem must be an audio file",
          ),
        category: z.enum(stemCategories),
      }),
    )
    .max(10, "Maximum 10 stems per song")
    .optional(),
});

export type UploadFormValues = z.infer<typeof uploadSchema>;
