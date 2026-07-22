import { Grid } from "@/components/songs/grid";

export default function DiscoverPage() {
  return (
    <div className="px-6 py-10 min-w-6xl mx-auto">
      <section>
        <h2 className="text-lg font-semibold text-neutral-100 mb-6">
          Discover this week
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Grid />
        </div>
      </section>
    </div>
  );
}
