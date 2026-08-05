import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center text-center"
    >
      <div className="container-narrow space-y-8">
        {/* Error code */}
        <p
          className="font-display text-[8rem] leading-none font-semibold text-text-primary opacity-10"
          aria-hidden="true"
        >
          404
        </p>

        {/* Divider */}
        <div className="mx-auto h-px w-12 bg-text-accent" />

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="font-display text-section text-text-primary">
            Page Not Found
          </h1>
          <p className="font-body text-body-lg text-text-muted">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/blog" variant="secondary">
            Read Our Blog
          </Button>
        </div>

        {/* Brand note */}
        <p className="font-body text-caption text-text-muted">
          Bappa Ayurveda · DPIIT Recognized · AYUSH Licensed
        </p>
      </div>
    </main>
  );
}
