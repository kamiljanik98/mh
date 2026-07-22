import { create } from "zustand";
import type { Song } from "@/types";

interface PlayerStore {
  ids: string[];
  activeId: string | null;
  songs: Song[];
  volume: number;
  setActiveId: (id: string) => void;
  setIds: (ids: string[]) => void;
  setSongs: (songs: Song[]) => void;
  setVolume: (volume: number) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  activeId: null,
  songs: [],
  volume: 1,
  setActiveId: (id) => set({ activeId: id }),
  setIds: (ids) => set({ ids }),
  setSongs: (songs) => set({ songs }),
  setVolume: (volume) => set({ volume }),
  reset: () => set({ ids: [], activeId: null, songs: [], volume: 1 }),
}));

export default usePlayer;
