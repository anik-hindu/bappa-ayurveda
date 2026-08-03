import { cn } from "@/lib/cn";

const primitiveColors = [
  {
    name: "--color-off-white",
    value: "#F7F3ED",
    className: "bg-off-white",
    usage: "Primary page background",
  },
  {
    name: "--color-gold",
    value: "#B8892A",
    className: "bg-gold",
    usage: "Accent & CTA",
  },
  {
    name: "--color-forest",
    value: "#2C4A3E",
    className: "bg-forest",
    usage: "Primary brand color",
  },
  {
    name: "--color-charcoal",
    value: "#2A2A2A",
    className: "bg-charcoal",
    usage: "Body text",
  },
];

const semanticColors = [
  ["Page Background", "--color-bg-page"],
  ["Surface", "--color-bg-surface"],
  ["Inverse", "--color-bg-inverse"],
  ["Accent", "--color-bg-accent"],
  ["Hover", "--color-bg-hover"],
  ["Disabled", "--color-bg-disabled"],

  ["Text Primary", "--color-text-primary"],
  ["Text Body", "--color-text-body"],
  ["Text Muted", "--color-text-muted"],
  ["Text Accent", "--color-text-accent"],
  ["Text Inverse", "--color-text-inverse"],

  ["Border", "--color-border-default"],
  ["Border Accent", "--color-border-accent"],
  ["Border Subtle", "--color-border-subtle"],
];

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

export default function DesignSystemPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="container-page space-y-24 py-16"
    >
      {/* Hero */}

      <section className="space-y-4">
        <span className="text-label tracking-[0.2em] text-text-accent uppercase">
          Living Documentation
        </span>

        <h1 className="text-hero">Bappa Ayurveda Design System</h1>

        <p className="max-w-180 text-body-lg">
          This page documents every design token used throughout the project.
          Components should consume semantic tokens rather than hard-coded
          values.
        </p>
      </section>

      {/* Primitive */}

      <section className="space-y-8">
        <h2 className="text-section">Primitive Colors</h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {primitiveColors.map((color) => (
            <article
              key={color.name}
              className="rounded-lg border p-4 shadow-sm"
            >
              <div className={cn(`h-24 rounded-md border`, color.className)} />

              <div className="mt-4 space-y-1">
                <h3 className="text-sub">{color.name}</h3>
                <p>{color.value}</p>
                <p>{color.usage}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Semantic */}

      <section className="space-y-8">
        <h2 className="text-section">Semantic Tokens</h2>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {semanticColors.map(([title, variable]) => (
            <div
              key={variable}
              className="flex items-center gap-4 rounded-lg border p-4"
            >
              <div
                className="h-16 w-16 shrink-0 rounded border"
                style={{
                  background: `var(${variable})`,
                }}
              />

              <div>
                <p className="font-medium">{title}</p>
                <code>{variable}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}

      <section className="space-y-10">
        <h2 className="text-section">Typography Scale</h2>

        <div className="space-y-10">
          {typography.map((item) => (
            <div key={item.label} className="border-b pb-8">
              <div style={item.style}>
                Ayurveda Redefined for the Modern Age
              </div>

              <p className="mt-2">
                Token: <code>{item.variable}</code>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}

      <section className="space-y-8">
        <h2 className="text-section">Buttons</h2>

        <div className="flex flex-wrap gap-4">
          <button
            className="px-5 py-3"
            style={{
              background: "var(--color-btn-primary-bg)",
              color: "var(--color-btn-primary-text)",
              borderRadius: "var(--radius-btn)",
            }}
          >
            Primary
          </button>

          <button
            className="border px-5 py-3"
            style={{
              background: "var(--color-btn-secondary-bg)",
              color: "var(--color-btn-secondary-text)",
              borderRadius: "var(--radius-btn)",
              borderColor: "var(--color-btn-secondary-text)",
            }}
          >
            Secondary
          </button>

          <button
            disabled
            className="px-5 py-3"
            style={{
              background: "var(--color-btn-disabled)",
              color: "white",
              borderRadius: "var(--radius-btn)",
            }}
          >
            Disabled
          </button>
        </div>
      </section>

      {/* Layout */}

      <section className="space-y-8">
        <h2 className="text-section">Layout Widths</h2>

        <div className="space-y-6">
          <div>
            <p>Content Width</p>

            <div className="h-12 max-w-content rounded border bg-bg-surface" />
          </div>

          <div>
            <p>Article Width</p>

            <div className="h-12 max-w-article rounded border bg-bg-surface" />
          </div>

          <div>
            <p>Narrow Width</p>

            <div className="h-12 max-w-narrow rounded border bg-bg-surface" />
          </div>
        </div>
      </section>

      {/* Shadows */}

      <section className="space-y-8">
        <h2 className="text-section">Elevation</h2>

        <div className="flex flex-wrap gap-8">
          <div className="flex h-32 w-56 items-center justify-center rounded-lg bg-white shadow-card">
            shadow-card
          </div>

          <div className="flex h-32 w-56 items-center justify-center rounded-lg bg-white hover:shadow-hover">
            hover:shadow-hover
          </div>
        </div>
      </section>

      {/* Usage */}

      <section className="space-y-8">
        <h2 className="text-section">Usage Guidelines</h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="text-sub">Do</h3>

            <ul className="list-disc space-y-2 pl-6">
              <li>Use semantic tokens.</li>
              <li>Build reusable components.</li>
              <li>Use Cormorant Garamond only for headings.</li>
              <li>Use DM Sans for all body text.</li>
              <li>Maintain the 8px spacing rhythm.</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sub">Don&apos;t</h3>

            <ul className="list-disc space-y-2 pl-6">
              <li>Hardcode colors.</li>
              <li>Introduce new fonts.</li>
              <li>Add colors outside the palette.</li>
              <li>Use inline values repeatedly.</li>
              <li>Break accessibility guidelines.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
