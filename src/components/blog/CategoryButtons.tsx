"use client";

import { Button, Section } from "@/components/ui";
import { Category } from "@/types/index";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type CategoryButtonsProps = {
  categories: Category[];
};

function CategoryButtons({ categories }: CategoryButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const active = searchParams.get("category") ?? "all";

  const handleClick = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const allCategories = [
    {
      _id: "all",
      name: "All",
      slug: { _type: "slug", current: "all" },
    },
    ...categories,
  ];

  return (
    <Section padding="sm">
      <div className="flex w-full flex-wrap gap-2">
        {allCategories.map((category) => (
          <Button
            key={category._id}
            onClick={() => handleClick(category.slug.current)}
            size="sm"
            variant="secondary"
            className={active === category.slug.current ? "bg-btn-secondary-bg-hover text-btn-secondary-text-hover" : ""}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </Section>
  );
}

export default CategoryButtons;
