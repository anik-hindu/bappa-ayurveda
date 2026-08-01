import "@/styles/globals.css";
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Bappa Ayurveda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
