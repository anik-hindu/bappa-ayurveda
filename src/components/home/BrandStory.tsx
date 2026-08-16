import { Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import Link from "next/link";

const principles = [
  {
    title: "Classical texts",
    description:
      "Every formulation begins with classical Ayurvedic references.",
  },
  {
    title: "Traditional methods",
    description:
      "Traditional processes such as Bhavana Sanskara are respected.",
  },
  {
    title: "Modern standards",
    description: "GMP-grade manufacturing supports consistency and quality.",
  },
];

export default function BrandStory() {
  return (
    <Section
      id="about"
      background="surface"
      padding="lg"
      aria-labelledby="brand-story-heading"
    >
      {/* Introduction */}
      <div className="max-w-3xl">
        <p
          className={cn(
            "font-body text-label font-semibold",
            "tracking-wider uppercase",
            "text-text-primary",
          )}
        >
          Our Story
        </p>

        <h2
          id="brand-story-heading"
          className={cn("mt-3 max-w-2xl", "text-text-primary")}
        >
          Ayurveda rooted in its classical foundations.
        </h2>

        <p
          className={cn(
            "mt-5 max-w-2xl",
            "font-body text-body-lg leading-relaxed",
            "text-text-body",
          )}
        >
          Bappa Ayurveda was founded in February 2026 by Shivansh Mishra — a
          BAMS student who saw a need for greater classical rigour in
          India&apos;s Ayurvedic supplement market.
        </p>
      </div>

      {/* Principles */}
      <ul
        role="list"
        aria-label="Bappa Ayurveda approach"
        className={cn(
          "mt-10 grid overflow-hidden",
          "grid-cols-1 sm:grid-cols-3",
          "rounded-card",
          "border border-border-default",
          "bg-bg-page",
        )}
      >
        {principles.map((principle, index) => (
          <li
            key={principle.title}
            className={cn(
              "p-6 lg:p-8",
              index > 0 &&
                "border-t border-border-default sm:border-t-0 sm:border-l",
            )}
          >
            <h3 className="text-sub text-text-primary">{principle.title}</h3>

            <p className="mt-2 text-body text-text-muted">
              {principle.description}
            </p>
          </li>
        ))}
      </ul>

      {/* Closing statement + CTA */}
      <div
        className={cn(
          "mt-10 flex flex-col gap-6",
          "border-t border-border-default",
          "pt-8",
          "sm:flex-row sm:items-end sm:justify-between",
        )}
      >
        <div className="max-w-2xl">
          <p className="font-display text-sub text-text-primary">
            Classical Roots. Clinical Credibility.
          </p>

          <p className="mt-2 text-body text-text-muted">
            The goal is not to &quot;modernise&quot; Ayurveda — it is to honour
            it completely.
          </p>
        </div>

        <Link
          href="/about"
          className={cn(
            "group inline-flex shrink-0 items-center gap-2",
            "font-body text-label font-semibold",
            "text-text-primary",
            "transition-colors duration-(--duration-fast)",
            "hover:text-text-accent",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-border-accent",
            "focus-visible:ring-offset-2",
          )}
        >
          Discover our story
          <span
            aria-hidden="true"
            className="transition-transform duration-(--duration-fast) group-hover:translate-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </span>
        </Link>
      </div>
    </Section>
  );
}
