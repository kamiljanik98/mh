import { describe, it, expect, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: async () => ({
    getAll: () => [],
    set: () => {},
  }),
}));

describe("Supabsase server client", () => {
  it("initializes without errors", async () => {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    expect(supabase).toBeDefined();
    expect(supabase.from).toBeTypeOf("function");
  });
});
