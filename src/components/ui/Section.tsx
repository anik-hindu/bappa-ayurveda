import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

type SectionBackground = "page" | "surface" | "inverse";
type SectionSpacing = "sm" | "md" | "lg";

interface SectionProps extends HTMLAttributes<HTMLElement> {
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
  sm: "py-section-sm-mobile lg:py-section-sm-desktop",
  md: "py-section-md-mobile lg:py-section-md-desktop",
  lg: "py-section-lg-mobile lg:py-section-lg-desktop",
} as const;

export default function Section({
  children,
  container = true,
  id,
  background = "page",
  padding = "md",
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "w-full",
        backgrounds[background],
        spacings[padding],
        className,
        { ...props },
      )}
    >
      {container ? <div className="container-page">{children}</div> : children}
    </section>
  );
}
