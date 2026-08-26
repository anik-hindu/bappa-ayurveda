"use client";

import { Button, Section } from "@/components/ui";
import type { Category } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CategoryFilterProps = {
  categories: Category[];
};

function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") ?? "all";

  const handleClick = (slug: string): void => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    params.delete("page");

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const allCategories = [
    {
      _id: "all",
      name: "All",
      slug: {
        _type: "slug" as const,
        current: "all",
      },
    },
    ...categories,
  ];

  return (
    <Section padding="sm">
      <nav
        aria-label="Blog categories"
        className="border-y border-border-subtle"
      >
        <div className="-mx-4 scrollbar-none overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max items-center gap-1 py-2 sm:flex-wrap">
            {allCategories.map((category) => {
              const slug = category.slug.current;
              const isActive = activeCategory === slug;

              return (
                <Button
                  key={category._id}
                  type="button"
                  variant="filter"
                  size="sm"
                  aria-pressed={isActive}
                  onClick={() => handleClick(slug)}
                >
                  {category.name}
                </Button>
              );
            })}
          </div>
        </div>
      </nav>
    </Section>
  );
}

export default CategoryFilter;
