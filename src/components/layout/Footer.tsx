import { Section } from "@/components/ui";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  navigate: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "PIE", href: "/pie" },
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
};

export default function Footer() {
  return (
    <footer className="bg-bg-inverse text-text-inverse" role="contentinfo">
      {/* Main Footer */}
      <Section padding="sm" background="inverse">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="mb-4 flex items-center gap-2"
              aria-label="Bappa Ayurveda home"
            >
              <Image
                src="/images/logo.jpeg"
                alt="Bappa Ayurveda"
                width={36}
                height={36}
                className="size-9 rounded-card"
              />
              <span className="font-display text-xl text-text-inverse">
                Bappa Ayurveda
              </span>
            </Link>
            <p className="max-w-xs font-body text-caption leading-relaxed text-text-inverse/60">
              Modernizing classical Ayurveda with scientific validation, modern
              branding, and technology.
            </p>
          </div>

          {/* Navigate Column */}
          <div>
            <h3 className="mb-5 font-body text-label font-semibold tracking-widest text-text-inverse/40 uppercase">
              Navigate
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.navigate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-caption text-text-inverse/70 transition-colors duration-(--duration-fast) hover:text-text-inverse"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="mb-5 font-body text-label font-semibold tracking-widest text-text-inverse/40 uppercase">
              Shop
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-body text-caption text-text-inverse/70 transition-colors duration-(--duration-fast) hover:text-text-inverse"
                  >
                    {link.label}
                    <ArrowTopRightOnSquareIcon className="size-3" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="mb-5 font-body text-label font-semibold tracking-widest text-text-inverse/40 uppercase">
              Legal
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-caption text-text-inverse/70 transition-colors duration-(--duration=fast) hover:text-text-inverse"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Bottom Bar */}
      <Section
        background="inverse"
        padding="sm"
        className="border-t border-[rgba(247,243,237,0.08)]"
      >
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center sm:text-left text-caption text-text-inverse/40">
            &copy; {new Date().getFullYear()} SPRTA Ayurenigma Private Limited.
            All rights reserved.
          </p>
          <p className="font-body text-caption text-text-inverse/40">
            DPIIT Recognition No. DIPP247782
          </p>
        </div>
      </Section>
    </footer>
  );
}
