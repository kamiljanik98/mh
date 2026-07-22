import usePlayer from "@/hooks/player/use-player";
import type { Song } from "@/types";

export function useOnPlay(songs: Song[]) {
  const setActiveId = usePlayer((state) => state.setActiveId);
  const setIds = usePlayer((state) => state.setIds);
  const setSongs = usePlayer((state) => state.setSongs);

  const onPlay = (id: string) => {
    setSongs(songs);
    setIds(songs.map((song) => song.id));
    setActiveId(id);
  };

  return onPlay;
}
