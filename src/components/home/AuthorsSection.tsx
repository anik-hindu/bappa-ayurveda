import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import AuthorCard from "@/components/authors/AuthorCard";
import { Section } from "@/components/ui";
import { getFeaturedAuthors } from "@/sanity/lib/queries";

export default async function AuthorsSection() {
  const authors = await getFeaturedAuthors();

  if (authors.length === 0) {
    return null;
  }

  return (
    <Section aria-labelledby="team-heading" padding="lg">
      <header className="max-w-narrow">
        <p className="text-label font-medium tracking-[0.18em] text-text-accent uppercase">
          Our Team
        </p>

        <h2 id="team-heading" className="mt-3">
          The people behind Bappa.
        </h2>

        <p className="mt-4 max-w-narrow text-body-lg text-text-muted">
          Meet the people behind our work and expertise.
        </p>
      </header>

      <ul
        aria-label="Bappa Ayurveda team members"
        className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-10"
      >
        {authors.map((author) => (
          <li key={author._id}>
            <AuthorCard author={author} />
          </li>
        ))}
      </ul>

      <div className="mt-10 lg:mt-12">
        <Link
          href="/authors"
          className="group inline-flex min-h-11 items-center gap-2 border-b border-border-accent pb-1 text-btn font-medium text-text-primary"
        >
          <span>Meet the full team</span>

          <ArrowRightIcon
            aria-hidden="true"
            className="duration-(--duration-fast) size-4 transition-transform ease-default group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Section>
  );
}
