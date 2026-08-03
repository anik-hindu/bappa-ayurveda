import Button from "@/components/ui/Button";
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
      {/* Button Component */}
      <section className="space-y-8">
        <div className="space-y-2">
          <p className="text-label tracking-[0.2em] text-text-accent uppercase">
            Atom
          </p>

          <h2 className="font-display text-section text-text-primary">
            Button
          </h2>

          <p className="max-w-3xl text-body text-text-body">
            The Button component provides a consistent call-to-action across the
            application. It supports primary, secondary, and text-link styles,
            multiple sizes, internal navigation, external links, disabled
            states, and accessibility out of the box.
          </p>
        </div>

        {/* Variants */}
        <div className="space-y-4">
          <h3 className="font-display text-sub">Variants</h3>

          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>

            <Button variant="secondary">Secondary Button</Button>

            <Button variant="link">Link Button</Button>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-4">
          <h3 className="font-display text-sub">Sizes</h3>

          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>

            <Button size="md">Medium</Button>

            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* States */}
        <div className="space-y-4">
          <h3 className="font-display text-sub">States</h3>

          <div className="flex flex-wrap gap-4">
            <Button>Default</Button>

            <Button disabled>Disabled</Button>

            <Button href="/" variant="secondary">
              Internal Link
            </Button>

            <Button href="https://example.com" external>
              External Link
            </Button>
          </div>
        </div>

        {/* Full Width */}
        <div className="max-w-md space-y-4">
          <h3 className="font-display text-sub">Full Width</h3>

          <Button fullWidth>Continue</Button>
        </div>

        {/* Usage Notes */}
        <div className="rounded-card border border-border-default bg-bg-surface p-6">
          <h3 className="mb-4 font-display text-sub">Usage Guidelines</h3>

          <ul className="space-y-2 text-body text-text-body">
            <li>
              • <strong>Primary</strong> — Main call-to-action on a page.
            </li>

            <li>
              • <strong>Secondary</strong> — Alternative or supporting actions.
            </li>

            <li>
              • <strong>Link</strong> — Low-emphasis navigation or inline
              actions.
            </li>

            <li>
              • Use <code>href</code> for navigation and
              <code> external</code> for links that open in a new tab.
            </li>

            <li>
              • Use <code>fullWidth</code> inside forms or mobile layouts.
            </li>

            <li>
              • Disabled buttons remain focus-safe and visually communicate
              unavailable actions.
            </li>
          </ul>
        </div>

        {/* Component API */}
        <div className="space-y-4">
          <h3 className="font-display text-sub">Component API</h3>

          <div className="overflow-hidden rounded-card border border-border-default">
            <table className="w-full text-left">
              <thead className="bg-bg-surface">
                <tr>
                  <th className="p-4">Prop</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Default</th>
                  <th className="p-4">Description</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t border-border-subtle">
                  <td className="p-4">variant</td>
                  <td className="p-4">primary | secondary | link</td>
                  <td className="p-4">primary</td>
                  <td className="p-4">Controls the visual style.</td>
                </tr>

                <tr className="border-t border-border-subtle">
                  <td className="p-4">size</td>
                  <td className="p-4">sm | md | lg</td>
                  <td className="p-4">md</td>
                  <td className="p-4">Controls spacing and font size.</td>
                </tr>

                <tr className="border-t border-border-subtle">
                  <td className="p-4">href</td>
                  <td className="p-4">string</td>
                  <td className="p-4">—</td>
                  <td className="p-4">
                    Renders a Next.js Link or anchor element.
                  </td>
                </tr>

                <tr className="border-t border-border-subtle">
                  <td className="p-4">external</td>
                  <td className="p-4">boolean</td>
                  <td className="p-4">false</td>
                  <td className="p-4">Opens links in a new browser tab.</td>
                </tr>

                <tr className="border-t border-border-subtle">
                  <td className="p-4">fullWidth</td>
                  <td className="p-4">boolean</td>
                  <td className="p-4">false</td>
                  <td className="p-4">Expands button to fill its container.</td>
                </tr>

                <tr className="border-t border-border-subtle">
                  <td className="p-4">disabled</td>
                  <td className="p-4">boolean</td>
                  <td className="p-4">false</td>
                  <td className="p-4">
                    Disables interaction while preserving accessibility.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
