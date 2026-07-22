"use client";

import { Grid } from "@/components/songs/grid";

export default function HomePage() {
  return (
    <div className="px-6 py-10 min-w-6xl mx-auto">
      <section>
        <h2 className="text-lg font-semibold text-neutral-100 mb-6">
          Discover this week
        </h2>
        <Grid />
      </section>
    </div>
  );
}
