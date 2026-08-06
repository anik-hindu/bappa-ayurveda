import { Section } from "@/components/ui";

const typography = [
  {
    label: "Hero",
    variable: "--text-hero",
    style: {
      fontSize: "var(--text-hero)",
      lineHeight: "var(--leading-hero)",
      fontFamily: "var(--font-display)",
    },
  },
  {
    label: "Section Heading",
    variable: "--text-section",
    style: {
      fontSize: "var(--text-section)",
      fontFamily: "var(--font-display)",
    },
  },
  {
    label: "Sub Heading",
    variable: "--text-sub",
    style: {
      fontSize: "var(--text-sub)",
      fontFamily: "var(--font-display)",
    },
  },
  {
    label: "Body Large",
    variable: "--text-body-lg",
    style: {
      fontSize: "var(--text-body-lg)",
      fontFamily: "var(--font-body)",
    },
  },
  {
    label: "Body",
    variable: "--text-body",
    style: {
      fontSize: "var(--text-body)",
      fontFamily: "var(--font-body)",
    },
  },
  {
    label: "Caption",
    variable: "--text-caption",
    style: {
      fontSize: "var(--text-caption)",
      fontFamily: "var(--font-body)",
    },
  },
];

function Typography() {
  return (
    <Section id="typography" container={false} className="space-y-10">
      <div className="space-y-2">
        <h2>Typography Scale</h2>
        <p className="text-text-muted">
          Cormorant Garamond for display. DM Sans for everything else.
        </p>
      </div>

      <div className="space-y-10">
        {typography.map((item) => (
          <div key={item.label} className="border-b pb-8">
            <div style={item.style}>Ayurveda Redefined for the Modern Age</div>

            <p className="mt-2">
              Token: <code>{item.variable}</code>
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export default Typography;
