import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!siteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is not configured");
}

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bappa Ayurveda: Rooted in Science, Backed by Tradition",
    template: "%s | Bappa Ayurveda",
  },
  description:
    "Explore Ayurveda through educational and editorial content rooted in traditional knowledge.",
  applicationName: "Bappa Ayurveda",
  keywords: [
    "Ayurvedic supplement for men",
    "SHUKRAVITA",
    "Vajikarana formula",
    "men vitality Ayurveda",
    "Ashwagandha supplement India",
    "AYUSH licensed supplement",
    "classical Ayurveda",
    "Bappa Ayurveda",
  ],
  authors: [
    {
      name: "Shivansh Mishra",
      url: "/authors/shivansh-mishra",
    },
  ],
  creator: "Bappa Ayurveda",
  publisher: "SPRTA Ayurenigma Private Limited",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },
  openGraph: {
    title: "Bappa Ayurveda: Rooted in Science, Backed by Tradition",
    description:
      "Explore Ayurveda through educational and editorial content rooted in traditional knowledge.",
    siteName: "Bappa Ayurveda",
    url: siteUrl,
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bappa Ayurveda",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
