"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause } from "lucide-react";
import type { Song } from "@/types";
import { getCoverUrl } from "@/lib/r2/public";

import usePlayer from "@/hooks/player/use-player";
import { resolveSongUrl } from "@/actions/resolve-song-url";

interface WaveformCardProps {
  song: Song;
  onPlay: (id: string) => void;
}

export const WaveformCard = ({ song, onPlay }: WaveformCardProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const activeId = usePlayer((s) => s.activeId);
  const isPlaying = usePlayer((s) => s.isPlaying);
  const progress = usePlayer((s) => s.progress);
  const requestSeek = usePlayer((s) => s.requestSeek);
  const isActive = activeId === song.id;

  useEffect(() => {
    if (!rootRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    let cancelled = false;

    const init = async () => {
      const { url, error } = await resolveSongUrl(song.path);
      if (cancelled || !containerRef.current || error || !url) return;

      wavesurferRef.current = WaveSurfer.create({
        container: containerRef.current,
        url,
        waveColor: "#525252",
        progressColor: "#fafafa",
        height: 32,
        barWidth: 2,
        barGap: 2,
        barRadius: 2,
        cursorWidth: 0,
        interact: false,
      });
    };

    init();

    return () => {
      cancelled = true;
      wavesurferRef.current?.destroy();
    };
  }, [isVisible, song.path]);

  useEffect(() => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.seekTo(isActive ? progress : 0);
  }, [isActive, progress]);

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickProgress = (e.clientX - rect.left) / rect.width;
    requestSeek(clickProgress);
  };

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
        className="size-16 shrink-0 rounded-sm object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-sm font-medium text-foreground">
          {song.title}
        </p>

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
            onClick={handleWaveformClick}
            className="h-8 flex-1 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
