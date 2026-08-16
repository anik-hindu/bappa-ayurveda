import { Section } from "@/components/ui/";
import { trustItems } from "@/data/credibility";
import { cn } from "@/lib/cn";

import {
  HeroCTAs,
  HeroEyebrow,
  HeroHeadline,
  ProductImage,
  TrustBar,
} from "@/components/home/Hero";

export default function Hero() {
  return (
    <Section
      id="hero"
      background="page"
      padding="sm"
      aria-label="Hero — Bappa Ayurveda"
      className={cn("relative overflow-hidden", "flex items-center")}
    >
      {/* Background accent — decorative */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          "bg-[radial-gradient(ellipse_80%_50%_at_70%_40%,rgba(44,74,62,0.04),transparent)]",
        )}
        aria-hidden="true"
      />

      <div
        className={cn(
          "relative z-10 w-full",
          "grid grid-cols-1 items-center gap-10",
          "py-12",
          "md:grid-cols-2 md:gap-16 md:py-0",
        )}
      >
        {/* Left — Content */}
        <div
          className={cn(
            "flex flex-col gap-6 md:gap-8",
            "motion-safe:animate-[fadeInUp_0.5s_ease_both]",
          )}
        >
          <HeroEyebrow />
          <HeroHeadline />
          <HeroCTAs />
          <TrustBar items={trustItems} />
        </div>

        <ProductImage />
      </div>
    </Section>
  );
}
