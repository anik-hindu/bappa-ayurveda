import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";

export default function HeroCTAs() {
  return (
    <div
      className={cn("flex flex-col gap-3", "sm:flex-row sm:flex-wrap sm:gap-4")}
    >
      <Button
        href="https://amzn.in/d/0irbMWo1"
        external
        variant="primary"
        size="lg"
        className="w-full sm:w-auto"
        aria-label="Explore SHUKRAVITA on Amazon — opens in new tab"
      >
        Explore SHUKRAVITA
      </Button>

      <Button
        href="/quiz"
        variant="secondary"
        size="lg"
        className="w-full sm:w-auto"
      >
        Take Health Quiz
      </Button>
    </div>
  );
}
