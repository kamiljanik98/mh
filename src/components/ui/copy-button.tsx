"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    toast("Link copied", { duration: 1500 });
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button variant="outline" size="icon" onClick={handleCopy}>
      <span
        className={`transition-all duration-200 ${
          copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
        } absolute`}
      >
        <Copy className="w-4 h-4" />
      </span>
      <span
        className={`transition-all duration-200 ${
          copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } absolute`}
      >
        <Check className="w-4 h-4" />
      </span>
    </Button>
  );
}
