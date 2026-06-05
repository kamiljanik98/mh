import { describe, it, expect } from "vitest";
import { HeadBucketCommand } from "@aws-sdk/client-s3";
import { r2 } from "@/lib/r2/client";

describe("R2 client", () => {
  it.each([
    ["songs", process.env.R2_BUCKET_SONGS!],
    ["covers", process.env.R2_BUCKET_COVERS!],
  ])("connects to %s bucket", async (_label, bucket) => {
    const result = await r2.send(new HeadBucketCommand({ Bucket: bucket }));
    expect(result.$metadata.httpStatusCode).toBe(200);
  });
});
