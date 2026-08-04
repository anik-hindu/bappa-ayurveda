"use client";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Quiz", href: "/quiz" },
  { label: "About", href: "/#about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    const timeout = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Scrolled state for shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "z-navbar sticky top-0",
        "w-full bg-bg-page",
        "transition-shadow duration-[250ms]",
        scrolled && "shadow-card",
      )}
    >
      <div className="container-page">
        <nav
          aria-label="Main navigation"
          className="flex h-16 items-center justify-between md:h-20"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="Bappa Ayurveda — Home"
            className="flex items-center gap-2"
          >
            <Image
              src="/images/logo.jpeg"
              alt="Bappa Ayurveda"
              width={40}
              height={40}
              className="h-10 w-auto rounded-sm mix-blend-multiply"
              priority
            />
            <span className="hidden font-display text-xl text-text-primary sm:block">
              Bappa Ayurveda
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden items-center gap-8 md:flex" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "font-body text-nav font-medium",
                    "transition-colors duration-[150ms]",
                    "relative pb-0.5",
                    "after:absolute after:bottom-0 after:left-0",
                    "after:h-px after:w-0 after:bg-text-accent",
                    "after:transition-[width] after:duration-[250ms]",
                    "hover:text-text-accent hover:after:w-full",
                    pathname === link.href
                      ? "font-semibold text-text-accent after:w-full"
                      : "text-text-body",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="https://amazon.in" external size="sm">
              Shop Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              "md:hidden",
              "flex h-10 w-10 items-center justify-center",
              "rounded-[var(--radius-btn)]",
              "text-text-primary",
              "transition-colors duration-[150ms]",
              "hover:bg-bg-hover",
            )}
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        aria-label="Mobile navigation"
        className={cn(
          "md:hidden",
          "overflow-hidden",
          "border-t border-border-subtle",
          "bg-bg-page",
          "transition-all duration-[300ms]",
          menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container-page space-y-1 py-6">
          <ul role="list" className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block px-3 py-3",
                    "font-body text-[length:var(--text-nav)] font-medium",
                    "rounded-btn",
                    "transition-colors duration-[150ms]",
                    pathname === link.href
                      ? "bg-bg-hover text-text-accent"
                      : "text-text-body hover:bg-bg-hover hover:text-text-primary",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-border-subtle pt-4">
            <Button href="https://amazon.in" external fullWidth size="sm">
              Shop SHUKRAVITA on Amazon
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
