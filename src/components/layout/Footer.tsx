import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

import { footerLinks } from "@/data/links";

const columnHeadingStyles =
  "mb-4 font-body text-label font-semibold uppercase tracking-[0.14em] text-text-inverse/70";

const footerLinkStyles =
  "inline-flex min-h-11 items-center gap-2 rounded-btn font-body text-caption text-text-inverse/80 transition-colors duration-(--duration-fast) ease-default hover:text-text-inverse focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-inverse motion-reduce:transition-none";

function ExternalIcon() {
  return (
    <>
      <ArrowTopRightOnSquareIcon
        aria-hidden="true"
        className="size-3.5 shrink-0 text-text-inverse/50"
      />
      <span className="sr-only">(opens in a new tab)</span>
    </>
  );
}

export default function Footer() {
  return (
    <footer className="bg-bg-inverse text-text-inverse">
      {/* Main footer */}
      <div className="border-t border-text-inverse/10">
        <div className="container-page py-section-md-mobile lg:py-section-lg-desktop">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(2,minmax(0,1fr))] lg:gap-16">
            {/* Brand */}
            <div className="max-w-md sm:col-span-2 lg:col-span-1">
              <Link
                href="/"
                aria-label="Bappa Ayurveda home"
                className="inline-flex items-center gap-3 rounded-card focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-inverse"
              >
                <Image
                  src="/images/logo.jpeg"
                  alt=""
                  width={48}
                  height={48}
                  sizes="48px"
                  className="size-12 rounded-card object-cover"
                />

                <span className="font-display text-2xl leading-none text-text-inverse">
                  Bappa Ayurveda
                </span>
              </Link>

              <p className="mt-7 font-display text-sub leading-sub text-text-inverse/95">
                Classical Roots.
                <br />
                Clinical Credibility.
              </p>

              <p className="mt-5 max-w-sm font-body text-caption leading-relaxed text-text-inverse/70">
                Modernizing classical Ayurveda through responsible education,
                scientific validation, and contemporary digital experiences.
              </p>

              {/* Social links */}
              {footerLinks.social.length > 0 && (
                <div className="mt-7">
                  <h2 className="sr-only">Follow Bappa Ayurveda</h2>

                  <ul className="flex flex-wrap gap-3">
                    {footerLinks.social.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          className={footerLinkStyles}
                        >
                          <span>{link.label}</span>

                          {link.external && <ExternalIcon />}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Explore */}
            <nav aria-labelledby="footer-explore-heading">
              <h2 id="footer-explore-heading" className={columnHeadingStyles}>
                Explore
              </h2>

              <ul className="space-y-1">
                {footerLinks.navigate.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={footerLinkStyles}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Shop */}
            <nav aria-labelledby="footer-shop-heading">
              <h2 id="footer-shop-heading" className={columnHeadingStyles}>
                Shop
              </h2>

              <ul className="space-y-1">
                {footerLinks.shop.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={footerLinkStyles}
                    >
                      <span>{link.label}</span>

                      {link.external && <ExternalIcon />}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-text-inverse/10">
        <div className="container-page py-6">
          <div className="flex flex-col gap-4">
            {/* Legal information */}
            <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <p className="font-body text-caption leading-relaxed text-text-inverse/60">
                © {new Date().getFullYear()} SPRTA Ayurenigma Private Limited.
                All rights reserved.
              </p>

              <p className="font-body text-caption leading-relaxed text-text-inverse/50">
                DPIIT Recognition No. DIPP247782
              </p>
            </div>

            {/* Developer attribution */}
            <div className="border-t border-text-inverse/10 pt-4">
              <p className="font-body text-caption text-text-inverse/50">
                Website designed &amp; developed by{" "}
                <Link
                  href={footerLinks.developer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm text-text-inverse/75 underline decoration-text-inverse/30 underline-offset-4 transition-colors duration-(--duration-fast) ease-default hover:text-text-inverse hover:decoration-text-inverse/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-text-inverse motion-reduce:transition-none"
                >
                  {footerLinks.developer.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
