import { Section } from "@/components/ui";

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

function SemanticTokens() {
  return (
    <Section id="semantic-tokens" container={false} className="space-y-8">
      <div className="space-y-2">
        <h2>Semantic Tokens</h2>
        <p className="text-text-muted">
          Always use semantic tokens in components, not primitive tokens
          directly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {semanticColors.map(([title, variable]) => (
          <div
            key={variable}
            className="flex items-center gap-4 rounded-card border p-4"
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
    </Section>
  );
}

export default SemanticTokens;
