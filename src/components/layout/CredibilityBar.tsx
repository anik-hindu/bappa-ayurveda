import { Section } from "@/components/ui";
import {
  BeakerIcon,
  BuildingOffice2Icon,
  ShieldCheckIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";

const credibility = [
  {
    label: "DPIIT Recognized",
    icon: BuildingOffice2Icon,
  },
  {
    label: "AYUSH Licensed",
    icon: ShieldCheckIcon,
  },
  {
    label: "GMP Certified",
    icon: BeakerIcon,
  },
  {
    label: "Live on Amazon.in & Flipkart",
    icon: ShoppingBagIcon,
  },
];

export default function CredibilityBar() {
  return (
    <Section
      background="inverse"
      className="border-b border-[rgba(247,243,237,0.1)]"
      padding="sm"
      aria-label="Company credentials"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
        {credibility.map(({ label, icon: Icon }, index) => (
          <div
            key={label}
            className="flex flex-col items-center gap-4 sm:flex-row"
          >
            <div className="inline-flex items-center gap-2 rounded-badge border border-border-subtle bg-white/5 px-4 py-2 backdrop-blur-sm">
              <Icon
                className="size-4 shrink-0 text-text-accent"
                aria-hidden="true"
              />

              <span className="font-body text-caption font-medium tracking-wider text-text-inverse uppercase">
                {label}
              </span>
            </div>

            {index < credibility.length - 1 && (
              <span
                className="h-px w-8 bg-text-accent/40 sm:h-4 sm:w-px"
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
