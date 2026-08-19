import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const footerLinks: {
  navigate: NavLink[];
  shop: NavLink[];
  legal: NavLink[];
} = {
  navigate: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Aboout", href: "/about" },
    { label: "FAQs", href: "/faq" },
  ],
  shop: [
    {
      label: "SHUKRAVITA on Amazon",
      href: "https://amzn.in/d/0irbMWo1",
      external: true,
    },
    {
      label: "SHUKRAVITA on Flipkart",
      href: "https://dl.flipkart.com/s/SBDbjNuuuN",
      external: true,
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
} as const;
