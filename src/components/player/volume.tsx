"use client";

import { Slider } from "@/components/ui/slider";
import usePlayer from "@/hooks/player/use-player";

export function Volume() {
  const volume = usePlayer((state) => state.volume);
  const setVolume = usePlayer((state) => state.setVolume);

  return (
    <div className="flex items-center justify-end">
      <Slider
        value={[volume * 100]}
        max={100}
        step={1}
        onValueChange={([value]) => setVolume(value / 100)}
        className="w-24"
      />
    </div>
  );
}
