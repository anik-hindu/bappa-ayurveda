import type { ReactNode } from "react";

import { Section } from "@/components/ui";

interface ArticleContentProps {
  sidebar?: ReactNode;
  children: ReactNode;
  mobileBefore?: ReactNode;
}

export default function ArticleContent({
  sidebar,
  children,
  mobileBefore,
}: ArticleContentProps) {
  return (
    <Section padding="sm">
      <div className="mx-auto max-w-6xl">
        {mobileBefore && <div className="mb-8 lg:hidden">{mobileBefore}</div>}

        <div className="grid items-start lg:grid-cols-[200px_minmax(0,760px)] lg:justify-center lg:gap-12 xl:grid-cols-[220px_minmax(0,760px)] xl:gap-16">
          {sidebar && (
            <aside
              aria-label="Article navigation"
              className="sticky top-24 hidden self-start lg:block"
            >
              {sidebar}
            </aside>
          )}

          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </Section>
  );
}
