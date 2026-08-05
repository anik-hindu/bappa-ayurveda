import { Button, Section } from "@/components/ui/";
import Image from "next/image";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center text-center"
    >
      <Section container={false} className="space-y-8 px-4" padding="sm">
        <Image
          src="/illustrations/404-broken-robot.svg"
          alt=""
          aria-hidden="true"
          width={480}
          height={360}
          priority
          className="mx-auto h-auto w-full max-w-xs sm:max-w-sm md:max-w-md"
        />

        {/* Error code */}
        {/* <span
          className="font-display text-[5rem] leading-none font-semibold text-text-primary opacity-10 md:text-[7rem] lg:text-[8rem]"
          aria-hidden="true"
        >
          404
        </span> */}

        {/* Divider */}
        {/* <div className="mx-auto h-px w-12 bg-text-accent" /> */}

        {/* Heading */}
        <header className="space-y-4">
          <h1 className="font-display text-section text-text-primary">
            Page Not Found
          </h1>
          <p className="font-body text-body-lg text-text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>
        </header>

        {/* Actions */}
        <nav className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:gap-6">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/blog" variant="secondary">
            Read Our Blog
          </Button>
        </nav>

        {/* Brand note */}
        <p className="font-body text-caption text-text-muted opacity-70">
          Bappa Ayurveda · DPIIT Recognized · AYUSH Licensed
        </p>
      </Section>
    </main>
  );
}
