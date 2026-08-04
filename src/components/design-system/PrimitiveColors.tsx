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

function PrimitiveColors() {
  return (
    <section className="space-y-8">
      <h2>Primitive Colors</h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {primitiveColors.map((color) => (
          <article key={color.name} className="rounded-lg border p-4 shadow-sm">
            <div className={cn(`h-24 rounded-md border`, color.className)} />

            <div className="mt-4 space-y-1">
              <h3>{color.name}</h3>
              <p>{color.value}</p>
              <p>{color.usage}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PrimitiveColors;
