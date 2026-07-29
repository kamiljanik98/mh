// components/songs/waveform.tsx
"use client";

import { Play, Pause } from "lucide-react";
import usePlayer from "@/hooks/player/use-player";
import { useWaveform } from "@/hooks/songs/use-waveform";

interface WaveformProps {
  songId: string;
  path: string;
}

export const Waveform = ({ songId, path }: WaveformProps) => {
  const setActiveId = usePlayer((s) => s.setActiveId);
  const { containerRef, isActive, isPlaying, handleClick } = useWaveform({
    songId,
    path,
    height: 80,
    barWidth: 3,
    barRadius: 3,
    lazyMount: false,
    onActivate: setActiveId,
  });

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setActiveId(songId)}
        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
        aria-label={isActive && isPlaying ? "Pause" : "Play"}
      >
        {isActive && isPlaying ? (
          <Pause className="size-5" fill="currentColor" />
        ) : (
          <Play className="ml-0.5 size-5" fill="currentColor" />
        )}
      </button>
      <div
        ref={containerRef}
        onClick={handleClick}
        className="h-20 flex-1 cursor-pointer"
      />
    </div>
  );
};
