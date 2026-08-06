"use client";

import { useEffect, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { getAvatarUrl } from "@/lib/r2/public";

type FormInputAvatarProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  currentAvatarPath: string | null;
};

const FormInputAvatar = <T extends FieldValues>({
  name,
  control,
  currentAvatarPath,
}: FormInputAvatarProps<T>) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Field>
          <FieldLabel>Avatar</FieldLabel>
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full overflow-hidden bg-muted shrink-0">
              <img
                src={preview ?? getAvatarUrl(currentAvatarPath)}
                alt="Avatar preview"
                className="size-full object-cover"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                field.onChange(file);
                setPreview(URL.createObjectURL(file));
              }}
              className="text-xs text-neutral-400 file:mr-2 file:rounded-md file:border-0 file:bg-muted file:px-2 file:py-1 file:text-xs file:text-foreground"
            />
          </div>
        </Field>
      )}
    />
  );
};

export default FormInputAvatar;
