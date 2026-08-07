import "server-only";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2, BUCKET_SONGS, BUCKET_STEMS } from "./client";

const PRIVATE_BUCKETS = {
  songs: BUCKET_SONGS,
  stems: BUCKET_STEMS,
} as const;

type PresignOptions = {
  bucket?: keyof typeof PRIVATE_BUCKETS;
  asAttachment?: boolean;
};

export async function getPresignedUrl(
  path: string,
  { bucket = "songs", asAttachment = false }: PresignOptions = {},
): Promise<string> {
  return getSignedUrl(
    r2,
    new GetObjectCommand({
      Bucket: PRIVATE_BUCKETS[bucket],
      Key: path,
      ...(asAttachment && {
        ResponseContentDisposition: `attachment; filename="${path.split("/").pop() ?? path}"`,
      }),
    }),
    { expiresIn: 3600 },
  );
}
