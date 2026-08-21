import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import { estimateReadTime, formatDate } from "@/lib/blog";
import { cn } from "@/lib/cn";
import { urlFor } from "@/sanity/lib/image";
import type { Post } from "@/types";

interface BlogCardProps {
  post: Post;
  priority?: boolean;
  className?: string;
}

export default function BlogCard({
  post,
  priority = false,
  className,
}: BlogCardProps) {
  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(800).height(500).url()
    : null;

  const authorImage = post.author?.image?.asset?._ref
    ? urlFor(post.author.image).width(80).height(80).url()
    : null;

  const readTime = estimateReadTime(post.body);
  const formattedDate = formatDate(post.publishedAt);
  const authorName = post.author?.name ?? "Bappa Ayurveda";

  return (
    <article className={cn("group flex h-full", className)}>
      <Link
        href={`/blog/${post.slug.current}`}
        aria-label={`Read ${post.title}`}
        className={cn(
          // Layout
          "flex h-full w-full flex-col overflow-hidden",

          // Surface
          "rounded-card border border-border-default",
          "bg-bg-page shadow-card",

          // Interaction
          "duration-normal transition-[transform,border-color,box-shadow]",

          // Hover only where hover actually exists
          "motion-safe:hover:-translate-y-0.5",
          "motion-safe:hover:border-border-accent",
          "motion-safe:hover:shadow-hover",

          // Keyboard accessibility
          "focus-visible:outline-2",
          "focus-visible:outline-offset-4",
          "focus-visible:outline-border-accent",

          // Touch
          "active:scale-[0.99]",
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-bg-surface">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt || post.title}
              fill
              priority={priority}
              sizes="
                (max-width: 639px) 100vw,
                (max-width: 1023px) 50vw,
                33vw
              "
              className={cn(
                "object-cover",
                "motion-safe:duration-slow motion-safe:transition-transform",
                "motion-safe:group-hover:scale-[1.02]",
              )}
            />
          ) : (
            <div
              className="flex size-full items-center justify-center px-6"
              aria-hidden="true"
            >
              <span className="font-display text-sub text-text-muted italic">
                Bappa Ayurveda
              </span>
            </div>
          )}

          {/* Read time */}
          <span
            className={cn(
              "absolute top-3 right-3 sm:top-4 sm:right-4",
              "rounded-btn",
              "bg-bg-page/95",
              "px-2.5 py-1.5 sm:px-3",
              "font-body text-label font-semibold",
              "tracking-[0.08em] uppercase",
              "text-text-primary",
            )}
          >
            {readTime} min read
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col px-5 pt-5 sm:px-6">
            {/* Category + date */}
            <div className="flex min-h-4 flex-wrap items-center gap-x-2 gap-y-1">
              {post.category?.name && (
                <span
                  className={cn(
                    "font-body text-label font-semibold",
                    "tracking-[0.12em] uppercase",
                    "text-text-accent",
                  )}
                >
                  {post.category.name}
                </span>
              )}

              {post.category?.name && (
                <span
                  className="size-1 shrink-0 rounded-full bg-border-default"
                  aria-hidden="true"
                />
              )}

              <time
                dateTime={post.publishedAt}
                className="font-body text-label text-text-muted"
              >
                {formattedDate}
              </time>
            </div>

            {/* Title */}
            <h3
              className={cn(
                "mt-4 line-clamp-2",
                "min-h-[3.9rem] sm:min-h-[4.2rem]",
                "font-display text-sub leading-sub",
                "font-medium tracking-[-0.015em]",
                "text-text-primary",
              )}
            >
              {post.title}
            </h3>

            {/* Excerpt */}
            <div className="mt-3 min-h-[4.5rem] sm:mt-4">
              {post.excerpt ? (
                <p
                  className={cn(
                    "line-clamp-3",
                    "font-body text-[0.875rem] leading-relaxed",
                    "text-text-muted",
                  )}
                >
                  {post.excerpt}
                </p>
              ) : (
                <span className="sr-only">
                  Read this article to learn more.
                </span>
              )}
            </div>
          </div>

          {/* Author footer */}
          <div
            className={cn(
              "mt-5 flex items-center",
              "border-t border-border-subtle",
              "px-5 py-4 sm:px-6",
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "relative size-8 shrink-0 sm:size-9",
                "overflow-hidden rounded-full",
                "bg-bg-surface",
              )}
            >
              {authorImage ? (
                <Image
                  src={authorImage}
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                <span
                  className={cn(
                    "flex size-full items-center justify-center",
                    "font-display text-sm",
                    "text-text-accent",
                  )}
                  aria-hidden="true"
                >
                  {authorName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Author */}
            <p className="ml-3 min-w-0 truncate font-body text-xs font-semibold text-text-primary">
              {authorName}
            </p>

            {/* Arrow */}
            <span
              aria-hidden="true"
              className={cn(
                "ml-auto shrink-0 text-text-primary",
                "motion-safe:duration-fast motion-safe:transition-transform",
                "motion-safe:group-hover:translate-x-1",
              )}
            >
              <ArrowRightIcon className="size-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
