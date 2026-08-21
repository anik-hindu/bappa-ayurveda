import { Section } from "@/components/ui";
import { cn } from "@/lib/cn";

function BlogHeader() {
  return (
    <Section
      padding="lg"
      className="border-b border-[#2C4A3E]/10"
      aria-labelledby="blog-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span
          className={cn(
            "mb-4 inline-block",
            "text-xs font-medium tracking-[0.2em] uppercase",
            "text-[#B8892A]",
          )}
        >
          The Bappa Journal
        </span>

        <h1
          id="blog-heading"
          className={cn(
            "font-serif text-5xl leading-[0.95] font-medium",
            "tracking-tight text-[#2C4A3E]",
            "sm:text-6xl lg:text-7xl",
          )}
        >
          Ayurveda, Explained.
        </h1>

        <p
          className={cn(
            "mx-auto mt-6 max-w-2xl",
            "text-base leading-7 text-[#2A2A2A]/70",
            "sm:text-lg sm:leading-8",
          )}
        >
          Our journal explores Ayurvedic principles, powerful ingredients,
          formulations, and the thinking behind Bappa Ayurveda — bridging
          classical wisdom with modern evidence.
        </p>
      </div>
    </Section>
  );
}

export default BlogHeader;
