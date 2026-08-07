"use client";

import { useGetSongById } from "@/hooks/songs/use-get-song-by-id";
import usePlayer from "@/hooks/player/use-player";
import { TrackInfo } from "./track-info";
import { Controls } from "./controls";
import { Volume } from "./volume";
import { usePathname } from "next/navigation";

export const Bar = () => {
  const activeId = usePlayer((state) => state.activeId);
  const { song } = useGetSongById(activeId);
  const pathname = usePathname();

  if (!activeId || !song) return null;
  if (pathname.startsWith("/upload")) return null;

  return (
    <div className="z-index-5 fixed inset-x-0 bottom-0 flex justify-center border-t border-border bg-black">
      <div className="grid w-full max-w-6xl grid-cols-3 items-center px-6 py-3">
        <TrackInfo song={song} />
        <Controls song={song} />
        <Volume />
      </div>
    </div>
  );
};
