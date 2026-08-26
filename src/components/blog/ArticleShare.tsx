"use client";

import {
  CheckIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";

import ShareButton from "./ShareButton";

interface ArticleShareProps {
  title: string;
  variant?: "default" | "sidebar";
}

export default function ArticleShare({
  title,
  variant = "default",
}: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  const isSidebar = variant === "sidebar";

  async function nativeShare() {
    if (
      typeof navigator === "undefined" ||
      typeof navigator.share !== "function"
    ) {
      await copyLink();
      return;
    }

    try {
      await navigator.share({
        title,
        url: window.location.href,
      });
    } catch {
      // User cancelled the native share sheet.
    }
  }

  async function copyLink() {
    try {
      if (
        typeof navigator === "undefined" ||
        !navigator.clipboard ||
        typeof window === "undefined"
      ) {
        return;
      }

      await navigator.clipboard.writeText(window.location.href);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      // Clipboard unavailable or permission denied.
    }
  }

  function openShareUrl(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function getCurrentUrl() {
    return window.location.href;
  }

  const sharingOptions = (
    <>
      {/* Native share */}
      <ShareButton label="Share" onClick={nativeShare} compact={isSidebar}>
        <ShareIcon aria-hidden="true" className="size-4" />

        {!isSidebar && (
          <span className="sr-only sm:not-sr-only sm:ml-2">Share</span>
        )}
      </ShareButton>

      {/* Copy */}
      <ShareButton
        label={copied ? "Link copied" : "Copy link"}
        onClick={copyLink}
        active={copied}
        compact={isSidebar}
      >
        {copied ? (
          <CheckIcon aria-hidden="true" className="size-4" />
        ) : (
          <ClipboardDocumentIcon aria-hidden="true" className="size-4" />
        )}

        {!isSidebar && (
          <span className="sr-only sm:not-sr-only sm:ml-2">
            {copied ? "Copied" : "Copy link"}
          </span>
        )}
      </ShareButton>

      {/* Facebook */}
      <ShareButton
        label="Facebook"
        onClick={() => {
          const params = new URLSearchParams({
            u: getCurrentUrl(),
          });

          openShareUrl(
            `https://www.facebook.com/sharer/sharer.php?${params.toString()}`,
          );
        }}
        compact={isSidebar}
      >
        <FacebookIcon />
      </ShareButton>

      {/* X */}
      <ShareButton
        label="X"
        onClick={() => {
          const params = new URLSearchParams({
            url: getCurrentUrl(),
            text: title,
          });

          openShareUrl(`https://twitter.com/intent/tweet?${params.toString()}`);
        }}
        compact={isSidebar}
      >
        <XIcon />
      </ShareButton>

      {/* LinkedIn */}
      <ShareButton
        label="LinkedIn"
        onClick={() => {
          const params = new URLSearchParams({
            url: getCurrentUrl(),
          });

          openShareUrl(
            `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`,
          );
        }}
        compact={isSidebar}
      >
        <LinkedInIcon />
      </ShareButton>

      {/* WhatsApp */}
      <ShareButton
        label="WhatsApp"
        onClick={() => {
          const text = `${title}\n\n${window.location.href}`;

          window.location.assign(
            `https://wa.me/?text=${encodeURIComponent(text)}`,
          );
        }}
        compact={isSidebar}
      >
        <WhatsAppIcon />
      </ShareButton>

      {/* Email */}
      <ShareButton
        label="Email"
        onClick={() => {
          const subject = encodeURIComponent(title);
          const body = encodeURIComponent(`${title}\n\n${getCurrentUrl()}`);

          window.location.href = `mailto:?subject=${subject}&body=${body}`;
        }}
        compact={isSidebar}
      >
        <EnvelopeIcon aria-hidden="true" className="size-4" />
      </ShareButton>
    </>
  );

  /*
   * Sidebar version
   *
   * Deliberately quiet. It should support the TOC,
   * not compete with it.
   */
  if (isSidebar) {
    return (
      <section aria-labelledby="article-sidebar-share-heading">
        <h2
          id="article-sidebar-share-heading"
          className="text-label font-medium tracking-[0.14em] text-text-muted uppercase"
        >
          Share
        </h2>

        <div
          aria-label="Article sharing options"
          className="mt-3 flex flex-wrap gap-1.5"
        >
          {sharingOptions}
        </div>
      </section>
    );
  }

  /*
   * Full article version
   */
  return (
    <section
      aria-labelledby="article-share-heading"
      className="border-y border-border-subtle py-6"
    >
      <div className="container-page flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2
            id="article-share-heading"
            className="text-caption font-medium text-text-primary"
          >
            Share this article
          </h2>

          <p className="mt-1 text-caption text-text-muted">
            Share this article with someone who may find it useful.
          </p>
        </div>

        <div
          aria-label="Article sharing options"
          className="flex flex-wrap items-center gap-2"
        >
          {sharingOptions}
        </div>
      </div>
    </section>
  );
}

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.68H9.35V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V8.99h3.56v11.46zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.198-.347.298-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
    </svg>
  );
}
