import { cn } from "@/lib/cn";

export default function HeroHeadline() {
  return (
    <div className="space-y-4 md:space-y-5">
      <h1
        className={cn(
          "text-[clamp(2rem,5vw,4rem)]",
          "leading-hero",
          "tracking-[-0.02em]",
        )}
      >
        Rooted in Science. <br className="hidden sm:block" />
        Backed by Tradition.
      </h1>

      <p
        className={cn(
          "font-body text-body-lg text-text-muted",
          "max-w-[52ch]", 
          "leading-relaxed",
        )}
      >
        Authentic Ayurvedic solutions crafted with natural ingredients to
        support your health, naturally.
      </p>
    </div>
  );
}
