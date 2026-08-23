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
  const authorName = post.author?.name ?? "Bappa Ayurveda Team";
  const authorRole = post.author?.role;

  return (
    <article className={cn("group flex h-full", className)}>
      <Link
        href={`/blog/${post.slug.current}`}
        aria-label={`Read ${post.title}`}
        className={cn(
          "flex h-full w-full flex-col overflow-hidden",
          "rounded-card border border-border-default",
          "bg-bg-page shadow-card",

          "transition-[transform,border-color,box-shadow] duration-(--duration-normal)",
          "motion-safe:hover:-translate-y-0.5",
          "motion-safe:hover:border-border-accent",
          "motion-safe:hover:shadow-hover",

          "focus-visible:outline-2",
          "focus-visible:outline-offset-4",
          "focus-visible:outline-border-accent",

          "active:scale-[0.99]",
        )}
      >
        {/* Image */}
        <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-bg-surface">
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
                "motion-safe:transition-transform motion-safe:duration-(--duration-slow)",
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
              "absolute top-2.5 right-2.5 sm:top-3 sm:right-3",
              "rounded-btn",
              "bg-bg-page/90",
              "px-2 py-1",
              "font-body text-[0.625rem] font-medium",
              "text-text-primary",
            )}
          >
            {readTime} min
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col px-5 pt-4 sm:px-5">
            {/* Category + date */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              {post.category?.name && (
                <span
                  className={cn(
                    "font-body text-[0.625rem] font-semibold",
                    "tracking-widest uppercase",
                    "text-text-accent",
                  )}
                >
                  {post.category.name}
                </span>
              )}

              {post.category?.name && (
                <span
                  className="size-0.5 shrink-0 rounded-full bg-border-default"
                  aria-hidden="true"
                />
              )}

              <time
                dateTime={post.publishedAt}
                className="font-body text-[0.625rem] text-text-muted"
              >
                {formattedDate}
              </time>
            </div>

            {/* Title */}
            <h3
              className={cn(
                "mt-3",
                "line-clamp-3 min-h-[4.95rem]",
                "font-display text-[1.375rem] leading-heading",
                "font-medium tracking-[-0.015em]",
                "text-text-primary",
              )}
            >
              {post.title}
            </h3>

            {/* Excerpt */}
            <div className="mt-2.5 min-h-[3.9rem]">
              {post.excerpt ? (
                <p
                  className={cn(
                    "line-clamp-3",
                    "font-body text-[0.8125rem] leading-[1.6]",
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
              "mt-4 flex items-center",
              "border-t border-border-subtle",
              "px-5 py-3.5",
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "relative size-8 shrink-0",
                "overflow-hidden rounded-full",
                "bg-bg-surface",
              )}
            >
              {authorImage ? (
                <Image
                  src={authorImage}
                  alt=""
                  fill
                  sizes="32px"
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
            <div className="ml-3 min-w-0">
              <p className="truncate font-body text-xs leading-tight font-semibold text-text-primary">
                {authorName}
              </p>

              {authorRole && (
                <p className="mt-0.5 truncate font-body text-[0.625rem] leading-tight text-text-muted">
                  {authorRole}
                </p>
              )}
            </div>

            {/* Arrow */}
            <span
              aria-hidden="true"
              className={cn(
                "ml-auto shrink-0 text-text-primary",
                "motion-safe:transition-transform motion-safe:duration-(--duration-fast)",
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
