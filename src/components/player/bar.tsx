"use client";

import { useGetSongById } from "@/hooks/songs/use-get-song-by-id";
import usePlayer from "@/hooks/player/use-player";
import { TrackInfo } from "./track-info";
import { Controls } from "./controls";
import { Volume } from "./volume";

export const Bar = () => {
  const activeId = usePlayer((state) => state.activeId);
  const { song } = useGetSongById(activeId);

  if (!activeId || !song) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 flex justify-center border-t bg-foreground">
      <div className="grid w-full max-w-6xl grid-cols-3 items-center px-6 py-3">
        <TrackInfo song={song} />
        <Controls />
        <Volume />
      </div>
    </div>
  );
};
