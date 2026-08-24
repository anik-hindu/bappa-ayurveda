import { ArrowLeftIcon, TagIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

import { Breadcrumbs, Section } from "@/components/ui";
import type { Tag } from "@/types";

interface TagHeroProps {
  tag: Tag;
}

export default function TagHero({ tag }: TagHeroProps) {
  const postCount = tag.postCount ?? 0;
  const articleLabel = postCount === 1 ? "article" : "articles";

  return (
    <Section padding="lg" aria-labelledby="tag-page-title">
      <Breadcrumbs
        items={[
          {
            label: "Tags",
            href: "/tags",
          },
          {
            label: tag.name,
            current: true,
          },
        ]}
        className="mb-10 lg:mb-14"
      />

      <header className="max-w-3xl">
        <div className="flex items-center gap-2 text-text-accent">
          <TagIcon aria-hidden="true" className="size-4" />

          <p className="text-label font-medium tracking-[0.16em] uppercase">
            Topic
          </p>
        </div>

        <h1
          id="tag-page-title"
          className="mt-4 text-[2.75rem] leading-hero md:text-hero"
        >
          {tag.name}
        </h1>

        {tag.description && (
          <p className="mt-5 max-w-2xl text-body-lg text-text-muted">
            {tag.description}
          </p>
        )}

        <p className="mt-6 text-caption font-medium text-text-primary">
          {postCount} {articleLabel}
        </p>
      </header>

      <div className="mt-10 lg:mt-12">
        <Link
          href="/tags"
          className="group inline-flex min-h-11 items-center gap-2 rounded-btn text-caption font-medium text-text-muted transition-colors duration-(--duration-fast) ease-default hover:text-text-primary focus-visible:outline-none"
        >
          <ArrowLeftIcon
            aria-hidden="true"
            className="size-4 transition-transform duration-(--duration-fast) ease-default group-hover:-translate-x-0.5"
          />

          <span>All topics</span>
        </Link>
      </div>
    </Section>
  );
}
