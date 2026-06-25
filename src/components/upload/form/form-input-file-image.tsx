import { useDropzone } from "react-dropzone";
import { Controller, FieldValues } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { FormInputFileProps } from "./form-input-file.types";
import ImagePreview from "./image-preview";
import { DASHED_BORDER } from "@/lib/constants";

const FormInputFileImage = <T extends FieldValues>({
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
        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel>{label}</FieldLabel>
            <div
              {...getRootProps()}
              data-drag-active={isDragActive}
              data-invalid={fieldState.invalid}
              className={`relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden transition-colors data-[drag-active=true]:bg-muted data-[invalid=true]:border-destructive ${className ?? ""}`}
              style={DASHED_BORDER}
            >
              <input {...getInputProps()} />
              <ImagePreview file={field.value} isDragActive={isDragActive} />
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

export default FormInputFileImage;
