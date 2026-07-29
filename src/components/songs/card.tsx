"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, Pause } from "lucide-react";
import { getAvatarUrl, getCoverUrl } from "@/lib/r2/public";
import { formatSongMeta } from "@/lib/format-song-meta";
import { useWaveform } from "@/hooks/songs/use-waveform";
import { TitleLink } from "@/components/songs/title-link";
import { Actions } from "./actions";
import { Song } from "@/types";

type CardVariant = "grid" | "row" | "waveform";

export type SongCardProps = {
  song: Song;
  onPlay: (id: string) => void;
  showWaveform?: boolean;
  variant?: "grid" | "row" | "waveform";
  isLikedInitially?: boolean;
  onLikeToggle?: (isLiked: boolean) => void;
};

export const Card = ({
  song,
  onPlay,
  variant = "grid",
  isLikedInitially = false,
  onLikeToggle,
}: SongCardProps) => {
  const meta = formatSongMeta(song);

  const { rootRef, containerRef, isActive, isPlaying, handleClick } =
    useWaveform({
      songId: song.id,
      path: song.path,
      height: 32,
      lazyMount: true,
      onActivate: onPlay,
    });

  if (variant === "waveform") {
    return (
      <div
        ref={rootRef}
        className="group/item flex gap-3 rounded-md p-2 transition hover:bg-neutral-800"
      >
        <Image
          src={getCoverUrl(song.image_path)}
          alt={song.title}
          width={64}
          height={64}
          className="size-20 shrink-0 rounded-sm object-cover"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <TitleLink
            songId={song.id}
            title={song.title}
            className="text-sm font-medium"
          />
          {meta && (
            <p className="truncate text-xs text-muted-foreground">{meta}</p>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPlay(song.id)}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              aria-label={isActive && isPlaying ? "Pause" : "Play"}
            >
              {isActive && isPlaying ? (
                <Pause className="size-3.5" fill="currentColor" />
              ) : (
                <Play className="ml-0.5 size-3.5" fill="currentColor" />
              )}
            </button>
            <div
              ref={containerRef}
              onClick={handleClick}
              className="h-8 flex-1 cursor-pointer"
            />
            <Actions
              songId={song.id}
              size="sm"
              isLikedInitially={isLikedInitially}
              onLikeToggle={onLikeToggle}
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "row") {
    return (
      <div className="group/row flex items-center gap-3 rounded-md p-2 transition hover:bg-neutral-800">
        <div className="relative shrink-0">
          <Image
            src={getCoverUrl(song.image_path)}
            alt={song.title}
            width={48}
            height={48}
            className="size-12 rounded-sm object-cover"
          />
          <button
            onClick={() => onPlay(song.id)}
            className="absolute inset-0 flex items-center justify-center rounded-sm bg-black/50 opacity-0 transition-opacity group-hover/row:opacity-100"
            aria-label={`Play ${song.title}`}
          >
            <Play className="size-6 text-foreground" fill="currentColor" />
          </button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <TitleLink
            songId={song.id}
            title={song.title}
            className="text-xs font-semibold"
          />
          <div className="flex items-center gap-1.5">
            <Image
              src={getAvatarUrl(song.profiles?.avatar_url ?? null)}
              alt={song.profiles?.nickname ?? "Unknown"}
              width={16}
              height={16}
              className="rounded-full"
            />
            <p className="truncate text-xs text-muted-foreground">
              {song.profiles?.nickname ?? "Unknown"}
            </p>
          </div>
        </div>

        {meta && (
          <p className="hidden shrink-0 truncate text-xs text-muted-foreground sm:block">
            {meta}
          </p>
        )}

        <Actions
          songId={song.id}
          size="sm"
          isLikedInitially={isLikedInitially}
          onLikeToggle={onLikeToggle}
        />
      </div>
    );
  }

  // variant === "grid" (default)
  return (
    <div className="group/card flex flex-col gap-2 rounded-md transition">
      <Link
        href={`/profile/${song.profiles?.nickname ?? ""}`}
        className="w-fit"
      >
        <p className="truncate text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
          {song.profiles?.nickname ?? "Unknown"}
        </p>
      </Link>

      <div className="relative">
        <Image
          src={getCoverUrl(song.image_path)}
          alt={song.title}
          width={160}
          height={160}
          className="aspect-square w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/40 opacity-0 transition-opacity group-hover/card:opacity-100">
          <button
            onClick={() => onPlay(song.id)}
            className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
            aria-label={`Play ${song.title}`}
          >
            <Play className="ml-0.5 size-4" fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-col">
          <TitleLink
            songId={song.id}
            title={song.title}
            className="text-xs font-semibold"
          />
          <p className="truncate text-xs text-muted-foreground">
            {meta || "No data..."}
          </p>
        </div>
        <Actions
          songId={song.id}
          size="sm"
          isLikedInitially={isLikedInitially}
          onLikeToggle={onLikeToggle}
        />
      </div>
    </div>
  );
};
