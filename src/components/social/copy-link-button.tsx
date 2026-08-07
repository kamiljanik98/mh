"use client";

import { Link } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type CopyLinkButtonProps = {
  path: string;
  className?: string;
};

export function CopyLinkButton({ path, className }: CopyLinkButtonProps) {
  async function handleCopy(e: React.MouseEvent) {
    e.stopPropagation();
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      toast.error("Failed to copy link");
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className={className}
    >
      <Link size={14} />
      Link
    </Button>
  );
}
