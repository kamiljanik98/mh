import "server-only";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2, BUCKET_SONGS, R2_COVERS_URL } from "./client";

export async function getPresignedUrl(path: string): Promise<string> {
  return getSignedUrl(
    r2,
    new GetObjectCommand({ Bucket: BUCKET_SONGS, Key: path }),
    { expiresIn: 3600 },
  );
}

export function getCoverUrl(path: string): string {
  return `${R2_COVERS_URL}/${path}`;
}
