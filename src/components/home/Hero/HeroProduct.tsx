import shukravitaImage from "@/assets/images/shukravita.png";
import { cn } from "@/lib/cn";

import Image from "next/image";

export default function HeroProduct() {
  return (
    <div
      className={cn(
        "relative",
        "flex items-center justify-center self-start",
        "order-first md:order-last",
      )}
    >
      {/* Product image */}
      <div
        className={cn(
          "relative z-10",
          "w-full max-w-70 sm:max-w-85 lg:max-w-110",
          "aspect-square",
        )}
      >
        <Image
          src={shukravitaImage}
          alt="SHUKRAVITA by Bappa Ayurveda — Ayurvedic men's vitality supplement"
          fill
          priority
          fetchPriority="high"
          className={cn(
            "object-contain",
            "motion-safe:animate-[fadeInUp_0.6s_ease_0.2s_both]",
            "h-full w-full",
          )}
          sizes="(max-width: 640px) 80vw,
                 (max-width: 1024px) 45vw,
                 40vw"
        />
      </div>
    </div>
  );
}
