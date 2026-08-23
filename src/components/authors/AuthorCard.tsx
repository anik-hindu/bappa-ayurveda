import { urlFor } from "@/sanity/lib/image";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import type { AuthorListItem } from "@/types";

interface AuthorCardProps {
  author: AuthorListItem;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const { name, slug, image, role, shortBio, expertise, articleCount } = author;

  const profileHref = `/authors/${slug.current}`;
  const expertiseItems = expertise ?? [];

  const imageUrl = image?.asset?._ref
    ? urlFor(image).width(900).height(1125).fit("crop").crop("focalpoint").url()
    : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-border-default bg-bg-page">
      {/* Portrait */}
      <Link
        href={profileHref}
        aria-label={`View ${name}`}
        className="relative aspect-4/5 shrink-0 overflow-hidden bg-bg-surface"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`${name}${role ? `, ${role}` : ""}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-(--duration-normal) ease-default group-hover:scale-[1.02]"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full items-center justify-center bg-bg-surface"
          >
            <span className="font-display text-[5rem] font-medium text-text-accent/40">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex min-h-62.5 flex-1 flex-col p-5 sm:p-6">
        <div>
          {role && (
            <p className="mb-2 truncate font-body text-label font-semibold tracking-[0.12em] text-text-accent uppercase">
              {role}
            </p>
          )}

          <h2 className="line-clamp-2 font-display text-sub leading-sub text-text-primary">
            <Link
              href={profileHref}
              className="rounded-sm transition-colors duration-(--duration-fast) ease-default hover:text-text-accent focus-visible:outline-none"
            >
              {name}
            </Link>
          </h2>

          {shortBio && (
            <p className="mt-3 line-clamp-2 text-body leading-body text-text-body">
              {shortBio}
            </p>
          )}

          {expertiseItems.length > 0 && (
            <ul
              aria-label={`${name}'s areas of expertise`}
              className="mt-4 flex max-h-13 flex-wrap gap-2 overflow-hidden"
            >
              {expertiseItems.slice(0, 3).map((item) => (
                <li
                  key={item}
                  className="rounded-badge border border-border-subtle px-2.5 py-1 font-body text-caption text-text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-border-subtle pt-4">
          <span className="text-caption font-medium text-text-muted">
            {articleCount} {articleCount === 1 ? "Article" : "Articles"}
          </span>

          <Link
            href={profileHref}
            className="inline-flex min-h-11 items-center gap-2 rounded-btn font-body text-btn font-semibold text-text-primary transition-colors duration-(--duration-fast) ease-default hover:text-text-accent focus-visible:outline-none"
          >
            <span>View Profile</span>

            <ArrowRightIcon
              aria-hidden="true"
              className="size-4 transition-transform duration-(--duration-fast) ease-default group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
