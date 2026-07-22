"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Song } from "@/types";

export function useGetSongById(id: string | null) {
  const [song, setSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setSong(null);
      return;
    }

    const fetchSong = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      setSong(data);
      setError(error);
      setIsLoading(false);
    };

    fetchSong();
  }, [id]);

  return { song, isLoading, error };
}
