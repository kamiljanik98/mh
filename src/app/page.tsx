import { Shelf } from "@/components/songs/shelf";

export default async function HomePage() {
  return (
    <div>
      <section className="px-6 py-10 min-w-6xl mx-auto">
        <h2 className="text-lg font-semibold text-neutral-100 mb-6">
          Discover this week
        </h2>
        <Shelf />
      </section>
      <section className="px-6 py-10 min-w-6xl mx-auto">
        <h2 className="text-lg font-semibold text-neutral-100 mb-6">
          Suggested Artists
        </h2>
      </section>
    </div>
  );
}
