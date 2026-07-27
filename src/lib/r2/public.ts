import { IMAGE_PLACEHOLDER } from "../constants";
import { R2_AVATARS_URL, R2_COVERS_URL } from "./client";

export function getCoverUrl(path: string | null): string {
  if (!path) {
    return IMAGE_PLACEHOLDER.COVER;
  }
  return `${R2_COVERS_URL}/${path}`;
}

export function getAvatarUrl(path: string | null): string {
  if (!path) {
    return IMAGE_PLACEHOLDER.AVATAR;
  }
  return `${R2_AVATARS_URL}/${path}`;
}
