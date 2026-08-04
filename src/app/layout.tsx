import "@/styles/globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Link from "next/link";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bappa Ayurveda — Rooted in Science, Backed by Tradition",
    template: "%s | Bappa Ayurveda",
  },
  description:
    "DPIIT recognized, AYUSH licensed Ayurvedic wellness brand. " +
    "Discover SHUKRAVITA — premium men's vitality supplement rooted " +
    "in classical Ayurvedic science.",
  metadataBase: new URL("https://bappaayurveda.com"),
  openGraph: {
    siteName: "Bappa Ayurveda",
    locale: "en_IN",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning>
        <Link href="#main-content" className="skip-link">
          Skip to main content
        </Link>
        {children}
      </body>
    </html>
  );
}
