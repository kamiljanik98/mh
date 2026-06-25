import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MOCK_SONGS = [
  {
    id: "1",
    title: "Dark Melody",
    genre: "Trap",
    bpm: 140,
    nickname: "prodbyjukka",
  },
  {
    id: "2",
    title: "Summer Haze",
    genre: "Lo-fi",
    bpm: 90,
    nickname: "beatmaker99",
  },
  {
    id: "3",
    title: "Neon Nights",
    genre: "Drill",
    bpm: 145,
    nickname: "trapgod",
  },
  {
    id: "4",
    title: "Cold Front",
    genre: "Ambient",
    bpm: 75,
    nickname: "chillprod",
  },
  {
    id: "5",
    title: "Rage Mode",
    genre: "Trap",
    bpm: 160,
    nickname: "prodbyjukka",
  },
  {
    id: "6",
    title: "Midnight Run",
    genre: "Boom Bap",
    bpm: 95,
    nickname: "beatmaker99",
  },
];

function SongCard({
  title,
  genre,
  bpm,
  nickname,
}: {
  title: string;
  genre: string;
  bpm: number;
  nickname: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="aspect-square bg-neutral-800 w-full flex items-center justify-center text-neutral-600 text-xs">
        No cover
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-100 truncate">
          {title}
        </p>
        <p className="text-xs text-neutral-500 truncate">{nickname}</p>
      </div>
      <div className="flex gap-2 text-xs text-neutral-600">
        <span>{genre}</span>
        {bpm && <span>· {bpm} BPM</span>}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="max-w-4xl w-full mx-auto py-5 flex flex-col gap-12">
      <section className="bg-neutral-800 px-10 py-8 flex flex-col gap-8">
        {/* Top row — logo + auth */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="App logo" width={36} height={36} />
            <p className="text-sm font-semibold tracking-wider uppercase text-neutral-300">
              MusicHub
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <Link
              href="#"
              className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="#"
              className="text-xs border border-neutral-600 hover:border-neutral-400 text-neutral-300 hover:text-neutral-100 transition-colors px-4 py-1.5"
            >
              Create account
            </Link>
          </div>
        </div>

        {/* Bottom — headline + CTA */}
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl uppercase font-semibold text-neutral-100 max-w-lg leading-tight">
            Share your sound with the world.
          </h1>
          <p className="text-sm text-neutral-400 max-w-sm">
            Upload beats, stems and samples. Discover producers. Build your
            library.
          </p>
          <div className="flex gap-3 mt-2">
            <Link
              href="/upload"
              className="bg-emerald-500 hover:bg-emerald-400 transition-colors text-white text-sm px-6 py-2.5"
            >
              Get started
            </Link>
          </div>
        </div>
      </section>

      <div className="relative w-full max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search for artist"
          className="w-full bg-neutral-800 text-neutral-200 placeholder:text-neutral-500 text-sm px-4 py-2.5 pl-10 outline-none focus:bg-neutral-700 transition-colors"
        />
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
        />
      </div>
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-neutral-100">
            Discover this week
          </h2>
          <Link
            href="/discover"
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            Explore more →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MOCK_SONGS.map((song) => (
            <SongCard key={song.id} {...song} />
          ))}
        </div>
      </section>
    </div>
  );
}
