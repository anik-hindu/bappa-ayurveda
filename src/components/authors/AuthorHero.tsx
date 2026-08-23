import { urlFor } from "@/sanity/lib/image";
import type { AuthorDetail } from "@/types";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import { Breadcrumbs, Section } from "@/components/ui/";

interface AuthorHeroProps {
  author: AuthorDetail;
}

export default function AuthorHero({ author }: AuthorHeroProps) {
  const imageUrl = author.image?.asset?._ref
    ? urlFor(author.image)
        .width(900)
        .height(1200)
        .fit("crop")
        .auto("format")
        .url()
    : null;

  return (
    <Section aria-labelledby="author-name">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          {
            label: "Authors",
            href: "/authors",
          },
          {
            label: author.name,
            current: true,
          },
        ]}
        className="mb-10 lg:mb-14"
      />

      {/* Hero */}
      <div className="grid items-center gap-10 md:grid-cols-[minmax(260px,360px)_1fr] md:gap-14 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-20">
        {/* Portrait */}
        <div className="mx-auto w-full max-w-90">
          <div className="relative aspect-3/4 overflow-hidden rounded-card bg-bg-surface">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={author.image?.alt || `Portrait of ${author.name}`}
                fill
                priority
                sizes="
                    (min-width: 1024px) 360px,
                    (min-width: 768px) 40vw,
                    100vw
                  "
                className="object-cover"
                style={{
                  objectPosition: author.image?.hotspot
                    ? `${author.image.hotspot.x * 100}% ${author.image.hotspot.y * 100}%`
                    : "50% 35%",
                }}
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-full items-center justify-center"
              >
                <span className="font-display text-[5rem] leading-none text-text-muted">
                  {author.name.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Author information */}
        <div className="max-w-170">
          {/* Eyebrow */}
          <p className="mb-4 font-body text-label font-semibold tracking-[0.16em] text-text-accent uppercase">
            Author
          </p>

          {/* Name */}
          <h1
            id="author-name"
            className="max-w-[12ch] text-hero leading-hero text-text-primary max-md:text-[3rem]"
          >
            {author.name}
          </h1>

          {/* Role */}
          {author.role && (
            <p className="mt-4 font-body text-body-lg font-medium text-text-body">
              {author.role}
            </p>
          )}

          {/* Short bio */}
          {author.shortBio && (
            <p className="mt-6 max-w-[58ch] text-body-lg leading-relaxed text-text-body">
              {author.shortBio}
            </p>
          )}

          {/* Expertise */}
          {author.expertise && author.expertise.length > 0 && (
            <div className="mt-7">
              <p className="mb-3 font-body text-label font-semibold tracking-[0.12em] text-text-muted uppercase">
                Areas of expertise
              </p>

              <ul
                aria-label={`${author.name}'s areas of expertise`}
                className="flex flex-wrap gap-2"
              >
                {author.expertise.map((item) => (
                  <li
                    key={item}
                    className="rounded-badge border border-border-default px-3 py-1.5 font-body text-caption text-text-body"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* LinkedIn */}
          {author.linkedIn && (
            <div className="mt-8">
              <Link
                href={author.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-btn border border-border-default px-4 py-2.5 font-body text-btn font-semibold text-text-primary transition-colors duration-(--duration-fast) ease-default hover:border-border-accent hover:text-text-accent"
              >
                <span>Professional profile</span>

                <ArrowUpRightIcon aria-hidden="true" className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
