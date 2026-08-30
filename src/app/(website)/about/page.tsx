import { Button, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "About Bappa Ayurveda | Our Story & Approach" },
  description:
    "Learn about Bappa Ayurveda, our approach to classical Ayurveda, and how we connect traditional knowledge with modern standards and responsible education.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Bappa Ayurveda | Our Story & Approach",
    description:
      "Discover Bappa Ayurveda's approach to preserving classical Ayurvedic knowledge while bringing it into modern life with care and credibility.",
    url: "/about",
    siteName: "Bappa Ayurveda",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/og/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Bappa Ayurveda — Classical Roots. Clinical Credibility.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Bappa Ayurveda | Our Story & Approach",
    description:
      "Learn about Bappa Ayurveda's approach to classical Ayurveda, modern standards, and responsible education.",
    images: ["/og/opengraph-image.jpg"],
  },
};

const principles = [
  {
    number: "01",
    title: "Classical Texts",
    description:
      "Every product begins with a classical Ayurvedic text, grounding its formulation in established Ayurvedic knowledge rather than modern interpretation alone.",
  },
  {
    number: "02",
    title: "Traditional Processing",
    description:
      "Traditional methods such as Bhavana Sanskara are respected where prescribed, preserving the processes that are part of the classical formulation.",
  },
  {
    number: "03",
    title: "Modern Standards",
    description:
      "Products are held to GMP-grade manufacturing standards with an emphasis on consistency, quality, and disciplined production.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section
        background="surface"
        padding="lg"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p
            className={cn(
              "text-label font-semibold",
              "tracking-wider uppercase",
              "text-text-primary",
            )}
          >
            About Bappa Ayurveda
          </p>

          <h1 id="about-heading" className="mt-4">
            Classical Roots.
            <br />
            Clinical Credibility.
          </h1>

          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl",
              "text-body-lg leading-relaxed",
            )}
          >
            A clinically serious Ayurvedic company built to respect both ancient
            scholarship and modern standards of evidence.
          </p>
        </div>
      </Section>

      {/* Founding Story */}
      <Section
        background="page"
        padding="lg"
        aria-labelledby="founding-story-heading"
      >
        <div className="mx-auto max-w-4xl">
          <div className="max-w-2xl">
            <p className="text-label font-semibold tracking-wider text-text-primary uppercase">
              The Founding Story
            </p>

            <h2 id="founding-story-heading" className="mt-3">
              Why Bappa Ayurveda exists.
            </h2>
          </div>

          <div
            className={cn(
              "mt-10 max-w-3xl",
              "space-y-6",
              "text-body-lg leading-relaxed",
            )}
          >
            <p>
              Bappa Ayurveda was founded in February 2026 by Shivansh Mishra, a
              BAMS student.
            </p>

            <p>
              The brand was born out of a deep frustration: India&apos;s
              Ayurvedic supplement market is flooded with products that carry
              classical names but lack classical rigour. Formulations are
              diluted, processing protocols ignored, and ingredients blended
              without textual basis.
            </p>

            <p>Bappa Ayurveda exists to fix that.</p>

            <p>
              Every product begins with a classical text, is processed with
              traditional methods such as Bhavana Sanskara, and is held to
              GMP-grade manufacturing standards.
            </p>
          </div>
        </div>
      </Section>

      {/* Philosophy */}
      <Section
        background="surface"
        padding="lg"
        aria-labelledby="philosophy-heading"
      >
        <div className="mx-auto max-w-4xl">
          <div className="max-w-2xl">
            <p className="font-body text-label font-semibold tracking-wider text-text-primary uppercase">
              Our Philosophy
            </p>

            <h2 id="philosophy-heading" className="mt-3 text-text-primary">
              Honour the tradition. Raise the standard.
            </h2>
          </div>

          <blockquote
            className={cn(
              "mt-10",
              "border-l-2 border-border-accent",
              "pl-6 sm:pl-8",
            )}
          >
            <p
              className={cn(
                "font-display text-sub sm:text-sub",
                "leading-relaxed text-text-primary",
              )}
            >
              The goal is not to &quot;modernise&quot; Ayurveda — it is to
              honour it completely.
            </p>
          </blockquote>
        </div>
      </Section>

      {/* Approach */}
      <Section
        background="page"
        padding="lg"
        aria-labelledby="approach-heading"
      >
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="font-body text-label font-semibold tracking-wider text-text-primary uppercase">
              Our Approach
            </p>

            <h2 id="approach-heading" className="mt-3 text-text-primary">
              From classical knowledge to disciplined production.
            </h2>

            <p className="mt-5 text-body-lg leading-relaxed text-text-body">
              Our approach respects the foundations of Ayurveda while
              maintaining the standards expected from a modern Ayurvedic
              company.
            </p>
          </div>

          <ol
            className={cn(
              "mt-12 grid overflow-hidden",
              "grid-cols-1 md:grid-cols-3",
              "rounded-card",
              "border border-border-default",
            )}
          >
            {principles.map((principle, index) => (
              <li
                key={principle.number}
                className={cn(
                  "bg-bg-surface p-6 sm:p-8",
                  index > 0 &&
                    "border-t border-border-default md:border-t-0 md:border-l",
                )}
              >
                <span
                  className="font-body text-label font-semibold text-text-muted"
                  aria-hidden="true"
                >
                  {principle.number}
                </span>

                <h3 className="mt-5 text-sub text-text-primary">
                  {principle.title}
                </h3>

                <p className="mt-3 leading-relaxed text-text-body">
                  {principle.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Positioning */}
      <Section
        background="surface"
        padding="lg"
        aria-labelledby="positioning-heading"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-body text-label font-semibold tracking-wider text-text-primary uppercase">
            What We Stand For
          </p>

          <h2 id="positioning-heading" className="mt-4 text-text-primary">
            Classical Roots. Clinical Credibility.
          </h2>

          <p
            className={cn(
              "mx-auto mt-6 max-w-2xl",
              "text-body-lg leading-relaxed",
              "text-text-body",
            )}
          >
            Bappa Ayurveda is not a wellness brand. It is a clinically serious
            Ayurvedic company — one that respects both ancient scholarship and
            modern standards of evidence.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section
        background="page"
        padding="md"
        aria-labelledby="about-cta-heading"
      >
        <div
          className={cn(
            "flex flex-col gap-6",
            "items-start justify-between",
            "rounded-card border border-border-default",
            "bg-bg-surface p-6 sm:p-8",
            "md:flex-row md:items-center",
          )}
        >
          <div>
            <h2 id="about-cta-heading" className="text-sub">
              Explore SHUKRAVITA
            </h2>

            <p className="mt-2 text-text-muted">
              Discover Bappa Ayurveda&apos;s first product.
            </p>
          </div>

          <Button href="https://amzn.in/d/0irbMWo1" external>
            Explore SHUKRAVITA
          </Button>
        </div>
      </Section>
    </>
  );
}
