import {
  BadgeDocs,
  ButtonDocs,
  Elevation,
  Guidelines,
  Hero,
  InputDocs,
  Layout,
  PrimitiveColors,
  SectionDocs,
  SemanticTokens,
  SidebarNavigation,
  Typography,
} from "@/components/design-system";

export const metadata = {
  title: "Design System",
  description:
    "Bappa Ayurveda design system — tokens, components, and guidelines.",
};

export default function DesignSystemPage() {
  return (
    <main className="container-page">
      <div className="flex flex-col lg:grid lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-16">
        <SidebarNavigation />
        <article
          id="main-content"
          tabIndex={-1}
          className="min-w-0 divide-y divide-border-subtle"
        >
          <Hero />
          <PrimitiveColors />
          <SemanticTokens />
          <Typography />
          <Layout />
          <Elevation />
          <ButtonDocs />
          <BadgeDocs />
          <InputDocs />
          <SectionDocs />
          <Guidelines />
        </article>
      </div>
    </main>
  );
}
