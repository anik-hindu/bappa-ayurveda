import { Section } from "@/components/ui";
import { footerLinks } from "@/data/links";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const linkStyles =
  "inline-flex min-h-9 items-center gap-2 font-body text-caption text-text-inverse/90 transition-colors duration-(--duration-fast) hover:text-text-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-inverse";

const headingStyles =
  "mb-4 font-body text-label font-semibold tracking-[0.14em] text-text-inverse/80 uppercase";

export default function Footer() {
  return (
    <footer className="bg-bg-inverse text-text-inverse" role="contentinfo">
      <Section padding="sm" background="inverse">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 md:gap-x-10 md:gap-y-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              aria-label="Bappa Ayurveda home"
              className="group inline-flex items-center gap-3 rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-inverse"
            >
              <Image
                src="/images/logo.jpeg"
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-card object-cover"
              />

              <span className="font-display text-xl text-text-inverse">
                Bappa Ayurveda
              </span>
            </Link>

            <p className="mt-5 max-w-sm font-body text-caption leading-relaxed text-text-inverse/75">
              Modernizing classical Ayurveda with scientific validation, modern
              branding, and technology.
            </p>
          </div>

          {/* Navigate */}
          <nav aria-labelledby="footer-navigate">
            <h2 id="footer-navigate" className={headingStyles}>
              Navigate
            </h2>

            <ul className="space-y-1" role="list">
              {footerLinks.navigate.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkStyles}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Shop */}
          <nav aria-labelledby="footer-shop">
            <h2 id="footer-shop" className={headingStyles}>
              Shop
            </h2>

            <ul className="space-y-1" role="list">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkStyles}
                    aria-label={`${link.label} (opens in a new tab)`}
                  >
                    <span>{link.label}</span>

                    <ArrowTopRightOnSquareIcon
                      className="size-3.5 shrink-0 text-text-inverse/60"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-labelledby="footer-legal">
            <h2 id="footer-legal" className={headingStyles}>
              Legal
            </h2>

            <ul className="space-y-1" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkStyles}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Section>

      {/* Bottom Bar */}
      <div className="border-t border-[rgba(247,243,237,0.12)]">
        <Section background="inverse" padding="sm">
          <div className="text-center flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-body text-caption text-text-inverse/70">
              &copy; {new Date().getFullYear()} SPRTA Ayurenigma Private
              Limited. All rights reserved.
            </p>

            <p className="font-body text-caption text-text-inverse/55">
              DPIIT Recognition No. DIPP247782
            </p>
          </div>
        </Section>
      </div>
    </footer>
  );
}
