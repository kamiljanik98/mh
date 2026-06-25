import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { uploadSong, uploadCover, deleteFromR2 } from "@/lib/r2/upload";
import type { Database } from "@/types/database.types";

type SongInsert = Database["public"]["Tables"]["songs"]["Insert"];

const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/wav",
  "audio/flac",
  "audio/aac",
];
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_AUDIO_BYTES = 200 * 1024 * 1024;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const audioFile = formData.get("audio");
  const coverFile = formData.get("cover");
  const title = formData.get("title");
  const bpm = formData.get("bpm");
  const scale = formData.get("scale");
  const genre = formData.get("genre");
  const tags = formData.get("tags");
  const description = formData.get("description") as string | null;

  if (!(audioFile instanceof File)) {
    return NextResponse.json({ error: "Audio file required" }, { status: 400 });
  }
  if (typeof title !== "string" || title.trim() === "") {
    return NextResponse.json({ error: "Title required" }, { status: 400 });
  }

  if (!ALLOWED_AUDIO_TYPES.includes(audioFile.type)) {
    return NextResponse.json(
      { error: "Unsupported audio format" },
      { status: 415 },
    );
  }
  if (audioFile.size > MAX_AUDIO_BYTES) {
    return NextResponse.json(
      { error: "Audio file exceeds 200 MB limit" },
      { status: 413 },
    );
  }
  if (coverFile instanceof File) {
    if (!ALLOWED_IMAGE_TYPES.includes(coverFile.type)) {
      return NextResponse.json(
        { error: "Unsupported image format" },
        { status: 415 },
      );
    }
    if (coverFile.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { error: "Cover image exceeds 5 MB limit" },
        { status: 413 },
      );
    }
  }

  const written: { bucket: "songs" | "covers"; path: string }[] = [];

  const rollback = async () => {
    await Promise.allSettled(
      written.map(({ bucket, path }) => deleteFromR2(bucket, path)),
    );
  };

  const audioPath = `${user.id}/${crypto.randomUUID()}-${audioFile.name}`;
  try {
    await uploadSong(audioFile, audioPath);
  } catch {
    await rollback();
    return NextResponse.json({ error: "Audio upload failed" }, { status: 500 });
  }
  written.push({ bucket: "songs", path: audioPath });

  let coverPath: string | null = null;
  if (coverFile instanceof File) {
    coverPath = `${user.id}/${crypto.randomUUID()}-${coverFile.name}`;
    try {
      await uploadCover(coverFile, coverPath);
    } catch {
      await rollback();
      return NextResponse.json(
        { error: "Cover upload failed" },
        { status: 500 },
      );
    }
    written.push({ bucket: "covers", path: coverPath });
  }

  const insert: SongInsert = {
    title: title.trim(),
    path: audioPath,
    image_path: coverPath,
    uploaded_by: user.id,
    bpm: bpm ? Number(bpm) : null,
    scale: typeof scale === "string" ? scale : null,
    genre: typeof genre === "string" ? genre : null,
    tags:
      typeof tags === "string"
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : null,
    description: description ?? null,
  };

  const { data: song, error: dbError } = await supabase
    .from("songs")
    .insert(insert)
    .select()
    .single();

  if (dbError || !song) {
    await rollback();
    return NextResponse.json(
      { error: dbError?.message ?? "DB insert failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ song }, { status: 201 });
}
