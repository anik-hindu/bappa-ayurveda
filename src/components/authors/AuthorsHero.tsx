import { Section } from "@/components/ui";

export default function AuthorsHero() {
  return (
    <Section
      aria-labelledby="authors-heading"
      className="border-b border-border-subtle"
    >
      <div className="mx-auto max-w-article py-16 text-center sm:py-20 lg:py-24">
        <p className="mb-4 font-body text-label font-semibold tracking-[0.16em] text-text-accent uppercase">
          Our Authors
        </p>

        <h1
          id="authors-heading"
          className="text-[2.75rem] leading-[1.08] sm:text-hero sm:leading-hero"
        >
          The People Behind the Knowledge.
        </h1>

        <p className="mx-auto mt-6 max-w-155 text-body-lg leading-relaxed text-text-body">
          Meet the people who contribute to Bappa Ayurveda’s educational
          content, bringing together classical Ayurvedic knowledge, relevant
          expertise, and a commitment to clear, responsible communication.
        </p>
      </div>
    </Section>
  );
}
