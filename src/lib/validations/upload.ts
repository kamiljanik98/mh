// lib/validations/upload.ts
import { z } from "zod";

const MAX_AUDIO_SIZE = 200 * 1024 * 1024; // 200MB
const MAX_COVER_SIZE = 5 * 1024 * 1024; // 5MB

export const uploadSchema = z.object({
  title: z.string().min(1, "Title is required"),
  bpm: z.preprocess(
    (v) => (v === "" || v === undefined ? undefined : Number(v)),
    z.number().int().min(1).max(999).optional(),
  ),
  scale: z.string().optional(),
  genre: z.string().optional(),
  tags: z.preprocess(
    (v) =>
      typeof v === "string" && v.trim() !== ""
        ? v.split(",").map((t) => t.trim())
        : [],
    z.array(z.string()).optional(),
  ),
  audio: z
    .instanceof(File)
    .refine((f) => f.size > 0, "Audio file is required")
    .refine((f) => f.size <= MAX_AUDIO_SIZE, "Audio file must be under 200MB")
    .refine(
      (f) => ["audio/mpeg", "audio/wav"].includes(f.type),
      "Only MP3 and WAV allowed",
    ),
  cover: z
    .instanceof(File)
    .refine((f) => f.size <= MAX_COVER_SIZE, "Cover must be under 5MB")
    .refine(
      (f) => ["image/jpeg", "image/png"].includes(f.type),
      "Only JPG and PNG allowed",
    )
    .optional(),
});

export type UploadFormValues = z.infer<typeof uploadSchema>;
