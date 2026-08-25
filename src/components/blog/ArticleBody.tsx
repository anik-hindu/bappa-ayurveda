import { PortableText } from "@portabletext/react";

import { Section } from "@/components/ui";
import { PortableTextBlock } from "@portabletext/types";
import PortableTextImage from "./PortableTextImage";

interface ArticleBodyProps {
  body: PortableTextBlock[];
}

function ArticleBody({ body }: ArticleBodyProps) {
  if (!body?.length) return null;

  return (
    <Section
      tabIndex={-1}
      id="main-content"
      aria-labelledby="article-body-heading"
      padding="sm"
    >
      <h2 id="article-body-heading" className="sr-only">
        Article content
      </h2>
      <article className="mx-auto max-w-article">
        <PortableText
          value={body}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="leading-relaxed">{children}</p>
              ),

              h2: ({ children }) => (
                <h2 className="mt-12 mb-5 scroll-mt-24 text-section text-text-primary first:mt-0">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="mt-10 mb-4 scroll-mt-24 text-sub text-text-primary">
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

              em: ({ children }) => <em className="italic">{children}</em>,

              link: ({ value, children }) => {
                const href = value?.href;

                if (!href) {
                  return <>{children}</>;
                }

                const isExternal = /^https?:\/\//i.test(href);

                return (
                  <a
                    href={href}
                    {...(isExternal
                      ? {
                          target: value?.blank ? "_blank" : undefined,
                          rel: value?.blank ? "noopener noreferrer" : undefined,
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
    </Section>
  );
}

export default ArticleBody;
