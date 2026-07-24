import { updateSession } from "@/lib/supabase/proxy";
import { NextRequest } from "next/server";
import { it, describe, expect } from "vitest";

describe("updateSession", () => {
  it("redirects unauthenticated user away from /upload", async () => {
    const request = new NextRequest(new URL("http://localhost:3000/upload"));
    const response = await updateSession(request);
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/");
  });

  it("redirects unauthenticated user away from any /account/* subpath", async () => {
    const request = new NextRequest(
      new URL("http://localhost:3000/account/subpath"),
    );
    const response = await updateSession(request);
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/");
  });
});
