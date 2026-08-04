import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type SectionBackground = "page" | "surface" | "inverse";
type SectionSpacing = "sm" | "md" | "lg";

interface SectionProps {
  children: ReactNode;
  container?: boolean;
  id?: string;
  background?: SectionBackground;
  padding?: SectionSpacing;
  className?: string;
}

const backgrounds = {
  page: "bg-bg-page",
  surface: "bg-bg-surface",
  inverse: "bg-bg-inverse text-text-inverse",
} as const;

const spacings = {
  sm: "py-section-y-mobile md:py-[calc(var(--spacing-section-y-desktop)*0.6)]",
  md: "py-section-y-mobile md:py-[var(--spacing-section-y-desktop)]",
  lg: "py-[calc(var(--spacing-section-y-mobile)*1.5)] md:py-[calc(var(--spacing-section-y-desktop)*1.25)]",
} as const;

export default function Section({
  children,
  container = true,
  id,
  background = "page",
  padding = "md",
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full",
        backgrounds[background],
        spacings[padding],
        className,
      )}
    >
      {container ? <div className="container-page">{children}</div> : children}
    </section>
  );
}
