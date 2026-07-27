import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
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
    setValue(trimmed);
    router.push(`/search?title=${encodeURIComponent(trimmed)}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-sm">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        variant="filled"
        className="pl-9"
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
        <ul className="absolute top-full z-50 mt-1 w-full overflow-hidden rounded-md border border-border bg-card">
          {suggestions.map((song) => (
            <li
              key={song.id}
              className={cn(
                "cursor-pointer px-3 py-2 text-sm text-foreground hover:bg-muted",
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
