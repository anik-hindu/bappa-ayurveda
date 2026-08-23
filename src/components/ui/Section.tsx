import { cn } from "@/lib/cn";
import type { HTMLAttributes, ReactNode } from "react";

type SectionBackground = "page" | "surface" | "inverse";
type SectionSpacing = "sm" | "md" | "lg";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  container?: boolean;
  background?: SectionBackground;
  padding?: SectionSpacing;
}

const backgrounds: Record<SectionBackground, string> = {
  page: "bg-bg-page",
  surface: "bg-bg-surface",
  inverse: "bg-bg-inverse text-text-inverse",
};

const spacings: Record<SectionSpacing, string> = {
  sm: "py-section-sm-mobile lg:py-section-sm-desktop",
  md: "py-section-md-mobile lg:py-section-md-desktop",
  lg: "py-section-lg-mobile lg:py-section-lg-desktop",
};

export default function Section({
  children,
  container = true,
  background = "page",
  padding = "md",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
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
