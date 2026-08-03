import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="flex min-h-screen items-center justify-center bg-[var(--color-bg-page)]"
    >
      <div className="space-y-8 text-center">
        <h1 className="text-hero text-text-primary">Bappa Ayurveda</h1>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary">Shop SHUKRAVITA</Button>
          <Button variant="secondary">Our Story</Button>
          <Button variant="link" href="#main-content">
            Read Blog
          </Button>
        </div>
      </div>
    </main>
  );
}
