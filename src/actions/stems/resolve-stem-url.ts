"use server";

import { getPresignedUrl } from "@/lib/r2/storage";

export const resolveStemUrl = async (path: string) => {
  try {
    const url = await getPresignedUrl(path, "stems");
    return { url, error: null };
  } catch (error) {
    return { url: null, error: error as Error };
  }
};
