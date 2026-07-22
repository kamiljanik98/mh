"use server";

import { createClient } from "@/lib/supabase/server";
import { deleteFromR2 } from "@/lib/r2/upload";

export const deleteSong = async (id: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: new Error("Not authenticated") };
  }

  const { data: song, error: fetchError } = await supabase
    .from("songs")
    .select("path, image_path, uploaded_by, stems(path)")
    .eq("id", id)
    .single();

  if (fetchError || !song) {
    return { error: new Error("Song not found") };
  }

  if (song.uploaded_by !== user.id) {
    return { error: new Error("Not authorized") };
  }

  const orphanedPaths: string[] = [];

  try {
    await deleteFromR2("songs", song.path);
  } catch {
    orphanedPaths.push(`covers/${song.image_path}`);
  }

  if (song.image_path) {
    try {
      await deleteFromR2("covers", song.image_path);
    } catch {
      orphanedPaths.push(`covers/${song.image_path}`);
    }
  }

  for (const stem of song.stems ?? []) {
    try {
      await deleteFromR2("stems", stem.path);
    } catch {
      orphanedPaths.push(`stems/${stem.path}`);
    }
  }

  if (orphanedPaths.length > 0) {
    console.error("Orphaned R2 paths after delete failure:", orphanedPaths);
    return { error: new Error("Failed to delete some files, aborted") };
  }

  const { error: deleteStemsError } = await supabase
    .from("stems")
    .delete()
    .eq("song_id", id);

  if (deleteStemsError) {
    return { error: deleteStemsError };
  }

  const { error: deleteSongError } = await supabase
    .from("songs")
    .delete()
    .eq("id", id);

  return { error: deleteSongError };
};
