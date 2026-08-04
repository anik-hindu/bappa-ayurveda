import Button from "@/components/ui/Button";

function ButtonDocs() {
  return (
    <section id="button" className="space-y-8">
      <div className="space-y-2">
        <p className="text-label tracking-[0.2em] text-text-accent uppercase">
          Atom
        </p>

        <h2 className="font-display text-text-primary">Button</h2>

        <p className="max-w-article text-text-body">
          The Button component provides a consistent call-to-action across the
          application. It supports primary, secondary, and text-link styles,
          multiple sizes, internal navigation, external links, disabled states,
          and accessibility out of the box.
        </p>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h3>Variants</h3>

        <div className="flex flex-wrap gap-4">
          <Button>Primary Button</Button>

          <Button variant="secondary">Secondary Button</Button>

          <Button variant="link">Link Button</Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3>Sizes</h3>

        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>

          <Button size="md">Medium</Button>

          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3>States</h3>

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
        <h3>Full Width</h3>

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
            • <strong>Link</strong> — Low-emphasis navigation or inline actions.
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

        <div className="overflow-scroll rounded-card border border-border-default">
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
  );
}

export default ButtonDocs;
