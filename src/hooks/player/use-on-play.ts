import usePlayer from "@/hooks/player/use-player";
import type { Song } from "@/types";

export function useOnPlay(songs: Song[]) {
  const activeId = usePlayer((state) => state.activeId);
  const setActiveId = usePlayer((state) => state.setActiveId);
  const setIds = usePlayer((state) => state.setIds);
  const setSongs = usePlayer((state) => state.setSongs);
  const requestPlayPause = usePlayer((state) => state.requestPlayPause);

  const onPlay = (id: string) => {
    if (id === activeId) {
      return requestPlayPause();
    } else {
      setSongs(songs);
      setIds(songs.map((song) => song.id));
      setActiveId(id);
    }
  };

  return onPlay;
}
