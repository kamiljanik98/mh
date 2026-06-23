"use client";

import { useState } from "react";
import type { Database } from "@/types/database.types";

type Song = Database["public"]["Tables"]["songs"]["Row"];

const useUpload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const upload = async (
    formData: FormData,
  ): Promise<{ error: Error | null; data: Song | null }> => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const body = await res.json().catch(() => ({}));
      return {
        error: res.ok ? null : new Error(body.error ?? "Upload failed"),
        data: res.ok ? body.song : null,
      };
    } catch {
      return { error: new Error("Network error"), data: null };
    } finally {
      setIsLoading(false);
    }
  };

  return { upload, isLoading };
};

export default useUpload;
