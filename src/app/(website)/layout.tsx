import {
  CredibilityBar,
  Footer,
  Navbar,
  ScrollToTop,
} from "@/components/layout";
import Link from "next/link";

export default function RootLayout({
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
      {children}
      <CredibilityBar />
      <Footer />
      <ScrollToTop />
    </>
  );
}
