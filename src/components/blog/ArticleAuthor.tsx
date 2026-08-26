import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui";
import { urlFor } from "@/sanity/lib/image";
import type { PostDetail } from "@/types";

interface ArticleAuthorProps {
  author: PostDetail["author"];
}

export default function ArticleAuthor({ author }: ArticleAuthorProps) {
  const authorImageUrl = author.image?.asset?._ref
    ? urlFor(author.image).width(192).height(192).url()
    : null;

  const initials = author.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Section
      padding="lg"
      aria-labelledby="article-author-heading"
      className="border-t border-border-subtle"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
          {/* Avatar */}
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full ring-1 ring-border-subtle sm:size-24">
            {authorImageUrl ? (
              <Image
                src={authorImageUrl}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex size-full items-center justify-center bg-bg-surface font-display text-2xl text-text-accent"
              >
                {initials}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="min-w-0">
            <p className="text-label font-medium tracking-[0.14em] text-text-accent uppercase">
              About the author
            </p>

            <h2
              id="article-author-heading"
              className="mt-2 text-section text-text-primary"
            >
              {author.name}
            </h2>

            {author.role && (
              <p className="mt-1 text-caption font-medium text-text-muted">
                {author.role}
              </p>
            )}

            {author.shortBio && (
              <p className="mt-4 max-w-2xl text-body leading-relaxed text-text-muted">
                {author.shortBio}
              </p>
            )}

            <Link
              href={`/authors/${author.slug.current}`}
              className="group mt-5 inline-flex min-h-10 items-center gap-2 border-b border-border-accent pb-1 text-caption font-medium text-text-primary transition-colors duration-(--duration-fast) hover:text-text-accent focus-visible:ring-2 focus-visible:ring-border-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-page focus-visible:outline-none"
            >
              <span>View full profile</span>

              <ArrowRightIcon
                aria-hidden="true"
                className="size-4 transition-transform duration-(--duration-fast) group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
