import { Badge, Section } from "@/components/ui";

function Hero() {
  return (
    <Section id="overview" container={false} padding="sm" className="space-y-4">
      <Badge variant="accent" className="tracking-[0.2em] uppercase">
        Living Documentation
      </Badge>

      <h1>Bappa Ayurveda Design System</h1>

      <p className="max-w-article text-body-lg">
        This page documents every design token, component, and guideline used
        throughout the project. Components should consume semantic tokens rather
        than hard-coded values.
      </p>

      <div className="flex flex-wrap gap-3">
        <Badge variant="neutral">Tailwind v4</Badge>
        <Badge variant="neutral">Next.js 16</Badge>
        <Badge variant="neutral">4 Colors Only</Badge>
        <Badge variant="neutral">2 Fonts Only</Badge>
      </div>
    </Section>
  );
}

export default Hero;
