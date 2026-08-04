"use server";

import { getPresignedUrl } from "@/lib/r2/storage";
import { createClient } from "@/lib/supabase/server";

export const resolveStemUrl = async (path: string) => {
  const supabase = await createClient();

  const { data: stem, error: dbError } = await supabase
    .from("stems")
    .select("id")
    .eq("path", path)
    .single();

  if (dbError || !stem) {
    return { url: null, error: new Error("Not found") };
  }

  try {
    const url = await getPresignedUrl(path, "stems");
    return { url, error: null };
  } catch (error) {
    return { url: null, error: error as Error };
  }
};
