import { Song } from "@/types";

export function formatSongMeta(
  song: Pick<Song, "bpm" | "scale" | "genre">,
): string {
  return [song.bpm && `${song.bpm} BPM`, song.scale, song.genre]
    .filter(Boolean)
    .join(" · ");
}
