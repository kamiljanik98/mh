import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { r2 } from "@/lib/r2/client";
import { DeleteObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

const BUCKETS = {
  songs: process.env.R2_BUCKET_SONGS!,
  covers: process.env.R2_BUCKET_COVERS!,
  stems: process.env.R2_BUCKET_STEMS!,
} as const;

async function listAllKeys(bucket: string): Promise<string[]> {
  const keys: string[] = [];
  let continuationToken: string | undefined;

  do {
    const result = await r2.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        ContinuationToken: continuationToken,
      }),
    );
    for (const obj of result.Contents ?? []) {
      if (obj.Key) keys.push(obj.Key);
    }
    continuationToken = result.NextContinuationToken;
  } while (continuationToken);

  return keys;
}

async function deleteKeys(
  bucket: string,
  keys: string[],
): Promise<{ deleted: string[]; failed: string[] }> {
  const deleted: string[] = [];
  const failed: string[] = [];

  for (const key of keys) {
    try {
      await r2.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
      deleted.push(key);
    } catch {
      failed.push(key);
    }
  }

  return { deleted, failed };
}

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();

  const [{ data: songs }, { data: stems }] = await Promise.all([
    supabase.from("songs").select("path, image_path"),
    supabase.from("stems").select("path"),
  ]);

  const dbPaths = {
    songs: new Set((songs ?? []).map((s) => s.path)),
    covers: new Set(
      (songs ?? []).map((s) => s.image_path).filter(Boolean) as string[],
    ),
    stems: new Set((stems ?? []).map((s) => s.path)),
  };

  const orphaned: Record<string, string[]> = {};
  const deletionResults: Record<
    string,
    { deleted: string[]; failed: string[] }
  > = {};

  for (const [bucketKey, bucketName] of Object.entries(BUCKETS)) {
    const r2Keys = await listAllKeys(bucketName);
    const validPaths = dbPaths[bucketKey as keyof typeof dbPaths];
    const orphanedKeys = r2Keys.filter((key) => !validPaths.has(key));

    orphaned[bucketKey] = orphanedKeys;
    deletionResults[bucketKey] = await deleteKeys(bucketName, orphanedKeys);
  }

  console.log("Orphaned files deleted:", deletionResults);

  return NextResponse.json({ orphaned: deletionResults });
}
