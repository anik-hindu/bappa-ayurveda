import ButtonDocs from "@/components/design-system/ButtonDocs";
import Guidelines from "@/components/design-system/Guidelines";
import Hero from "@/components/design-system/Hero";
import Layout from "@/components/design-system/Layout";
import PrimitiveColors from "@/components/design-system/PrimitiveColors";
import SemanticTokens from "@/components/design-system/SemanticTokens";
import Typography from "@/components/design-system/Typography";

export default function DesignSystemPage() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="container-page space-y-24 py-16"
    >
      <Hero />
      <PrimitiveColors />
      <SemanticTokens />
      <Typography />
      <Layout />
      <ButtonDocs />
      <Guidelines />
    </main>
  );
}
