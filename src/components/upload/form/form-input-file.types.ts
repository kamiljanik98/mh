import { type Accept } from "react-dropzone";
import { type Control, type Path, type FieldValues } from "react-hook-form";

export type FormInputFileProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  onFileDrop?: (file: File) => void;
  accept?: Accept;
  maxSize?: number;
  className?: string;
};
