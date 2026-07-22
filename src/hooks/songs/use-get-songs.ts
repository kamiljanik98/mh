"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Song } from "@/types";

export function useGetSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("songs")
        .select("*, profiles!uploaded_by(nickname)")
        .order("created_at", { ascending: false });

      setSongs(data ?? []);
      setError(error);
      setIsLoading(false);
    };

    fetchSongs();
  }, []);

  return { songs, isLoading, error };
}
