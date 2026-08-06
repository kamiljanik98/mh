const IMAGE_EXTENSION_BY_MIME = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;
export const ALLOWED_IMAGE_TYPES = Object.keys(
  IMAGE_EXTENSION_BY_MIME,
) as (keyof typeof IMAGE_EXTENSION_BY_MIME)[];

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

type ValidationResult = {
  error: Error | null;
  code?: "FORMAT" | "SIZE";
};

export const validateImageFile = (file: File): ValidationResult => {
  const fileType = file.type;

  if (file.size > MAX_IMAGE_BYTES) {
    return { error: new Error("Image size exceeds the limit"), code: "SIZE" };
  }

  if (
    !ALLOWED_IMAGE_TYPES.includes(
      fileType as (typeof ALLOWED_IMAGE_TYPES)[number],
    )
  ) {
    return { error: new Error("Invalid image format"), code: "FORMAT" };
  }

  return { error: null };
};

export const safeImageExtension = (file: File) => {
  return (
    IMAGE_EXTENSION_BY_MIME[
      file.type as keyof typeof IMAGE_EXTENSION_BY_MIME
    ] ?? "bin"
  );
};
