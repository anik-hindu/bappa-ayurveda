import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { PortableText } from "@portabletext/react";

import type { FAQItem } from "@/types";

interface ArticleFAQProps {
  heading?: string;
  items: FAQItem[];
}

export default function ArticleFAQ({
  heading = "Frequently asked questions",
  items,
}: ArticleFAQProps) {
  const safeItems = items ?? [];

  if (safeItems.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="article-faq-heading"
      className="my-12 border-y border-border-subtle py-8 sm:my-16 sm:py-10"
    >
      {/* Header */}
      <div>
        <p className="text-label font-medium tracking-[0.14em] text-text-accent uppercase">
          FAQ
        </p>

        <h2
          id="article-faq-heading"
          className="mt-1.5 text-sub text-text-primary"
        >
          {heading}
        </h2>
      </div>

      {/* FAQ list */}
      <div className="mt-5 divide-y divide-border-subtle">
        {items.map((item) => (
          <details key={item._key} className="group">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-left text-body font-medium text-text-primary transition-colors duration-(--duration-fast) hover:text-text-accent focus-visible:ring-2 focus-visible:ring-border-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page focus-visible:outline-none [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>

              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border-default text-text-muted transition-colors duration-(--duration-fast) group-open:border-border-accent group-open:text-text-accent group-hover:border-border-accent group-hover:text-text-accent"
              >
                <ChevronDownIcon className="size-4 transition-transform duration-(--duration-fast) group-open:rotate-180" />
              </span>
            </summary>

            <div className="max-w-2xl pr-10 pb-5 text-body text-text-muted">
              <PortableText
                value={item.answer}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="leading-relaxed">{children}</p>
                    ),
                  },
                }}
              />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
