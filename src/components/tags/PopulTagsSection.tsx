import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import { Section, Badge } from "@/components/ui";
import { getPopularTags } from "@/sanity/lib/queries";

export default async function PopularTagsSection() {
  const tags = await getPopularTags(8);

  if (tags.length === 0) {
    return null;
  }

  return (
    <Section
      aria-labelledby="popular-tags-heading"
      padding="lg"
      background="surface"
    >
      <div>
        <header className="max-w-narrow">
          <p className="text-label font-medium uppercase tracking-[0.18em] text-text-accent">
            Explore More
          </p>

          <h2 id="popular-tags-heading" className="mt-3">
            Curious about something in particular?
          </h2>

          <p className="mt-4 max-w-narrow text-body-lg text-text-muted">
            From everyday wellness to Ayurvedic traditions, follow a topic and
            see where it takes you.
          </p>
        </header>

        <nav
          aria-label="Explore popular topics"
          className="mt-8 md:mt-10"
        >
          <ul className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <li key={tag._id}>
                <Link
                  href={`/tags/${tag.slug.current}`}
                  className="group inline-flex min-h-11 rounded-badge focus-visible:outline-none"
                >
                  <Badge
                    className="
                      transition-colors
                      duration-(--duration-fast)
                      group-hover:border-border-accent
                      group-hover:bg-bg-hover
                      group-hover:text-text-primary
                    "
                  >
                    {tag.name}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8 md:mt-10">
          <Link
            href="/tags"
            className="inline-flex min-h-11 items-center border-b border-border-accent pb-1 text-btn font-medium text-text-primary transition-colors duration-(--duration-fast) hover:text-text-accent"
          >
            Explore all topics
           <ArrowRightIcon
            aria-hidden="true"
            className="duration-(--duration-fast) ml-2 size-4 transition-transform ease-default group-hover:translate-x-1"
          />
          </Link>
        </div>
      </div>
    </Section>
  );
}