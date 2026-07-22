import { R2_COVERS_URL } from "./client";

export function getCoverUrl(path: string): string {
  return `${R2_COVERS_URL}/${path}`;
}
