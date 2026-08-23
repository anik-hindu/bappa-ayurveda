import type { AuthorListItem } from "@/types";

import { Section } from "@/components/ui";

import AuthorCard from "./AuthorCard";

interface AuthorsGridProps {
  authors: AuthorListItem[];
}

export default function AuthorsGrid({ authors }: AuthorsGridProps) {
  return (
    <Section
      id="main-content"
      tabIndex={-1}
      aria-labelledby="authors-directory-heading"
      padding="lg"
    >
      {authors.length === 0 ? (
        <div>
          <div className="mb-8">
            <h2 id="authors-directory-heading">Our Contributors</h2>
          </div>
          <div
            role="status"
            className="border border-border-subtle bg-bg-surface px-6 py-12 text-center sm:px-8"
          >
            <h2 className="text-sub leading-sub text-text-primary">
              Our authors are coming soon.
            </h2>

            <p className="mx-auto mt-3 max-w-narrow text-body text-text-muted">
              We’re currently preparing the people and expertise behind Bappa
              Ayurveda’s educational content.
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-8">
            <h2 id="authors-directory-heading">Our Contributors</h2>
          </div>

          <ul
            aria-label="Bappa Ayurveda authors"
            className="grid list-none grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {authors.map((author) => (
              <li key={author._id} className="min-w-0">
                <AuthorCard author={author} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}
