import Link from "next/link";

const navigation = [
  { id: "overview", label: "Overview" },
  { id: "primitive-colors", label: "Primitive Colors" },
  { id: "semantic-tokens", label: "Semantic Tokens" },
  { id: "typography", label: "Typography" },
  { id: "layout", label: "Layout" },
  { id: "elevation", label: "Elevation" },
  { id: "button", label: "Button" },
  { id: "guidelines", label: "Guidelines" },
];

function SidebarNavigation() {
  return (
    <>
      <aside className="">
        <div className="overflow-x-auto lg:hidden">
          <div className="w-full min-w-175">
            <nav className="mb-10">
              <ul className="flex gap-2 whitespace-nowrap">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded-full border px-4 py-2 text-sm"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <nav
          aria-label="Design system navigation"
          className="sticky top-24 hidden lg:block"
        >
          <p className="mb-4 text-label tracking-[0.2em] text-text-accent uppercase">
            Contents
          </p>

          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  className="block rounded-btn px-3 py-2 text-body text-text-muted transition-colors hover:bg-bg-hover hover:text-text-primary focus-visible:bg-bg-hover"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SidebarNavigation;
