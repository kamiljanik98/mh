"use client";

import { useState } from "react";

const useUpload = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const upload = async (
    formData: FormData,
  ): Promise<{ error: Error | null }> => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const body = await res.json().catch(() => ({}));
      return {
        error: res.ok ? null : new Error(body.error ?? "Upload failed"),
      };
    } catch {
      return { error: new Error("Network error") };
    } finally {
      setIsLoading(false);
    }
  };

  return { upload, isLoading };
};

export default useUpload;
