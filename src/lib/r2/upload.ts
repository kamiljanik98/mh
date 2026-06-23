import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./client";

const BUCKETS = {
  songs: process.env.R2_BUCKET_SONGS!,
  covers: process.env.R2_BUCKET_COVERS!,
} as const;

type Bucket = keyof typeof BUCKETS;

async function uploadToR2(
  file: File,
  bucket: Bucket,
  path: string,
): Promise<void> {
  const buffer = Buffer.from(await file.arrayBuffer());
  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKETS[bucket],
      Key: path,
      Body: buffer,
      ContentType: file.type,
    }),
  );
}

export async function uploadSong(file: File, path: string): Promise<void> {
  return uploadToR2(file, "songs", path);
}

export async function uploadStem(file: File, path: string): Promise<void> {
  return uploadToR2(file, "songs", path);
}

export async function uploadCover(file: File, path: string): Promise<void> {
  return uploadToR2(file, "covers", path);
}

export async function deleteFromR2(
  bucket: Bucket,
  path: string,
): Promise<void> {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: BUCKETS[bucket],
      Key: path,
    }),
  );
}
