import {
  CredibilityBar,
  Footer,
  Navbar,
  ScrollToTop,
} from "@/components/layout";
import Link from "next/link";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Link href="#main-content" className="skip-link">
        Skip to main content
      </Link>
      <Navbar />
      <main id="main-content">{children}</main>
      <CredibilityBar />
      <Footer />
      <ScrollToTop />
    </>
  );
}
