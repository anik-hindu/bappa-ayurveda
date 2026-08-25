import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { extractTableOfContents } from "@/lib/tableOfContents";

import ArticleFAQ from "./ArticleFAQ";
import PortableTextImage from "./PortableTextImage";

interface ArticleBodyProps {
  body: PortableTextBlock[];
}

export default function ArticleBody({ body }: ArticleBodyProps) {
  if (!body?.length) {
    return null;
  }

  const toc = extractTableOfContents(body);

  const headingIds = new Map(toc.map((item) => [item.key, item.id]));

  return (
    <article tabIndex={-1} id="main-content" className="max-w-article min-w-0">
      <PortableText
        value={body}
        components={{
          block: {
            normal: ({ children }) => (
              <p className="leading-relaxed">{children}</p>
            ),

            h2: ({ value, children }) => (
              <h2
                id={value._key ? headingIds.get(value._key) : undefined}
                className="mt-12 mb-5 scroll-mt-24 text-section text-text-primary first:mt-0"
              >
                {children}
              </h2>
            ),

            h3: ({ value, children }) => (
              <h3
                id={value._key ? headingIds.get(value._key) : undefined}
                className="mt-10 mb-4 scroll-mt-24 text-sub text-text-primary"
              >
                {children}
              </h3>
            ),

            blockquote: ({ children }) => (
              <blockquote className="my-10 border-l-thick border-border-accent pl-6 font-display text-sub leading-sub text-text-primary italic sm:pl-8">
                {children}
              </blockquote>
            ),
          },

          marks: {
            strong: ({ children }) => (
              <strong className="font-semibold text-text-primary">
                {children}
              </strong>
            ),

            em: ({ children }) => <em>{children}</em>,

            link: ({ value, children }) => {
              const href = value?.href;

              if (!href) {
                return <>{children}</>;
              }

              const isExternal = /^https?:\/\//i.test(href);

              return (
                <a
                  href={href}
                  {...(isExternal && value?.blank
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
                  className="font-medium text-text-primary underline decoration-border-accent underline-offset-3 transition-colors duration-(--duration-fast) hover:text-text-accent focus-visible:outline-none"
                >
                  {children}
                </a>
              );
            },
          },

          types: {
            image: PortableTextImage,
            faqSection: ({ value }) => (
              <ArticleFAQ heading={value.heading} items={value.items} />
            ),
          },

          list: {
            bullet: ({ children }) => (
              <ul className="mb-6 ml-6 list-disc space-y-2 text-body leading-relaxed text-text-body marker:text-text-accent">
                {children}
              </ul>
            ),

            number: ({ children }) => (
              <ol className="mb-6 ml-6 list-decimal space-y-2 text-body leading-relaxed text-text-body marker:text-text-accent">
                {children}
              </ol>
            ),
          },

          listItem: {
            bullet: ({ children }) => <li className="pl-2">{children}</li>,

            number: ({ children }) => <li className="pl-2">{children}</li>,
          },
        }}
      />
    </article>
  );
}
