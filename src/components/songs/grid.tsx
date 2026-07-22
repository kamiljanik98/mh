"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetSongs } from "@/hooks/songs/use-get-songs";
import { useOnPlay } from "@/hooks/player/use-on-play";
import { Card } from "@/components/songs/card";

export const Grid = () => {
  const { songs, isLoading, error } = useGetSongs();
  const onPlay = useOnPlay(songs);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateArrows);
    return () => el?.removeEventListener("scroll", updateArrows);
  }, [songs]);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  if (isLoading)
    return (
      <div className="h-48 w-full bg-neutral-800 animate-pulse rounded-md" />
    );

  if (error)
    return (
      <div className="h-48 w-full flex items-center justify-center text-sm text-neutral-500">
        Failed to load songs.
      </div>
    );

  if (!songs.length) return null;

  return (
    <div className="relative group">
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-none"
      >
        {songs.map((song) => (
          <div key={song.id} className="w-40 shrink-0">
            <Card song={song} onPlay={onPlay} />
          </div>
        ))}
      </div>

      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};
