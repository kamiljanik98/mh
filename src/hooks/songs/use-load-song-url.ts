"use client";

import { useEffect, useState } from "react";
import { resolveSongUrl } from "@/actions/resolve-song-url";

export function useLoadSongUrl(path: string | null) {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!path) {
      setUrl(null);
      return;
    }

    const load = async () => {
      setIsLoading(true);
      try {
        const { url, error } = await resolveSongUrl(path);
        setUrl(url);
        setError(error);
      } catch (error) {
        setUrl(null);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [path]);

  return { url, isLoading, error };
}
