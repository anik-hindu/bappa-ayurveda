import shukravitaImage from "@/assets/images/shukravita.png";
import { cn } from "@/lib/cn";

import Image from "next/image";

export default function ProductImage() {
  return (
    <div
      className={cn(
        "relative isolate",
        "flex items-center justify-center",
        "order-first md:order-last",
      )}
      aria-hidden="false"
    >
      {/* Subtle decorative ring */}
      <div
        className={cn(
          "absolute inset-0 m-auto",
          "aspect-square w-[85%]",
          "rounded-full",
          "bg-bg-surface",
          "opacity-60",
        )}
        aria-hidden="true"
      />

      {/* Product image */}
      <div
        className={cn(
          "relative z-10",
          "w-full max-w-xs md:max-w-sm lg:max-w-md",
          "aspect-square bg-bg-surface",
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
            "mix-blend-multiply",
            "motion-safe:animate-[fadeInUp_0.6s_ease_0.2s_both]",
          )}
          sizes="(max-width: 640px) 80vw,
                 (max-width: 1024px) 45vw,
                 40vw"
        />
      </div>
    </div>
  );
}
