const MOCK_SONGS = [
  {
    id: "1",
    title: "Dark Melody",
    genre: "Trap",
    bpm: 140,
    nickname: "prodbyjukka",
    image_path: null,
  },
  {
    id: "2",
    title: "Summer Haze",
    genre: "Lo-fi",
    bpm: 90,
    nickname: "beatmaker99",
    image_path: null,
  },
  {
    id: "3",
    title: "Neon Nights",
    genre: "Drill",
    bpm: 145,
    nickname: "trapgod",
    image_path: null,
  },
  {
    id: "4",
    title: "Cold Front",
    genre: "Ambient",
    bpm: 75,
    nickname: "chillprod",
    image_path: null,
  },
  {
    id: "5",
    title: "Rage Mode",
    genre: "Trap",
    bpm: 160,
    nickname: "prodbyjukka",
    image_path: null,
  },
  {
    id: "6",
    title: "Midnight Run",
    genre: "Boom Bap",
    bpm: 95,
    nickname: "beatmaker99",
    image_path: null,
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

export default function DiscoverPage() {
  return (
    <div className="px-6 py-10 min-w-6xl mx-auto">
      <section>
        <h2 className="text-lg font-semibold text-neutral-100 mb-6">
          Discover this week
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {MOCK_SONGS.map((song) => (
            <SongCard key={song.id} {...song} />
          ))}
        </div>
      </section>
    </div>
  );
}
