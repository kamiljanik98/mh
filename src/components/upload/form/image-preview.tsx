import { ImageIcon } from "lucide-react";

function ImagePreview({
  file,
  isDragActive,
}: {
  file: File | null;
  isDragActive: boolean;
}) {
  if (file instanceof File) {
    return (
      <img
        src={URL.createObjectURL(file)}
        alt="Cover preview"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <div className="flex flex-col items-center gap-2 text-muted-foreground">
      <ImageIcon size={32} />
      <span className="text-sm">
        {isDragActive
          ? "Drop image here"
          : "Drag image here or click to select"}
      </span>
    </div>
  );
}

export default ImagePreview;
