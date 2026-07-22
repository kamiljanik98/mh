"use server";

import { createClient } from "@/lib/supabase/server";
import { getPresignedUrl } from "@/lib/r2/storage";

export async function resolveSongUrl(path: string) {
  const supabase = await createClient();

  const { data: song, error: dbError } = await supabase
    .from("songs")
    .select("id")
    .eq("file_path", path)
    .single();

  if (dbError || !song) {
    return { url: null, error: new Error("Not found") };
  }

  try {
    const url = await getPresignedUrl(path);
    return { url, error: null };
  } catch (error) {
    return { url: null, error: error as Error };
  }
}
