import { Badge } from "@/components/ui";
import Link from "next/link";

const navigation = [
  { id: "overview", label: "Overview" },
  { id: "primitive-colors", label: "Primitive Colors" },
  { id: "semantic-tokens", label: "Semantic Tokens" },
  { id: "typography", label: "Typography" },
  { id: "layout", label: "Layout" },
  { id: "elevation", label: "Elevation" },
  { id: "button", label: "Button" },
  { id: "badge", label: "Badge" },
  { id: "input", label: "Input" },
  { id: "section", label: "Section" },
  { id: "guidelines", label: "Guidelines" },
];

function SidebarNavigation() {
  return (
    <aside>
      <div className="scrollbar-none overflow-x-auto lg:hidden">
        <div className="w-full min-w-175">
          <nav aria-label="Design system mobile navigation" className="mb-10">
            <ul className="flex gap-2 whitespace-nowrap">
              {navigation.map((item) => (
                <li key={item.id}>
                  <Link href={`#${item.id}`}>
                    <Badge variant="outline">{item.label}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <nav
        aria-label="Design system navigation"
        className="sticky top-24 hidden h-auto lg:block"
      >
        <h2 className="mb-4 text-label tracking-[0.2em] text-text-accent uppercase">
          Contents
        </h2>

        <ul className="h-[70vh] scrollbar-thin scrollbar-thumb-bg-surface scrollbar-track-bg-page space-y-2 overflow-x-auto pb-4 whitespace-nowrap hover:scrollbar-thumb-bg-hover">
          {navigation.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className="inline-block w-full rounded-btn px-4 py-2 text-body text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary focus-visible:bg-bg-hover"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default SidebarNavigation;
