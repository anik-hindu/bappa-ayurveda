import { Section } from "@/components/ui";

function Guidelines() {
  return (
    <Section container={false} id="guidelines" className="space-y-8">
      <h2>Usage Guidelines</h2>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3>Best Practices</h3>

          <ul className="list-disc space-y-2 pl-6">
            <li>Use semantic tokens.</li>
            <li>Build reusable components.</li>
            <li>Use Cormorant Garamond only for headings.</li>
            <li>Use DM Sans for all body text.</li>
            <li>Maintain the 8px spacing rhythm.</li>
          </ul>
        </div>

        <div>
          <h3>Avoid</h3>

          <ul className="list-disc space-y-2 pl-6">
            <li>Hardcode colors.</li>
            <li>Introduce new fonts.</li>
            <li>Add colors outside the palette.</li>
            <li>Use inline values repeatedly.</li>
            <li>Break accessibility guidelines.</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

export default Guidelines;
