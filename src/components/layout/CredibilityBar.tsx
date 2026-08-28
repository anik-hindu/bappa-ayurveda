import { Section } from "@/components/ui";
import { credibilityItems } from "@/data/credibility";
import { cn } from "@/lib/cn";
import type { StaticImageData } from "next/image";
import Image from "next/image";

interface CredibilityItemProps {
  label: string;
  description: string;
  img: StaticImageData;
}

function CredibilityItem({ label, description, img }: CredibilityItemProps) {
  return (
    <li className="shrink-0">
      <div
        className={cn(
          "flex items-center gap-3",
          "border-r border-border-default",
          "px-5 py-2 sm:px-7 lg:px-9",
        )}
      >
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center",
            "sm:size-13 lg:size-14",
          )}
        >
          <Image
            src={img}
            alt=""
            sizes="56px"
            className="size-full object-contain"
          />
        </div>

        <div className="min-w-0">
          <p
            className={cn(
              "whitespace-nowrap",
              "text-label font-semibold",
              "text-text-primary",
            )}
          >
            {label}
          </p>

          <p
            className={cn(
              "whitespace-nowrap",
              "text-label leading-tight",
              "text-text-muted",
            )}
          >
            {description}
          </p>
        </div>
      </div>
    </li>
  );
}

function CredibilityTrack() {
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
      )}
    >
      <div
        className={cn(
          "flex w-max",
          "animate-credibility-marquee",
          "group-hover:[animation-play-state:paused]",
          "group-focus-within:[animation-play-state:paused]",
          "motion-reduce:animate-none",
        )}
      >
        <ul
          aria-label="Bappa Ayurveda credentials"
          className="flex shrink-0 list-none items-center"
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

        <ul aria-hidden="true" className="flex shrink-0 list-none items-center">
          {credibilityItems.map((item) => (
            <CredibilityItem
              key={`duplicate-${item.label}`}
              label={item.label}
              description={item.description}
              img={item.img}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function CredibilityBar() {
  return (
    <Section
      padding="sm"
      background="surface"
      className="border-y border-border-default"
    >
      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="text-center">
          <h3 className="leading-tight">
            Trusted by Authorities.
            <span className="block text-text-muted">Chosen by Thousands.</span>
          </h3>
        </div>

        <CredibilityTrack />
      </div>
    </Section>
  );
}
