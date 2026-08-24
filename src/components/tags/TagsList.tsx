import { TagIcon } from "@heroicons/react/24/outline";

import { Section } from "@/components/ui";
import type { Tag } from "@/types";

import TagItem from "./TagItem";

interface TagsListProps {
  tags: Tag[];
}

export default function TagsList({ tags }: TagsListProps) {
  const tagCount = tags.length;
  const tagLabel = tagCount === 1 ? "topic" : "topics";

  return (
    <Section
      id="main-content"
      tabIndex={-1}
      padding="md"
      aria-labelledby="tags-list-heading"
      className="border-t border-border-subtle"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-text-accent">
            <TagIcon aria-hidden="true" className="size-4" />

            <p className="text-label font-medium tracking-[0.14em] uppercase">
              Topics
            </p>
          </div>

          <h2 id="tags-list-heading" className="mt-2 text-section">
            Browse by topic
          </h2>
        </div>

        {tagCount > 0 && (
          <p
            aria-label={`${tagCount} ${tagLabel} available`}
            className="text-caption text-text-muted"
          >
            {tagCount} {tagLabel}
          </p>
        )}
      </div>

      {tags.length > 0 ? (
        <ul
          className="mt-8 grid grid-cols-1 gap-x-8 md:grid-cols-2 lg:mt-10"
          aria-label="Available topics"
        >
          {tags.map((tag) => (
            <li key={tag._id}>
              <TagItem tag={tag} />
            </li>
          ))}
        </ul>
      ) : (
        <div
          role="status"
          className="mt-8 border-y border-border-subtle py-12 text-center"
        >
          <p className="text-sub text-text-primary">No topics available yet.</p>

          <p className="mx-auto mt-2 max-w-md text-body text-text-muted">
            Topics will appear here as articles are published.
          </p>
        </div>
      )}
    </Section>
  );
}
