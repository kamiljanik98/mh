import { cn } from "@/lib/utils";
import Link from "next/link";

type TitleLinkProps = {
  songId: string;
  title: string;
  className: string;
};
export const TitleLink = ({ songId, title, className }: TitleLinkProps) => {
  return (
    <Link
      href={`/songs/${songId}`}
      className={cn(
        "truncate text-foreground transition-colors hover:text-primary hover:underline",
        className,
      )}
    >
      {title}
    </Link>
  );
};
