import BadgeDocs from "@/components/design-system/BadgeDocs";
import ButtonDocs from "@/components/design-system/ButtonDocs";
import Elevation from "@/components/design-system/Elevation";
import Guidelines from "@/components/design-system/Guidelines";
import Hero from "@/components/design-system/Hero";
import InputDocs from "@/components/design-system/InputDocs";
import Layout from "@/components/design-system/Layout";
import PrimitiveColors from "@/components/design-system/PrimitiveColors";
import SectionDocs from "@/components/design-system/SectionDocs";
import SemanticTokens from "@/components/design-system/SemanticTokens";
import SidebarNavigation from "@/components/design-system/SidebarNavigation";
import Typography from "@/components/design-system/Typography";

export default function DesignSystemPage() {
  return (
    <main className="container-page py-16">
      <div className="flex flex-col lg:grid lg:grid-cols-[140px_minmax(0,1fr)] lg:gap-16">
        <SidebarNavigation />
        <article id="main-content" tabIndex={-1} className="min-w-0 space-y-24">
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
