import { S3Client } from "@aws-sdk/client-s3";

export const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true,
});

export const BUCKET_STEMS = process.env.R2_BUCKET_STEMS!;
export const BUCKET_SONGS = process.env.R2_BUCKET_SONGS!;
export const BUCKET_COVERS = process.env.R2_BUCKET_COVERS!;
export const R2_COVERS_URL = process.env.NEXT_PUBLIC_R2_COVERS_URL!;
