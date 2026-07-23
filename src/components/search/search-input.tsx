import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { useSearchSuggestions } from "@/hooks/search/use-search-suggestions";
import { cn } from "@/lib/utils";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { suggestions } = useSearchSuggestions(value);

  const navigateToSearch = (title: string) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    router.push(`/search?title=${encodeURIComponent(trimmed)}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-sm">
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setIsOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") navigateToSearch(value);
          if (e.key === "Escape") setIsOpen(false);
        }}
        onFocus={() => value && setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        placeholder="Search tracks..."
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 w-full bg-card border border-border rounded-md overflow-hidden z-50">
          {suggestions.map((song) => (
            <li
              key={song.id}
              className={cn(
                "px-3 py-2 text-sm text-foreground cursor-pointer hover:bg-muted",
              )}
              onMouseDown={() => navigateToSearch(song.title)}
            >
              {song.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
