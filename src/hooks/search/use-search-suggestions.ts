import { use, useEffect, useState } from "react";
import { useDebounce } from "./use-debounce";
import { createClient } from "@/lib/supabase/client";

export type SongSuggestion = {
  id: string;
  title: string;
};

export const useSearchSuggestions = (query: string) => {
  const [suggestions, setSuggestions] = useState<SongSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debounceQuery = useDebounce(query, 300);

  useEffect(() => {
    const trimmed = debounceQuery.trim();

    if (!trimmed) {
      setSuggestions([]);
      return;
    }

    let cancelled = false;

    const fetchSuggestions = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data } = await supabase
        .from("songs")
        .select("id, title")
        .ilike("title", `%${trimmed}%`)
        .limit(8);

      if (!cancelled) {
        setSuggestions(data ?? []);
        setIsLoading(false);
      }
    };

    fetchSuggestions();

    return () => {
      cancelled = true;
    };
  }, [debounceQuery]);

  return { suggestions, isLoading };
};
