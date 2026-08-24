import { Breadcrumbs, Section } from "@/components/ui";

export default function TagsHero() {
  return (
    <Section padding="lg" aria-labelledby="tags-page-title">
      <Breadcrumbs
        items={[
          {
            label: "Tags",
            current: true,
          },
        ]}
        className="mb-10 lg:mb-14"
      />

      <div className="max-w-3xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-8 shrink-0 bg-border-accent sm:w-10"
          />

          <p className="text-label font-medium tracking-[0.16em] text-text-accent uppercase">
            Explore topics
          </p>
        </div>

        <h1
          id="tags-page-title"
          className="mt-4 text-[2.75rem] leading-hero md:text-hero"
        >
          Topics
        </h1>

        <p className="mt-5 max-w-2xl text-body-lg text-text-muted">
          Explore the subjects, practices, and health concepts covered
          throughout the Bappa Ayurveda journal.
        </p>
      </div>
    </Section>
  );
}
