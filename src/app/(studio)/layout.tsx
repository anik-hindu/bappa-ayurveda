import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Sanity Studio",
    template: "%s | Sanity Studio",
  },
  description: "Bappa Ayurveda content management system.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
