"use client";

import { useCallback, useEffect, useRef } from "react";
import usePlayer from "@/hooks/player/use-player";
import { useGetSongById } from "@/hooks/songs/use-get-song-by-id";
import { useLoadSongUrl } from "@/hooks/songs/use-load-song-url";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";

export function Controls() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = usePlayer((s) => s.isPlaying);
  const setIsPlaying = usePlayer((s) => s.setIsPlaying);
  const setProgress = usePlayer((s) => s.setProgress);
  const setDuration = usePlayer((s) => s.setDuration);
  const seekTo = usePlayer((s) => s.seekTo);
  const clearSeekRequest = usePlayer((s) => s.clearSeekRequest);
  const activeId = usePlayer((state) => state.activeId);
  const ids = usePlayer((state) => state.ids);
  const setActiveId = usePlayer((state) => state.setActiveId);
  const volume = usePlayer((state) => state.volume);
  const playPauseRequested = usePlayer((state) => state.playPauseRequested);
  const requestPlayPause = usePlayer((state) => state.requestPlayPause);
  const clearPlayPauseRequest = usePlayer(
    (state) => state.clearPlayPauseRequest,
  );

  const { song } = useGetSongById(activeId);
  const { url } = useLoadSongUrl(song?.path ?? null);

  const handleNext = useCallback(() => {
    if (!ids.length || !activeId) return;
    const currentIndex = ids.indexOf(activeId);
    const nextId = ids[currentIndex + 1] ?? ids[0];
    setActiveId(nextId);
  }, [ids, activeId, setActiveId]);

  const handlePrev = useCallback(() => {
    if (!ids.length || !activeId) return;
    const currentIndex = ids.indexOf(activeId);
    const prevId = ids[currentIndex - 1] ?? ids[ids.length - 1];
    setActiveId(prevId);
  }, [ids, activeId, setActiveId]);

  useEffect(() => {
    if (!audioRef.current || !url) return;
    audioRef.current.src = url;
    audioRef.current.play().catch(() => setIsPlaying(false));
    audioRef.current.onended = handleNext;
  }, [url, handleNext, setIsPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (seekTo === null || !audioRef.current || !audioRef.current.duration)
      return;
    audioRef.current.currentTime = seekTo * audioRef.current.duration;
    clearSeekRequest();
  }, [seekTo, clearSeekRequest]);

  useEffect(() => {
    if (playPauseRequested === false || !audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
    clearPlayPauseRequest();
  }, [playPauseRequested, clearPlayPauseRequest]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="flex items-center justify-center gap-6">
      <audio
        ref={audioRef}
        className="hidden"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          if (el.duration) setProgress(el.currentTime / el.duration);
        }}
      />

      <button
        onClick={handlePrev}
        className="text-neutral-300 transition-opacity hover:opacity-80 hover:text-foreground"
        aria-label="Previous"
      >
        <SkipBack className="size-4" fill="currentColor" />
      </button>

      <button
        onClick={togglePlay}
        className={cn(
          "flex size-8 items-center justify-center rounded-full",
          "bg-primary text-primary-foreground transition-opacity hover:opacity-80",
        )}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? (
          <Pause className="size-4" fill="currentColor" />
        ) : (
          <Play className="ml-0.5 size-4" fill="currentColor" />
        )}
      </button>

      <button
        onClick={handleNext}
        className="text-neutral-300 transition-opacity hover:opacity-80 hover:text-foreground"
        aria-label="Next"
      >
        <SkipForward className="size-4" fill="currentColor" />
      </button>
    </div>
  );
}
