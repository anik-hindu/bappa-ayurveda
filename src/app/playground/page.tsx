import {
  BadgeDocs,
  ButtonDocs,
  Elevation,
  Guidelines,
  Hero,
  InputDocs,
  LayoutDocs,
  PrimitiveColors,
  SectionDocs,
  SemanticTokens,
  SidebarNavigation,
  Typography,
} from "@/components/design-system";

export default function DesignSystemPage() {
  return (
    <main className="container-page py-8">
      <div className="flex flex-col lg:grid lg:grid-cols-[160px_minmax(0,1fr)] lg:gap-16">
        <SidebarNavigation />
        <article id="main-content" tabIndex={-1} className="min-w-0 space-y-24">
          <Hero />
          <PrimitiveColors />
          <SemanticTokens />
          <Typography />
          <LayoutDocs />
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
