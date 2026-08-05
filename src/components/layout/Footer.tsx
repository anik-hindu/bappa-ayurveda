import Image from "next/image";
import Link from "next/link";

const footerLinks = {
  navigate: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Quiz", href: "/quiz" },
  ],
  shop: [
    {
      label: "SHUKRAVITA on Amazon",
      href: "https://amazon.in",
      external: true,
    },
    {
      label: "SHUKRAVITA on Flipkart",
      href: "https://flipkart.com",
      external: true,
    },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

const credibility = ["DPIIT Recognized", "AYUSH Licensed", "GMP Certified"];

export default function Footer() {
  return (
    <footer className="bg-bg-inverse text-text-inverse" role="contentinfo">
      {/* Credibility Bar */}
      <div className="border-b border-[rgba(247,243,237,0.1)]">
        <div className="container-page">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-4">
            {credibility.map((item, index) => (
              <div key={item} className="flex items-center gap-3">
                <span className="font-body text-[length:var(--text-caption)] font-medium tracking-wider text-text-inverse/70 uppercase">
                  {item}
                </span>
                {index < credibility.length - 1 && (
                  <span
                    className="h-3 w-px bg-text-accent/40"
                    aria-hidden="true"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-page py-16">
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
                className="h-9 w-auto rounded-sm"
              />
              <span className="font-display text-xl text-text-inverse">
                Bappa Ayurveda
              </span>
            </Link>
            <p className="max-w-xs font-body text-[length:var(--text-caption)] leading-relaxed text-text-inverse/60">
              Modernizing classical Ayurveda with scientific validation, modern
              branding, and technology.
            </p>
          </div>

          {/* Navigate Column */}
          <div>
            <h3 className="mb-5 font-body text-[length:var(--text-label)] font-semibold tracking-widest text-text-inverse/40 uppercase">
              Navigate
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.navigate.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[length:var(--text-caption)] text-text-inverse/70 transition-colors duration-[150ms] hover:text-text-inverse"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="mb-5 font-body text-[length:var(--text-label)] font-semibold tracking-widest text-text-inverse/40 uppercase">
              Shop
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[length:var(--text-caption)] text-text-inverse/70 transition-colors duration-[150ms] hover:text-text-inverse"
                  >
                    {link.label} ↗
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="mb-5 font-body text-[length:var(--text-label)] font-semibold tracking-widest text-text-inverse/40 uppercase">
              Legal
            </h3>
            <ul className="space-y-3" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[length:var(--text-caption)] text-text-inverse/70 transition-colors duration-[150ms] hover:text-text-inverse"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(247,243,237,0.08)]">
        <div className="container-page">
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <p className="font-body text-[length:var(--text-caption)] text-text-inverse/40">
              © {new Date().getFullYear()} SPRTA Ayurenigma Private Limited. All
              rights reserved.
            </p>
            <p className="font-body text-[length:var(--text-caption)] text-text-inverse/40">
              DIPP247782
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
