"use client";

import { useEffect, useState } from "react";
import { resolveSongUrl } from "@/actions/songs/resolve-song-url";

export function useLoadSongUrl(path: string | null) {
  const [url, setUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!path) {
      setUrl(null);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        const { url, error } = await resolveSongUrl(path);
        if (cancelled) return;
        setUrl(url);
        setError(error);
      } catch (error) {
        if (cancelled) return;
        setUrl(null);
        setError(error as Error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { url, isLoading, error };
}
