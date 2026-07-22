import {
  Heart,
  Repeat2,
  Share2,
  MoreHorizontal,
  Play,
  Copy,
  ListMusic,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";

const MOCK_SONG = {
  id: "1",
  title: "Dark Melody",
  genre: "Trap",
  bpm: 140,
  scale: "A minor",
  tags: ["dark", "melodic", "trap", "hard", "808s"],
  description: "WE MADE A DARK ONE\n\nFree for non-commercial use with credit.",
  nickname: "prodbyjukka",
  plays: 125000,
  likes: 9615,
  reposts: 375,
  createdAt: "14 days ago",
};

const MOCK_COMMENTS = [
  {
    id: "1",
    user: "beatfan99",
    time: "0:42",
    text: "those 808s are insane",
    ago: "2 hours ago",
  },
  {
    id: "2",
    user: "trapgod",
    time: "1:15",
    text: "fire beat bro",
    ago: "5 hours ago",
  },
  {
    id: "3",
    user: "chillprod",
    time: "2:30",
    text: "melodic section goes crazy",
    ago: "7 hours ago",
  },
];

export default function SongPage() {
  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col gap-6">
      {/* Hero — waveform area */}
      <div className="bg-neutral-700 flex gap-0">
        {/* Left — player */}
        <div className="flex-1 px-6 pt-6 pb-4 flex flex-col gap-4">
          {/* Title row */}
          <div className="flex items-start gap-4">
            <button className="w-14 h-14 bg-neutral-900 hover:bg-neutral-800 flex items-center justify-center shrink-0 transition-colors">
              <Play size={22} className="text-white fill-white ml-1" />
            </button>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold text-white leading-tight">
                  {MOCK_SONG.title}
                </h1>
              </div>
              <Link
                href="#"
                className="text-sm text-neutral-300 hover:text-white transition-colors"
              >
                {MOCK_SONG.nickname}
              </Link>
            </div>
            <div className="ml-auto flex flex-col items-end gap-1 shrink-0">
              <span className="text-xs text-neutral-400">
                {MOCK_SONG.createdAt}
              </span>
              <span className="text-xs border border-neutral-500 text-neutral-300 px-2 py-0.5">
                #{MOCK_SONG.genre}
              </span>
            </div>
          </div>

          {/* Waveform */}
          <div className="relative h-20 flex items-end gap-px overflow-hidden">
            {Array.from({ length: 160 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-neutral-400 opacity-70"
                style={{
                  height: `${25 + Math.sin(i * 0.3) * 20 + Math.sin(i * 0.7) * 15 + Math.sin(i * 1.3) * 10}%`,
                }}
              />
            ))}
            {/* Playhead */}
            <div className="absolute left-[5%] top-0 bottom-0 w-px bg-emerald-400" />
            <div
              className="absolute left-0 top-0 bottom-0 bg-emerald-500/20"
              style={{ width: "5%" }}
            />
          </div>

          {/* Timestamps */}
          <div className="flex justify-between text-xs text-neutral-400 -mt-2">
            <span>0:12</span>
            <span>3:42</span>
          </div>
        </div>

        {/* Right — cover */}
        <div className="w-44 h-44 shrink-0 bg-neutral-800 flex items-center justify-center text-neutral-600 text-xs self-start">
          No cover
        </div>
      </div>

      {/* Actions bar */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex gap-1">
          {[
            { icon: Heart, label: "" },
            { icon: Repeat2, label: "" },
            { icon: Share2, label: "" },
            { icon: Copy, label: "" },
            { icon: ListMusic, label: "" },
            { icon: MoreHorizontal, label: "" },
            { icon: ShoppingCart, label: "" },
          ].map(({ icon: Icon }, i) => (
            <button
              key={i}
              className="p-2 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 transition-colors"
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
        <div className="flex gap-4 text-xs text-neutral-500">
          <span>▶ {MOCK_SONG.plays.toLocaleString()}</span>
          <span>♥ {MOCK_SONG.likes.toLocaleString()}</span>
          <span>⟲ {MOCK_SONG.reposts}</span>
        </div>
      </div>

      {/* Description + tags */}
      <div className="flex gap-6">
        <div className="w-14 h-14 shrink-0 bg-neutral-800 rounded-full" />
        <div className="flex flex-col gap-3">
          <p className="text-sm text-neutral-300 whitespace-pre-line">
            {MOCK_SONG.description}
          </p>
          <div className="flex gap-2 flex-wrap">
            {MOCK_SONG.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs border border-neutral-700 text-neutral-400 px-2.5 py-1 hover:border-neutral-500 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex gap-6 text-xs text-neutral-500 mt-1">
            <span>
              Genre: <span className="text-neutral-300">{MOCK_SONG.genre}</span>
            </span>
            <span>
              BPM: <span className="text-neutral-300">{MOCK_SONG.bpm}</span>
            </span>
            <span>
              Scale: <span className="text-neutral-300">{MOCK_SONG.scale}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="flex flex-col gap-4 border-t border-neutral-800 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-200">
            {MOCK_COMMENTS.length} comments
          </h2>
          <span className="text-xs text-neutral-500">Sorted by: Newest</span>
        </div>

        {/* Comment input */}
        <div className="flex gap-3 items-center">
          <div className="w-8 h-8 bg-neutral-800 rounded-full shrink-0" />
          <input
            type="text"
            placeholder="Write a comment"
            className="flex-1 bg-neutral-800 text-neutral-200 placeholder:text-neutral-600 text-sm px-4 py-2 outline-none focus:bg-neutral-700 transition-colors"
          />
        </div>

        {/* Comment list */}
        {MOCK_COMMENTS.map((c) => (
          <div key={c.id} className="flex gap-3 items-start">
            <div className="w-8 h-8 bg-neutral-800 rounded-full shrink-0" />
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-neutral-300">
                  {c.user}
                </span>
                <span className="text-xs text-neutral-600">at {c.time}</span>
                <span className="text-xs text-neutral-600">· {c.ago}</span>
              </div>
              <p className="text-sm text-neutral-400">{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
