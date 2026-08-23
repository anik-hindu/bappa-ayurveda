import Section from "@/components/ui/Section";

export default function AuthorsHero() {
  return (
    <Section
      aria-labelledby="authors-heading"
      padding="lg"
      className="border-b border-border-subtle"
    >
      <div className="mx-auto max-w-article text-center">
        <p className="mb-4 font-body text-label font-semibold tracking-[0.16em] text-text-accent uppercase">
          Our Authors
        </p>

        <h1
          id="authors-heading"
          className="text-[2.75rem] leading-[1.08] text-text-primary sm:text-hero sm:leading-hero"
        >
          The People Behind the Knowledge.
        </h1>

        <p className="mx-auto mt-6 max-w-155 text-body-lg leading-relaxed text-text-body">
          Meet the people behind Bappa Ayurveda’s educational content, bringing
          classical Ayurvedic knowledge and relevant expertise to every article.
        </p>
      </div>
    </Section>
  );
}
