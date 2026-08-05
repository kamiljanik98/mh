"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Song } from "@/types";
import { attachIsLiked } from "@/lib/attach-is-liked";

export function useGetSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchSongs = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("songs")
        .select("*, profiles!uploaded_by(nickname, avatar_url)")
        .order("created_at", { ascending: false });

      const withLikes = await attachIsLiked(supabase, data ?? []);
      if (cancelled) return;

      setSongs(withLikes);
      setError(error);
      setIsLoading(false);
    };

    fetchSongs();
    return () => {
      cancelled = true;
    };
  }, []);

  return { songs, isLoading, error };
}
