"use client";

import { Button, Section } from "@/components/ui";
import { pie } from "@/data/pie";
import { cn } from "@/lib/cn";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { FormEvent, useState } from "react";

export default function PieTeaser() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) return;

    // TODO: Connect to the approved waitlist backend.
    setSubmitted(true);
  }

  return (
    <Section
      id="pie"
      background="page"
      padding="lg"
      aria-labelledby="pie-heading"
    >
      <div
        className={cn(
          "relative overflow-hidden",
          "rounded-card",
          "border border-dashed border-border-accent",
          "bg-bg-surface",
          "px-6 py-12",
          "sm:px-10 sm:py-16",
          "lg:px-20 lg:py-20",
        )}
      >
        {/* Decorative element */}
        <div
          className={cn(
            "pointer-events-none absolute -top-24 -right-24",
            "size-64 rounded-full",
            "border border-border-accent/20",
          )}
          aria-hidden="true"
        />

        <div
          className={cn(
            "pointer-events-none absolute -bottom-32 -left-20",
            "size-56 rounded-full",
            "border border-border-accent/10",
          )}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <span
            className={cn(
              "inline-flex items-center",
              "rounded-full",
              "border border-border-accent",
              "px-3 py-1",
              "font-body text-label font-semibold",
              "tracking-wider uppercase",
              "text-text-accent",
            )}
          >
            {pie.eyebrow}
          </span>

          {/* Headline */}
          <h2
            id="pie-heading"
            className={cn("mt-6", "text-balance", "text-text-primary")}
          >
            {pie.headline}
          </h2>

          {/* Product name */}
          <p
            className={cn(
              "mt-5",
              "font-display text-sub font-semibold",
              "text-text-accent",
            )}
          >
            {pie.name}
          </p>

          {/* Description */}
          <p
            className={cn(
              "mx-auto mt-5 max-w-[65ch]",
              "font-body text-body-lg leading-relaxed",
              "text-text-body",
            )}
          >
            {pie.description}
          </p>

          {/* Brand statement */}
          <blockquote
            className={cn(
              "mx-auto mt-8 max-w-xl",
              "border-y border-border-subtle",
              "py-5",
              "font-display text-body-lg italic",
              "text-text-primary",
            )}
          >
            {pie.statement}
          </blockquote>

          {/* Waitlist */}
          <div className="mx-auto mt-10 max-w-xl">
            {submitted ? (
              <p role="status" className="font-body text-body text-text-accent">
                You&rsquo;re on the list. We&rsquo;ll let you know when PIE
                launches.
              </p>
            ) : (
              <>
                <p className="mb-4 font-body text-body font-medium text-text-primary">
                  {pie.waitlist.title}
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <label htmlFor="pie-email" className="sr-only">
                    Email address
                  </label>

                  <input
                    id="pie-email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={pie.waitlist.placeholder}
                    autoComplete="email"
                    required
                    className={cn(
                      "min-w-0 flex-1",
                      "rounded-btn",
                      "border border-border-default",
                      "bg-bg-page",
                      "px-4 py-3",
                      "font-body text-body",
                      "text-text-primary",
                      "placeholder:text-text-muted",
                      "outline-none",
                      "transition-colors duration-(--duration-fast)",
                      "focus:border-border-accent",
                      "focus:ring-2 focus:ring-border-accent/20",
                    )}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    className="shrink-0"
                  >
                    {pie.waitlist.submitLabel}
                    <ArrowRightIcon
                      className="ml-2 size-4"
                      aria-hidden="true"
                    />
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
