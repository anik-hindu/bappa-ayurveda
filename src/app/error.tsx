"use client";

import { Button, Section } from "@/components/ui/";
import Image from "next/image";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center text-center"
    >
      <Section container={false} className="space-y-4 px-4" padding="sm">
        <Image
          src="/illustrations/500-server-error.svg"
          alt=""
          aria-hidden="true"
          width={480}
          height={360}
          className="mx-auto h-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
          priority
        />
        {/* Error code */}
        {/* <p
          className="font-display text-[5rem] leading-none font-semibold text-text-primary opacity-10 md:text-[7rem] lg:text-[8rem]"
          aria-hidden="true"
        >
          500
        </p> */}

        {/* Divider */}
        {/* <div className="mx-auto h-px w-12 bg-text-accent" /> */}

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="font-display text-section text-text-primary">
            Something Went Wrong
          </h1>
          <p className="font-body text-body-lg text-text-muted">
            Something unexpected happened while loading this page. Please try
            again. If the problem persists, return to the homepage.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button onClick={reset} variant="primary">
            Try Again
          </Button>
          <Button href="/" variant="secondary">
            Back to Home
          </Button>
        </div>

        {/* Brand note */}
        <p className="font-body text-caption text-text-muted opacity-70">
          Bappa Ayurveda · DPIIT Recognized · AYUSH Licensed
        </p>
      </Section>
    </main>
  );
}
