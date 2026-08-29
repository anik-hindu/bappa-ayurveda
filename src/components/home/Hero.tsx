import shukravitaImage from "@/assets/images/shukravita.png";

import { Badge, Button, Section } from "@/components/ui";
import { trustItems } from "@/data/credibility";
import { cn } from "@/lib/cn";
import Image from "next/image";

export default function Hero() {
  return (
    <Section
      background="page"
      padding="sm"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <div
        className={cn(
          "relative z-10 grid w-full grid-cols-1 items-center gap-10",
          "py-12",
          "md:grid-cols-2 md:gap-16 md:py-0",
        )}
      >
        {/* Content */}
        <div
          className={cn(
            "flex flex-col items-start gap-6 md:gap-8",
            "motion-safe:animate-[fadeInUp_0.5s_ease_both]",
          )}
        >
          <Badge variant="accent">Ayurveda for Real Life</Badge>
          <div className="space-y-4 md:space-y-5">
            <h1
              id="hero-heading"
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
                "text-body-lg text-text-muted",
                "max-w-[52ch]",
                "leading-relaxed",
              )}
            >
              Classical Ayurvedic formulations, thoughtfully crafted for modern
              life and held to modern standards.
            </p>
          </div>
          {/* Primary actions */}
          <div
            className={cn(
              "flex flex-col gap-3",
              "sm:flex-row sm:flex-wrap sm:gap-4",
            )}
          >
            <Button
              href="https://amzn.in/d/0irbMWo1"
              external
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Explore SHUKRAVITA
            </Button>

            <Button
              href="/about"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Discover Our Story
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="border-t border-border-subtle pt-6 md:pt-8">
            <ul
              aria-label="Certifications and availability"
              className={cn(
                "flex flex-wrap items-center justify-center",
                "gap-x-5 gap-y-3",
              )}
            >
              {trustItems.map((item, index) => (
                <li key={item.label} className="flex items-center gap-3">
                  {/* Icon */}
                  <div
                    className="flex size-5 shrink-0 items-center justify-center md:size-6"
                    aria-hidden="true"
                  >
                    <Image
                      src={item.img}
                      alt=""
                      width={24}
                      height={24}
                      className="size-full object-contain"
                    />
                  </div>

                  {/* Label */}
                  <span className="font-body text-caption text-text-muted">
                    {item.label}
                  </span>

                  {/* Separator */}
                  {index < trustItems.length - 1 && (
                    <span
                      className="h-3 w-px shrink-0 bg-border-default"
                      aria-hidden="true"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={cn(
            "relative order-first flex items-center justify-center",
            "self-start md:order-last",
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
              className="rounded object-contain"
              sizes="(max-width: 639px) 280px, (max-width: 1023px) 340px, 440px"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
