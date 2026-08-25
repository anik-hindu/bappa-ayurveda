import {
  CalendarDaysIcon,
  ClockIcon,
  PhotoIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumbs, Section } from "@/components/ui";
import { estimateReadTime, formatDate } from "@/lib/blog";
import { urlFor } from "@/sanity/lib/image";
import type { PostDetail } from "@/types";

interface ArticleHeaderProps {
  post: PostDetail;
}

export default function ArticleHeader({ post }: ArticleHeaderProps) {
  const readingTime = estimateReadTime(post.body);

  const imageUrl = post.mainImage?.asset?._ref
    ? urlFor(post.mainImage).width(1600).height(900).url()
    : null;

  const hasUpdatedDate =
    Boolean(post.updatedAt) && post.updatedAt !== post.publishedAt;

  return (
    <Section padding="sm">
      {/* Breadcrumb navigation */}
      <Breadcrumbs
        items={[
          {
            label: "Blog",
            href: "/blog",
          },
          {
            label: post.title,
            current: true,
          },
        ]}
        className="mb-10 lg:mb-14"
      />

      {/* Article introduction */}
      <header className="mx-auto max-w-4xl">
        {/* Category */}
        <Link
          href={`/categories/${post.category.slug.current}`}
          className="inline-flex min-h-11 items-center rounded-btn text-label font-medium tracking-[0.16em] text-text-accent uppercase transition-colors duration-(--duration-fast) ease-default hover:text-text-primary focus-visible:outline-none"
        >
          {post.category.name}
        </Link>

        {/* Title */}
        <h1
          id="article-title"
          className="mt-3 max-w-4xl text-[2.75rem] leading-[1.08] sm:text-[3.5rem] lg:text-hero"
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mt-6 max-w-3xl text-body-lg leading-relaxed text-text-muted sm:text-[1.125rem]">
            {post.excerpt}
          </p>
        )}

        {/* Metadata */}
        <div
          aria-label="Article information"
          className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1 border-y border-border-subtle py-3"
        >
          <AuthorLink post={post} />

          <MetadataSeparator />

          <MetadataItem
            icon={<CalendarDaysIcon aria-hidden="true" className="size-4" />}
          >
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </MetadataItem>

          {hasUpdatedDate && (
            <>
              <MetadataSeparator />

              <MetadataItem
                icon={
                  <CalendarDaysIcon aria-hidden="true" className="size-4" />
                }
              >
                <span className="sr-only">Updated </span>
                <time dateTime={post.updatedAt}>
                  Updated {formatDate(post.updatedAt!)}
                </time>
              </MetadataItem>
            </>
          )}

          <MetadataSeparator />

          <MetadataItem
            icon={<ClockIcon aria-hidden="true" className="size-4" />}
          >
            {readingTime} min read
          </MetadataItem>
        </div>
      </header>

      {/* Featured media */}
      <FeaturedMedia
        imageUrl={imageUrl}
        alt={post.mainImage?.alt || post.title}
        caption={post.mainImage?.caption}
      />
    </Section>
  );
}

function AuthorLink({ post }: ArticleHeaderProps) {
  return (
    <Link
      href={`/authors/${post.author.slug.current}`}
      className="group inline-flex min-h-11 items-center gap-2 rounded-btn text-caption text-text-muted transition-colors duration-(--duration-fast) ease-default hover:text-text-primary focus-visible:outline-none"
    >
      {post.author.image?.asset?._ref ? (
        <span className="relative size-7 shrink-0 overflow-hidden rounded-full bg-bg-surface">
          <Image
            src={urlFor(post.author.image).width(56).height(56).url()}
            alt=""
            fill
            sizes="28px"
            className="object-cover"
          />
        </span>
      ) : (
        <UserCircleIcon
          aria-hidden="true"
          className="size-5 shrink-0 text-text-accent"
        />
      )}

      <span>
        By{" "}
        <span className="font-medium text-text-primary transition-colors duration-(--duration-fast) group-hover:text-text-accent">
          {post.author.name}
        </span>
      </span>
    </Link>
  );
}

interface MetadataItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

function MetadataItem({ icon, children }: MetadataItemProps) {
  return (
    <div className="inline-flex min-h-11 items-center gap-2 text-caption text-text-muted">
      <span className="shrink-0 text-text-accent">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function MetadataSeparator() {
  return (
    <span
      aria-hidden="true"
      className="hidden h-4 w-px bg-border-default sm:block"
    />
  );
}

interface FeaturedMediaProps {
  imageUrl: string | null;
  alt: string;
  caption?: string | undefined;
}

function FeaturedMedia({ imageUrl, alt, caption }: FeaturedMediaProps) {
  return (
    <figure className="mx-auto mt-10 max-w-5xl lg:mt-14">
      <div className="relative aspect-video overflow-hidden rounded-card bg-bg-surface">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            fill
            priority
            sizes="
              (max-width: 767px) calc(100vw - 48px),
              (max-width: 1023px) calc(100vw - 96px),
              min(1200px, calc(100vw - 160px))
            "
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {imageUrl && caption && (
        <figcaption className="mt-3 text-center text-caption text-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function ImagePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full w-full items-center justify-center border border-border-subtle"
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex size-12 items-center justify-center rounded-full border border-border-default text-text-accent">
          <PhotoIcon className="size-5" />
        </div>

        <span className="mt-4 font-display text-sub text-text-primary">
          Bappa Ayurveda Journal
        </span>
      </div>
    </div>
  );
}
