import type { NavLink } from "@/types";

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
] as const;

export const footerLinks: {
  navigate: NavLink[];
  shop: NavLink[];
  // legal: NavLink[];
  social: NavLink[];
  developer: NavLink;
} = {
  navigate: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Authors", href: "/authors" },
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

  // legal: [
  //   { label: "Privacy Policy", href: "/privacy" },
  //   { label: "Terms of Use", href: "/terms" },
  // ],

  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/bappa-ayurveda/",
      external: true,
    },
  ],

  developer: {
    label: "Anik Saha",
    href: "https://github.com/anik-hindu",
    external: true,
  },
};
