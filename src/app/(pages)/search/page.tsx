import { getSearchedSongs } from "@/actions/songs/get-searched-songs";
import { Content } from "@/components/search/content";

type SearchPageProps = {
  searchParams: Promise<{ query?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { query } = await searchParams;
  const { data: songs, error } = await getSearchedSongs(query);

  if (error) {
    return (
      <p className="text-destructive text-sm p-6">
        Failed to load search results
      </p>
    );
  }

  return <Content songs={songs} query={query} />;
}
