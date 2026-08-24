import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import type { Tag } from "@/types";

interface TagItemProps {
  tag: Tag;
}

export default function TagItem({ tag }: TagItemProps) {
  const postCount = tag.postCount ?? 0;
  const articleLabel = postCount === 1 ? "article" : "articles";

  return (
    <Link
      href={`/tags/${tag.slug.current}`}
      aria-label={`Explore ${tag.name}, ${postCount} ${articleLabel}`}
      className="group relative block border-t border-border-default px-0 py-7 transition-colors duration-(--duration-normal) ease-default hover:bg-bg-hover focus-visible:ring-2 focus-visible:ring-border-accent focus-visible:outline-none focus-visible:ring-inset md:px-5 md:py-8"
    >
      <div className="flex items-start justify-between gap-6">
        {/* Content */}
        <div className="min-w-0">
          <h3 className="text-sub text-text-primary transition-colors duration-(--duration-fast) ease-default group-hover:text-text-accent">
            {tag.name}
          </h3>

          {tag.description && (
            <p className="mt-2 max-w-xl text-body text-text-muted">
              {tag.description}
            </p>
          )}

          {/* Metadata */}
          <div className="mt-4 flex items-center gap-2 text-caption text-text-muted">
            <span>
              {postCount} {articleLabel}
            </span>

            <span aria-hidden="true" className="text-text-muted/50">
              ·
            </span>

            <span className="text-text-accent">Explore</span>
          </div>
        </div>

        {/* Arrow */}
        <span
          aria-hidden="true"
          className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border-default text-text-muted transition-all duration-(--duration-normal) ease-default group-hover:translate-x-0.5 group-hover:border-border-accent group-hover:bg-bg-accent group-hover:text-text-inverse"
        >
          <ArrowUpRightIcon className="size-4" />
        </span>
      </div>
    </Link>
  );
}
