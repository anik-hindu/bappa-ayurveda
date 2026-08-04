import Section from "@/components/ui/Section";

function SectionDocs() {
  return (
    <section id="section" className="space-y-8">
      <div className="space-y-2">
        <p className="text-label tracking-[0.2em] text-text-accent uppercase">
          Layout
        </p>

        <h2>Section</h2>

        <p className="max-w-article text-text-body">
          The Section component provides a consistent layout wrapper for major
          page sections. It standardizes vertical spacing, background variants,
          and optional content constraints while encouraging semantic page
          structure.
        </p>
      </div>

      {/* Backgrounds */}
      <div className="space-y-4">
        <h3>Background Variants</h3>

        <div className="space-y-6 overflow-hidden rounded-card border border-border-default">
          <Section background="page" padding="sm">
            <p>Page Background</p>
          </Section>

          <Section background="surface" padding="sm">
            <p>Surface Background</p>
          </Section>

          <Section background="inverse" padding="sm">
            <p>Inverse Background</p>
          </Section>
        </div>
      </div>

      {/* Padding */}
      <div className="space-y-4">
        <h3>Vertical Padding</h3>

        <div className="space-y-4 rounded-card border border-border-default p-6">
          <Section background="surface" padding="sm">
            <p>Small Padding</p>
          </Section>

          <Section background="surface" padding="md">
            <p>Medium Padding</p>
          </Section>

          <Section background="surface" padding="lg">
            <p>Large Padding</p>
          </Section>
        </div>
      </div>

      {/* Container */}
      <div className="space-y-4">
        <h3>Container</h3>

        <div className="space-y-6">
          <div className="rounded-card border border-border-default">
            <Section background="surface">
              <p>Container Enabled (default)</p>
            </Section>
          </div>

          <Section background="surface" container={false}>
            <div className="border border-dashed border-border-accent p-6 text-center">
              Full Width Content (container disabled)
            </div>
          </Section>
        </div>
      </div>

      {/* Usage */}
      <div className="rounded-card border border-border-default bg-bg-surface p-6">
        <h3 className="mb-4">Usage Guidelines</h3>

        <ul className="space-y-2 text-body">
          <li>
            • Use one <strong>Section</strong> for each major content block.
          </li>

          <li>
            • Prefer semantic background variants instead of custom background
            classes.
          </li>

          <li>
            • Keep <code>container</code> enabled unless full-width content is
            required.
          </li>

          <li>
            • Choose <code>padding</code> based on visual hierarchy rather than
            adding custom spacing utilities.
          </li>

          <li>
            • Use the <code>id</code> prop for anchor navigation and skip links.
          </li>
        </ul>
      </div>

      {/* API */}
      <div className="space-y-4">
        <h3>Component API</h3>

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
                <td className="p-4">background</td>
                <td className="p-4">page | surface | inverse</td>
                <td className="p-4">page</td>
                <td className="p-4">
                  Controls the section background and text color.
                </td>
              </tr>

              <tr className="border-t border-border-subtle">
                <td className="p-4">padding</td>
                <td className="p-4">sm | md | lg</td>
                <td className="p-4">md</td>
                <td className="p-4">
                  Controls vertical spacing above and below the content.
                </td>
              </tr>

              <tr className="border-t border-border-subtle">
                <td className="p-4">container</td>
                <td className="p-4">boolean</td>
                <td className="p-4">true</td>
                <td className="p-4">
                  Wraps content with the standard page container.
                </td>
              </tr>

              <tr className="border-t border-border-subtle">
                <td className="p-4">id</td>
                <td className="p-4">string</td>
                <td className="p-4">—</td>
                <td className="p-4">
                  Provides an anchor target for navigation.
                </td>
              </tr>

              <tr className="border-t border-border-subtle">
                <td className="p-4">className</td>
                <td className="p-4">string</td>
                <td className="p-4">—</td>
                <td className="p-4">
                  Adds custom utility classes to the section.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default SectionDocs;
