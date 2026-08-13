import { Section } from "@/components/ui";
import { credibilityItems } from "@/data/credibility";
import { cn } from "@/lib/cn";
import Image, { StaticImageData } from "next/image";

interface CredibilityItemProps {
  label: string;
  description: string;
  img: StaticImageData;
}

function CredibilityItem({ label, description, img }: CredibilityItemProps) {
  return (
    <li
      className={cn(
        "flex min-w-0 items-center gap-3",
        "px-4 py-4",
        "md:px-6 md:py-2",
        "lg:px-8",
        "border-b border-border-subtle sm:border-b-0",
      )}
    >
      <div
        className={cn(
          "flex size-9 shrink-0 items-center justify-center",
          "md:size-10",
        )}
        aria-hidden="true"
      >
        <Image src={img} alt="" className="size-full object-contain" />
      </div>

      <div className="min-w-0">
        <p
          className={cn(
            "font-body text-label font-semibold",
            "text-text-primary",
          )}
        >
          {label}
        </p>

        <p
          className={cn(
            "font-body text-caption leading-tight",
            "text-text-muted",
          )}
        >
          {description}
        </p>
      </div>
    </li>
  );
}

export default function CredibilityBar() {
  return (
    <Section
      padding="sm"
      background="surface"
      className="border-y border-border-default"
    >
      <p className="mb-5 text-center font-display text-sub text-text-primary">
        Trusted by Authorities. Chosen by Thousands.
      </p>

      <ul
        role="list"
        aria-label="Bappa Ayurveda credibility and availability"
        className={cn(
          "mt-5 grid grid-cols-2",
          "gap-4 sm:flex sm:flex-wrap",
          "sm:items-center sm:justify-center",
          "sm:divide-x sm:divide-border-default",
        )}
      >
        {credibilityItems.map((item) => (
          <CredibilityItem
            key={item.label}
            label={item.label}
            description={item.description}
            img={item.img}
          />
        ))}
      </ul>
    </Section>
  );
}
