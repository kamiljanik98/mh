import { useDropzone } from "react-dropzone";
import { Controller, FieldValues } from "react-hook-form";
import { XIcon, MusicIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { FormInputFileProps } from "./form-input-file.types";
import { cn } from "@/lib/utils";
import { DASHED_BORDER } from "@/lib/constants";

const FormInputFileStem = <T extends FieldValues>({
  name,
  control,
  label,
  onFileDrop,
  accept,
  maxSize,
  className,
}: FormInputFileProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const { getRootProps, getInputProps, isDragActive, fileRejections } =
          useDropzone({
            onDrop: (acceptedFiles) => {
              if (acceptedFiles[0]) {
                field.onChange(acceptedFiles[0]);
                onFileDrop?.(acceptedFiles[0]);
              }
            },
            accept,
            maxSize,
            maxFiles: 1,
          });

        const file = field.value as File | undefined;

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <div
              tabIndex={0}
              role="button"
              {...getRootProps()}
              data-drag-active={isDragActive}
              data-invalid={fieldState.invalid}
              className={cn(
                "flex items-center justify-between gap-3 rounded-md px-3 py-2 cursor-pointer transition-colors data-[drag-active=true]:bg-muted data-[invalid=true]:border-destructive",
                className,
              )}
              style={DASHED_BORDER}
            >
              <input {...getInputProps()} />
              <div className="flex items-center gap-2 min-w-0">
                <MusicIcon size={16} className="shrink-0 text-neutral-500" />
                {file ? (
                  <p className="truncate text-xs text-neutral-300">
                    {file.name}
                  </p>
                ) : (
                  <p className="truncate text-xs text-neutral-500">
                    Drop stem file or click to browse
                  </p>
                )}
              </div>
              {file && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    field.onChange(undefined);
                  }}
                  className="shrink-0 text-neutral-500 hover:text-destructive transition-colors"
                >
                  <XIcon size={14} />
                </button>
              )}
            </div>
            {(fieldState.error || fileRejections[0]) && (
              <p className="text-destructive text-sm">
                {fileRejections[0]?.errors[0].message ??
                  fieldState.error?.message}
              </p>
            )}
          </Field>
        );
      }}
    />
  );
};

export default FormInputFileStem;
