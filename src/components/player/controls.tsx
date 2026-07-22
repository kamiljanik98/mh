"use client";

import { useCallback, useEffect, useRef } from "react";
import usePlayer from "@/hooks/player/use-player";
import { useGetSongById } from "@/hooks/songs/use-get-song-by-id";
import { useLoadSongUrl } from "@/hooks/songs/use-load-song-url";

export function Controls() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activeId = usePlayer((state) => state.activeId);
  const ids = usePlayer((state) => state.ids);
  const setActiveId = usePlayer((state) => state.setActiveId);
  const volume = usePlayer((state) => state.volume);

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
    audioRef.current.volume = volume;
    audioRef.current.play().catch(() => {});
    audioRef.current.onended = handleNext;
  }, [url, handleNext, volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <audio ref={audioRef} />
      <button onClick={handlePrev}>Prev</button>
      <button onClick={togglePlay}>Play/Pause</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}
