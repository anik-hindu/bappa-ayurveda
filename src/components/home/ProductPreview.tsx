import { Button, Section } from "@/components/ui";
import { shukravita } from "@/data/products";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function ProductPreview() {
  return (
    <Section
      id="shukravita"
      background="surface"
      padding="lg"
      aria-labelledby="shukravita-heading"
    >
      <div
        className={cn(
          "grid items-center gap-10",
          "md:grid-cols-[0.9fr_1.1fr] md:gap-16",
          "lg:grid-cols-2 lg:gap-20",
        )}
      >
        {/* Product image */}
        <div
          className={cn(
            "relative flex items-center justify-center",
            "order-first md:order-last",
          )}
        >
          {/* Decorative background */}
          <div
            className={cn(
              "absolute aspect-square w-[85%]",
              "rounded-full",
              "bg-bg-page",
            )}
            aria-hidden="true"
          />

          <div
            className={cn("relative z-10", "w-full max-w-sm", "aspect-square")}
          >
            <Image
              src={shukravita.image}
              alt={shukravita.imageAlt}
              fill
              sizes="(max-width: 768px) 80vw, 40vw"
              className="object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-xl">
          <p
            className={cn(
              "font-body text-label font-semibold",
              "tracking-wider uppercase",
              "text-text-accent",
            )}
          >
            {shukravita.eyebrow}
          </p>

          <h2 id="shukravita-heading" className="mt-3 text-text-primary">
            {shukravita.name}
          </h2>

          <p
            className={cn(
              "mt-5 max-w-[52ch]",
              "font-body text-body-lg leading-relaxed",
              "text-text-body",
            )}
          >
            {shukravita.description}
          </p>

          {/* Highlights */}
          <ul role="list" className={cn("mt-8 grid gap-3", "sm:grid-cols-2")}>
            {shukravita.highlights.map((highlight) => (
              <li
                key={highlight}
                className={cn(
                  "flex items-center gap-3",
                  "font-body text-body",
                  "text-text-body",
                )}
              >
                <span
                  className="flex size-5 shrink-0 items-center justify-center rounded-full bg-bg-surface"
                  aria-hidden="true"
                >
                  <CheckIcon className="size-3 text-text-accent" />
                </span>

                {highlight}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                href={shukravita.cta.primary}
                external
                variant="primary"
                size="sm"
                className="w-full md:w-auto"
              >
                Explore on Amazon
              </Button>
              <Button
                href={shukravita.cta.secondary}
                external
                variant="secondary"
                size="sm"
                className="w-full md:w-auto"
              >
                Explore on Flipkart
              </Button>
            </div>

            <span className="font-body text-caption text-text-muted">
              {shukravita.details}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
