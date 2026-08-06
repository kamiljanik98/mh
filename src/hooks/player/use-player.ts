import { create } from "zustand";
import type { Song } from "@/types";
import { createJSONStorage, persist } from "zustand/middleware";

interface PlayerStore {
  ids: string[];
  activeId: string | null;
  songs: Song[];
  volume: number;
  isPlaying: boolean;
  progress: number;
  duration: number;
  seekTo: number | null;
  playPauseRequested: boolean;
  setActiveId: (id: string) => void;
  setIds: (ids: string[]) => void;
  setSongs: (songs: Song[]) => void;
  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  requestSeek: (progress: number) => void;
  clearSeekRequest: () => void;
  requestPlayPause: () => void;
  clearPlayPauseRequest: () => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>()(
  persist(
    (set) => ({
      ids: [],
      activeId: null,
      songs: [],
      volume: 1,
      isPlaying: false,
      progress: 0,
      duration: 0,
      seekTo: null,
      playPauseRequested: false,
      setActiveId: (id) => set({ activeId: id }),
      setIds: (ids) => set({ ids }),
      setSongs: (songs) => set({ songs }),
      setVolume: (volume) => set({ volume }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setProgress: (progress) => set({ progress }),
      setDuration: (duration) => set({ duration }),
      requestSeek: (progress) => set({ seekTo: progress }),
      clearSeekRequest: () => set({ seekTo: null }),
      requestPlayPause: () => set({ playPauseRequested: true }),
      clearPlayPauseRequest: () => set({ playPauseRequested: false }),
      reset: () => set({ ids: [], activeId: null, songs: [] }),
    }),
    {
      name: "musichub-player",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ volume: state.volume }),
    },
  ),
);

export default usePlayer;
