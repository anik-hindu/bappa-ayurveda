import { ArrowRightIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/ui";
import { urlFor } from "@/sanity/lib/image";
import type { PostDetail } from "@/types";

interface ArticleAuthorProps {
  author: PostDetail["author"];
}

function ArticleAuthor({ author }: ArticleAuthorProps) {
  const authorImageUrl = author.image?.asset?._ref
    ? urlFor(author.image).width(192).height(192).url()
    : null;

  const authorHref = `/authors/${author.slug.current}`;

  return (
    <Section
      padding="md"
      aria-labelledby="article-author-heading"
      className="border-t border-border-subtle"
    >
      <div className="mx-auto max-w-article">
        <div className="relative overflow-hidden rounded-card border border-border-subtle bg-bg-surface px-6 py-7 sm:px-8 sm:py-8">
          {/* Decorative accent */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 h-full w-1 bg-bg-accent"
          />

          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-7">
            {/* Author avatar */}
            <Link
              href={authorHref}
              aria-label={`View ${author.name}'s author profile`}
              className="group relative size-20 shrink-0 self-start overflow-hidden rounded-full border border-border-default bg-bg-page focus-visible:outline-none sm:size-24"
            >
              {authorImageUrl ? (
                <Image
                  src={authorImageUrl}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-(--duration-normal) ease-default group-hover:scale-105"
                />
              ) : (
                <UserCircleIcon
                  aria-hidden="true"
                  className="size-full p-3 text-text-accent transition-transform duration-(--duration-normal) ease-default group-hover:scale-105"
                />
              )}
            </Link>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <p className="text-label font-medium tracking-[0.14em] text-text-accent uppercase">
                About the author
              </p>

              <h2 id="article-author-heading" className="mt-1.5 text-sub">
                <Link
                  href={authorHref}
                  className="rounded-sm transition-colors duration-(--duration-fast) ease-default hover:text-text-accent focus-visible:outline-none"
                >
                  {author.name}
                </Link>
              </h2>

              {author.role && (
                <p className="mt-1 text-caption font-medium text-text-muted">
                  {author.role}
                </p>
              )}

              {author.bio && author.bio?.length > 0 && (
                <div className="mt-4 max-w-2xl text-body text-text-muted [&>p+p]:mt-3">
                  <PortableText
                    value={author.bio}
                    components={{
                      block: {
                        normal: ({ children }) => <p>{children}</p>,
                      },
                    }}
                  />
                </div>
              )}

              <Link
                href={authorHref}
                className="group mt-5 inline-flex min-h-11 items-center gap-2 rounded-btn text-caption font-medium text-text-primary transition-colors duration-(--duration-fast) ease-default hover:text-text-accent focus-visible:outline-none"
              >
                <span>Explore author profile</span>

                <ArrowRightIcon
                  aria-hidden="true"
                  className="size-4 transition-transform duration-(--duration-fast) ease-default group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default ArticleAuthor;
