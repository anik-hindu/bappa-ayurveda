"use client";

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
          "px-5 sm:px-7 lg:px-9",
          "py-2",
          "border-r border-border-default",
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-center justify-center",
            "size-11 sm:size-13 lg:size-14",
          )}
          aria-hidden="true"
        >
          <Image src={img} alt="" className="size-full object-contain" />
        </div>

        <div className="min-w-0">
          <p
            className={cn(
              "text-label font-semibold",
              "whitespace-nowrap text-text-primary",
            )}
          >
            {label}
          </p>

          <p
            className={cn(
              "text-label leading-tight",
              "whitespace-nowrap text-text-muted",
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
  const items = [...credibilityItems, ...credibilityItems];

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "mask-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]",
      )}
    >
      <ul
        className={cn(
          "flex w-max list-none items-center",
          "animate-credibility-marquee",
          "group-hover:[animation-play-state:paused]",
          "group-focus-within:[animation-play-state:paused]",
          "motion-reduce:animate-none",
        )}
      >
        {items.map((item, index) => (
          <CredibilityItem
            key={`${item.label}-${index}`}
            label={item.label}
            description={item.description}
            img={item.img}
          />
        ))}
      </ul>
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
          <h3 className="leading-tight">Trusted by Authorities.</h3>

          <h3 className="leading-tight text-text-muted">
            Chosen by Thousands.
          </h3>
        </div>

        <CredibilityTrack />
      </div>
    </Section>
  );
}
