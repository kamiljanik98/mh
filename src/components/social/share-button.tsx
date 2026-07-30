"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShareButtonProps = {
  path: string;
  iconOnly?: boolean;
  className?: string;
};

export function ShareButton({
  path,
  iconOnly = false,
  className,
}: ShareButtonProps) {
  async function handleShare(e: React.MouseEvent) {
    e.stopPropagation();
    const url = `${window.location.origin}${path}`;
    await navigator.clipboard.writeText(url);
    toast.success("Link copied");
  }

  if (iconOnly) {
    return (
      <button
        onClick={handleShare}
        aria-label="Share"
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground",
          className,
        )}
      >
        <Share2 className="size-4" />
      </button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className={className}
    >
      <Share2 size={14} />
      Share
    </Button>
  );
}
