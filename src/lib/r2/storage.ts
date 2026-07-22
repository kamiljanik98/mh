import "server-only";

import { Bucket$, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2, BUCKET_SONGS, BUCKET_STEMS } from "./client";

const PRIVATE_BUCKETS = {
  songs: BUCKET_SONGS,
  stems: BUCKET_STEMS,
} as const;

export async function getPresignedUrl(
  path: string,
  bucket: keyof typeof PRIVATE_BUCKETS = "songs",
): Promise<string> {
  return getSignedUrl(
    r2,
    new GetObjectCommand({ Bucket: PRIVATE_BUCKETS[bucket], Key: path }),
    { expiresIn: 3600 },
  );
}
