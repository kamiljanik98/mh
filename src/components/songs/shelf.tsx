"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetSongs } from "@/hooks/songs/use-get-songs";
import { useOnPlay } from "@/hooks/player/use-on-play";
import { Card } from "@/components/songs/card";

export const Shelf = () => {
  const { songs, isLoading, error } = useGetSongs();
  const onPlay = useOnPlay(songs);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="h-48 w-full animate-pulse rounded-md bg-neutral-800" />
    );
  }

  if (error) {
    return (
      <div className="flex h-48 w-full items-center justify-center text-sm text-neutral-500">
        Failed to load songs.
      </div>
    );
  }

  if (!songs.length) return null;

  return (
    <div className="group/scroll relative">
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card p-2 opacity-0 transition group-hover/scroll:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden scrollbar-none"
      >
        {songs.map((song) => (
          <div key={song.id} className="w-40 shrink-0">
            <Card isLikedInitially={song.isLiked} song={song} onPlay={onPlay} />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-card p-2 opacity-0 transition group-hover/scroll:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
