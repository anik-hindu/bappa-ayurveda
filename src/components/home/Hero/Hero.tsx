import { Section } from "@/components/ui/";
import { trustItems } from "@/data/credibility";
import { cn } from "@/lib/cn";

import {
  HeroCTAs,
  HeroEyebrow,
  HeroHeadline,
  HeroProduct,
  TrustBar,
} from "@/components/home/Hero";

export default function Hero() {
  return (
    <Section
      background="page"
      padding="sm"
      aria-label="Hero — Bappa Ayurveda"
      className={cn("relative overflow-hidden", "flex items-center")}
    >

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

        <HeroProduct />
      </div>
    </Section>
  );
}
