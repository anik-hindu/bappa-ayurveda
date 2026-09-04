import type { ReactNode } from "react";

import { Section } from "@/components/ui";
import { cn } from "@/lib/cn";

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

        <div
          className={cn(
            "grid items-start lg:justify-center",
            sidebar
              ? [
                  "lg:grid-cols-[240px_minmax(0,760px)]",
                  "lg:gap-8",
                  "xl:grid-cols-[240px_minmax(0,760px)]",
                  "xl:gap-8",
                ]
              : "lg:grid-cols-[minmax(0,760px)]",
          )}
        >
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
