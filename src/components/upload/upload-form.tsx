"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import useUpload from "@/hooks/upload/use-upload";
import { uploadSchema, type UploadFormValues } from "@/lib/validations/upload";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const { upload, isLoading } = useUpload();
  const router = useRouter();

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      title: "",
      bpm: undefined,
      scale: "",
      genre: "",
      tags: "",
    },
    mode: "onBlur",
  });

  const audioRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  async function onSubmit(values: UploadFormValues) {
    const audioFile = audioRef.current?.files?.[0];

    if (!audioFile) {
      toast.error("Audio file is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    if (values.bpm) formData.append("bpm", values.bpm);
    if (values.scale) formData.append("scale", values.scale);
    if (values.genre) formData.append("genre", values.genre);
    if (values.tags?.trim()) formData.append("tags", values.tags);
    formData.append("audio", audioFile);
    if (coverRef.current?.files?.[0]) {
      formData.append("cover", coverRef.current.files[0]);
    }

    const { data, error } = await upload(formData);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Track uploaded successfully");
      router.push(`/upload/success/${data!.id}`);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <FormInput
        name="title"
        control={form.control}
        label="Title"
        placeholder="Track title"
      />
      <FormInput
        name="bpm"
        control={form.control}
        label="BPM"
        placeholder="140"
        type="number"
      />
      <FormInput
        name="scale"
        control={form.control}
        label="Scale"
        placeholder="A minor"
      />
      <FormInput
        name="genre"
        control={form.control}
        label="Genre"
        placeholder="Trap"
      />
      <FormInput
        name="tags"
        control={form.control}
        label="Tags"
        placeholder="dark, melodic"
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="audio">
          Audio file
        </label>
        <input id="audio" ref={audioRef} type="file" accept=".mp3,.wav" />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium" htmlFor="cover">
          Cover image
        </label>
        <input id="cover" ref={coverRef} type="file" accept=".jpg,.jpeg,.png" />
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
