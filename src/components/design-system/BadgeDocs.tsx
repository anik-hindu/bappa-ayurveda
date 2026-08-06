import { Badge, Section } from "@/components/ui/";
import {
  CheckBadgeIcon,
  SparklesIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

function BadgeDocs() {
  return (
    <Section id="badge" container={false} className="space-y-8">
      <div className="space-y-2">
        <Badge variant="accent" className="tracking-[0.2em] uppercase">
          Atom
        </Badge>
        <h2>Badge</h2>
        <p className="max-w-article">
          Badges communicate status, categories, metadata, or small labels. They
          provide low-emphasis visual context while maintaining consistency
          through semantic design tokens and reusable variants. Used for
          category tags, status indicators, and credibility markers. Always
          uppercase with letter spacing.
        </p>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h3>Variants</h3>

        <div className="flex flex-wrap gap-4">
          <Badge>Neutral</Badge>

          <Badge variant="accent">Featured</Badge>

          <Badge variant="outline">Verified</Badge>
        </div>
      </div>

      {/* Icon Support */}
      <div className="space-y-4">
        <h3>Icon Support</h3>

        <div className="flex flex-wrap gap-4">
          <Badge icon={<SparklesIcon />}>New</Badge>

          <Badge icon={<CheckBadgeIcon />}>Certified</Badge>

          <Badge icon={<TagIcon />}>Herbal</Badge>
        </div>
      </div>

      {/* Usage */}
      <div className="rounded-card border border-border-default bg-bg-surface p-6">
        <h3 className="mb-4">Usage Guidelines</h3>

        <ul className="space-y-2 text-text-body">
          <li>
            • <strong>Neutral</strong> — Default labels, categories, and
            metadata.
          </li>

          <li>
            • <strong>Accent</strong> — Highlights important or featured
            content.
          </li>

          <li>
            • <strong>Outline</strong> — Secondary or optional information.
          </li>

          <li>• Icons should reinforce meaning, not replace the text label.</li>

          <li>• Keep badge labels concise (1–3 words).</li>

          <li>
            • Badges are informational only and should not be used as buttons.
          </li>
        </ul>
      </div>

      {/* Component API */}
      <div className="space-y-4">
        <h3>Component API</h3>

        <div className="overflow-x-auto rounded-card border border-border-default">
          <table className="w-full min-w-175">
            <thead className="bg-bg-surface">
              <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>children</td>
                <td>ReactNode</td>
                <td>—</td>
                <td>The badge label.</td>
              </tr>

              <tr>
                <td>variant</td>
                <td>neutral | accent | outline</td>
                <td>neutral</td>
                <td>Controls the badge appearance.</td>
              </tr>

              <tr>
                <td>icon</td>
                <td>ReactNode</td>
                <td>—</td>
                <td>Optional decorative icon displayed before the label.</td>
              </tr>

              <tr>
                <td>className</td>
                <td>string</td>
                <td>—</td>
                <td>Extends the component with additional utility classes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
}

export default BadgeDocs;
