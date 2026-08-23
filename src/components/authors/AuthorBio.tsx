import { PortableText } from "@portabletext/react";

import { Section } from "@/components/ui";
import type { AuthorDetail } from "@/types";

interface AuthorBioProps {
  author: AuthorDetail;
}

export default function AuthorBio({ author }: AuthorBioProps) {
  if (!author.bio?.length) {
    return null;
  }

  return (
    <Section
      aria-labelledby="author-biography-heading"
      className="border-t border-border-subtle"
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(180px,280px)_minmax(0,760px)] lg:gap-20">
        {/* Section heading */}
        <header>
          <p className="font-body text-label font-semibold tracking-[0.16em] text-text-accent uppercase">
            About the author
          </p>

          <h2
            id="author-biography-heading"
            className="mt-3 text-section leading-heading text-text-primary"
          >
            Background &amp; perspective
          </h2>
        </header>

        {/* Biography */}
        <div className="max-w-article text-body-lg leading-relaxed text-text-body">
          <PortableText
            value={author.bio}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="mb-5 last:mb-0">{children}</p>
                ),

                h3: ({ children }) => (
                  <h3 className="mt-8 mb-4 text-sub leading-sub text-text-primary first:mt-0">
                    {children}
                  </h3>
                ),

                h4: ({ children }) => (
                  <h4 className="mt-6 mb-3 text-body-lg leading-heading text-text-primary">
                    {children}
                  </h4>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="my-8 border-l-thick border-border-accent pl-5 font-display text-sub leading-sub text-text-primary italic">
                    {children}
                  </blockquote>
                ),
              },

              list: {
                bullet: ({ children }) => (
                  <ul className="mb-5 ml-5 list-disc space-y-2">{children}</ul>
                ),

                number: ({ children }) => (
                  <ol className="mb-5 ml-5 list-decimal space-y-2">
                    {children}
                  </ol>
                ),
              },

              marks: {
                strong: ({ children }) => <strong>{children}</strong>,

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
                      {...(isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="font-medium text-text-primary underline decoration-border-accent underline-offset-4 transition-colors duration-(--duration-fast) hover:text-text-accent"
                    >
                      {children}
                    </a>
                  );
                },
              },
            }}
          />
        </div>
      </div>
    </Section>
  );
}
