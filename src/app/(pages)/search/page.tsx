import { getSongs } from "@/actions/get-songs";
import { SearchContent } from "@/components/search/search-content";

type SearchPageProps = {
  searchParams: Promise<{ title?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { title } = await searchParams;
  const { data: songs, error } = await getSongs(title);

  if (error) {
    return (
      <p className="text-destructive text-sm p-6">
        Failed to load search results
      </p>
    );
  }

  return <SearchContent songs={songs} title={title} />;
}
