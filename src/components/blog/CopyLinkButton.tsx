"use client";

import { CheckIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface CopyLinkButtonProps {
  url: string;
}

export default function CopyLinkButton({ url }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Clipboard unavailable.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Article link copied" : "Copy article link"}
      title={copied ? "Copied" : "Copy link"}
      className="inline-flex size-10 items-center justify-center rounded-full text-text-muted transition-all duration-(--duration-fast) ease-default hover:bg-bg-surface hover:text-text-accent focus-visible:ring-2 focus-visible:ring-border-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus-visible:outline-none"
    >
      {copied ? (
        <CheckIcon aria-hidden="true" className="size-4 text-text-accent" />
      ) : (
        <ClipboardDocumentIcon aria-hidden="true" className="size-4" />
      )}
    </button>
  );
}
