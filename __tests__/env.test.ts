import { describe, it, expect } from "vitest";

describe("R2 environment variables", () => {
  const required = [
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET_SONGS",
    "R2_BUCKET_COVERS",
    "NEXT_PUBLIC_R2_COVERS_URL",
  ];

  it.each(required)("%s id defined and non-empty", (key) => {
    expect(process.env[key]).toBeTruthy();
  });
});
