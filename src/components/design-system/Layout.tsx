import { Section } from "@/components/ui";

function Layout() {
  return (
    <Section id="layout" container={false} className="space-y-8">
      <h2>Layout Widths</h2>

      <div className="space-y-6">
        <div>
          <p>Content Width</p>

          <div className="flex h-12 max-w-content items-center justify-center rounded border bg-bg-surface">
            1200px
          </div>
        </div>

        <div>
          <p>Article Width</p>

          <div className="flex h-12 max-w-article items-center justify-center rounded border bg-bg-surface">
            760px
          </div>
        </div>

        <div>
          <p>Narrow Width</p>

          <div className="flex h-12 max-w-narrow items-center justify-center rounded border bg-bg-surface">
            560px
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Layout;
