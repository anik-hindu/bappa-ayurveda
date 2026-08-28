"use client";

import { AnnouncementBar } from "@/components/home/";
import { Button } from "@/components/ui";
import { navLinks } from "@/data/links";
import useScrolled from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const scrolled = useScrolled();

  

  // Close menu on route change
  useEffect(() => {
    const timeout = setTimeout(() => setMenuOpen(false), 0);
    return () => clearTimeout(timeout);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const isActiveLink = (href: string) => {
    const path = href.split("#")[0];

    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      {isActiveLink("/") && <AnnouncementBar />}
      <header
        className={cn(
          "sticky top-0 z-(--z-navbar)",
          "w-full bg-bg-page",
          "transition-shadow duration-(--duration-normal)",
          scrolled && "shadow-card",
        )}
      >
        <div className="container-page">
          <nav
            aria-label="Main navigation"
            className={cn(
              "flex items-center justify-between",
              "transition-all duration-(--duration-normal)",
              scrolled ? "min-h-16 py-2" : "min-h-20 py-4",
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Bappa Ayurveda — Home"
              className={cn(
                "flex items-center gap-2",
                "transition-all duration-(--duration-normal)",
                scrolled && "gap-0",
              )}
            >
              <Image
                src="/images/logo.jpeg"
                alt=""
                width={88}
                height={80}
                className={cn(
                  "hidden h-20 w-22 shrink-0 rounded-sm object-cover mix-blend-multiply md:block",
                  "transition-all duration-(--duration-normal)",
                  scrolled && "block h-10 w-12",
                )}
                priority
              />

              <span
                className={cn(
                  "font-display text-xl font-bold text-text-primary md:hidden",
                  scrolled && "hidden",
                )}
              >
                Bappa Ayurveda
              </span>
            </Link>

            {/* Desktop Links */}
            <ul className="hidden items-center gap-8 md:flex" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActiveLink(link.href) ? "page" : undefined}
                    className={cn(
                      "font-body text-nav font-medium",
                      "transition-colors duration-(--duration-fast)",
                      "relative pb-0.5",
                      "after:absolute after:bottom-0 after:left-0",
                      "after:h-px after:w-0 after:bg-text-accent",
                      "after:transition-[width] after:duration-(--duration-normal)",
                      "hover:text-text-accent hover:after:w-full",
                      isActiveLink(link.href)
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
              <Button href="https://amzn.in/d/0irbMWo1" external size="sm">
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
                "rounded-btn",
                "text-text-primary",
                "transition-colors duration-(--duration-fast)",
                "hover:bg-bg-hover active:bg-bg-hover",
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
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className={cn(
            "md:hidden",
            "overflow-hidden",
            "border-t border-border-subtle",
            "bg-bg-page",
            "transition-all duration-300",
            menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="container-page space-y-1 py-6">
            <ul role="list" className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActiveLink(link.href) ? "page" : undefined}
                    className={cn(
                      "block px-3 py-3",
                      "font-body text-nav font-medium",
                      "rounded-btn",
                      "transition-colors duration-(--duration-fast)",
                      isActiveLink(link.href)
                        ? "bg-bg-hover text-text-accent"
                        : "text-text-body hover:bg-bg-hover hover:text-text-primary active:bg-bg-hover active:text-text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="border-t border-border-subtle pt-4">
              <Button
                href="https://amzn.in/d/0irbMWo1"
                external
                fullWidth
                size="sm"
              >
                Shop SHUKRAVITA on Amazon
              </Button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
