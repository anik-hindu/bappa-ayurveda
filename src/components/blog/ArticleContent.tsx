import type { ReactNode } from "react";
import PopularPosts from "./PopularPosts";

import { Section } from "@/components/ui";
import { cn } from "@/lib/cn";

interface ArticleContentProps {
  sidebar?: ReactNode;
  children: ReactNode;
  mobileBefore?: ReactNode;
  slug: string;
}

export default function ArticleContent({
  sidebar,
  slug,
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
            "lg:grid-cols-[minmax(0,760px)_240px]",
            "lg:gap-8",
          )}
        >
          <div className="min-w-0">{children}</div>
          <aside
            aria-label="Article navigation"
            className="sticky top-24 hidden lg:block"
          >
            <div className="max-h-[calc(100vh-6rem)] scrollbar-thin scrollbar-thumb-bg-surface scrollbar-track-bg-page overflow-y-auto pr-2 hover:scrollbar-thumb-bg-hover">
              {sidebar}
            </div>
            <div className="border-t border-border-subtle pt-5">
              <PopularPosts currentSlug={slug} />
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
