import Input from "@/components/ui/Input";

function InputDocs() {
  return (
    <section id="input" className="space-y-8">
      <div className="space-y-2">
        <p className="text-label tracking-[0.2em] text-text-accent uppercase">
          Form
        </p>

        <h2>Input</h2>

        <p className="max-w-article text-text-body">
          The Input component provides a consistent and accessible text field
          for collecting user input. It supports labels, helper text, validation
          feedback, required fields, and all native HTML input attributes while
          following the project&rsquo;s design tokens.
        </p>
      </div>

      {/* Default */}
      <div className="space-y-4">
        <h3>Default</h3>

        <div className="max-w-md">
          <Input label="Full Name" placeholder="Enter your full name" />
        </div>
      </div>

      {/* Helper Text */}
      <div className="space-y-4">
        <h3>Helper Text</h3>

        <div className="max-w-md">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            hint="We'll only use this to contact you."
          />
        </div>
      </div>

      {/* Required */}
      <div className="space-y-4">
        <h3>Required</h3>

        <div className="max-w-md">
          <Input
            label="Password"
            type="password"
            required
            placeholder="••••••••"
          />
        </div>
      </div>

      {/* Validation */}
      <div className="space-y-4">
        <h3>Validation</h3>

        <div className="max-w-md">
          <Input
            label="Email Address"
            type="email"
            defaultValue="anik@email"
            error="Please enter a valid email address."
          />
        </div>
      </div>

      {/* Disabled */}
      <div className="space-y-4">
        <h3>Disabled</h3>

        <div className="max-w-md">
          <Input label="Username" value="aniksaha" disabled />
        </div>
      </div>

      {/* Types */}
      <div className="space-y-4">
        <h3>Common Input Types</h3>

        <div className="grid gap-6 md:grid-cols-2">
          <Input label="Email" type="email" placeholder="you@example.com" />

          <Input label="Password" type="password" placeholder="••••••••" />

          <Input label="Phone" type="tel" placeholder="+880 1XXX XXX XXX" />

          <Input
            label="Search"
            type="search"
            placeholder="Search articles..."
          />
        </div>
      </div>

      {/* Usage */}
      <div className="rounded-card border border-border-default bg-bg-surface p-6">
        <h3 className="mb-4">Usage Guidelines</h3>

        <ul className="space-y-2 text-body">
          <li>
            • Always provide a descriptive <strong>label</strong>.
          </li>

          <li>
            • Use <code>hint</code> to provide additional context before the
            user begins typing.
          </li>

          <li>
            • Use <code>error</code> only after validation fails.
          </li>

          <li>
            • Mark mandatory fields with the <code>required</code> attribute
            rather than relying only on visual indicators.
          </li>

          <li>
            • Prefer native HTML input types such as <code>email</code>,{" "}
            <code>password</code>, <code>tel</code>, and <code>search</code>{" "}
            whenever possible.
          </li>

          <li>• Avoid placeholder text as a replacement for labels.</li>
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
                <td className="p-4">label</td>
                <td className="p-4">ReactNode</td>
                <td className="p-4">—</td>
                <td className="p-4">
                  Accessible label displayed above the input.
                </td>
              </tr>

              <tr className="border-t border-border-subtle">
                <td className="p-4">hint</td>
                <td className="p-4">string</td>
                <td className="p-4">—</td>
                <td className="p-4">Displays helper text below the label.</td>
              </tr>

              <tr className="border-t border-border-subtle">
                <td className="p-4">error</td>
                <td className="p-4">string</td>
                <td className="p-4">—</td>
                <td className="p-4">
                  Displays an error message and marks the input as invalid.
                </td>
              </tr>

              <tr className="border-t border-border-subtle">
                <td className="p-4">id</td>
                <td className="p-4">string</td>
                <td className="p-4">Generated</td>
                <td className="p-4">
                  Overrides the automatically generated input ID.
                </td>
              </tr>

              <tr className="border-t border-border-subtle">
                <td className="p-4">className</td>
                <td className="p-4">string</td>
                <td className="p-4">—</td>
                <td className="p-4">
                  Adds custom utility classes to the input element.
                </td>
              </tr>

              <tr className="border-t border-border-subtle">
                <td className="p-4">...</td>
                <td className="p-4">
                  InputHTMLAttributes&lt;HTMLInputElement&gt;
                </td>
                <td className="p-4">—</td>
                <td className="p-4">
                  Supports all native HTML input attributes (type, placeholder,
                  required, disabled, autoComplete, etc.).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default InputDocs;
