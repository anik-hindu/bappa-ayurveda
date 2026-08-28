"use client";

import { AnnouncementBar } from "@/components/home";
import { Button } from "@/components/ui";
import { navLinks } from "@/data/links";
import useScrolled from "@/hooks/useScrolled";
import { cn } from "@/lib/cn";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SHOP_URL = "https://amzn.in/d/0irbMWo1";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const scrolled = useScrolled();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);

  /*
   * Close the menu with Escape and return focus to the menu button.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      event.preventDefault();
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  /*
   * Prevent background scrolling while the mobile navigation is open.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  /*
   * When the menu opens, move keyboard focus into the menu.
   *
   * When it closes, return focus to the menu button.
   */
  useEffect(() => {
    if (menuOpen) {
      firstMenuLinkRef.current?.focus();
    } else {
      menuButtonRef.current?.focus();
    }
  }, [menuOpen]);

  const isActiveLink = (href: string) => {
    const path = href.split("#")[0];

    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const toggleMenu = () => {
    setMenuOpen((current) => !current);
  };

  return (
    <>
      {isActiveLink("/") && <AnnouncementBar />}

      <header
        className={cn(
          "sticky top-0 z-(--z-navbar)",
          "w-full bg-bg-page",
          "transition-shadow duration-(--duration-normal)",
          "motion-reduce:transition-none",
          scrolled && "shadow-card",
        )}
      >
        <div className="container-page">
          <nav
            aria-label="Main navigation"
            className={cn(
              "flex items-center justify-between",
              "transition-[min-height,padding] duration-(--duration-normal)",
              "motion-reduce:transition-none",
              scrolled ? "min-h-16 py-2" : "min-h-20 py-4",
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Bappa Ayurveda — Home"
              className={cn(
                "flex items-center gap-2",
                "rounded-btn",
                "focus-visible:outline-2",
                "focus-visible:outline-offset-4",
                "transition-[gap] duration-(--duration-normal)",
                "motion-reduce:transition-none",
                scrolled && "gap-0",
              )}
            >
              <Image
                src="/images/logo.jpeg"
                alt=""
                width={88}
                height={80}
                priority
                sizes="(min-width: 768px) 88px, 0px"
                className={cn(
                  "hidden h-20 w-22 shrink-0",
                  "rounded-sm object-cover mix-blend-multiply",
                  "transition-[width,height] duration-(--duration-normal)",
                  "motion-reduce:transition-none",
                  "md:block",
                  scrolled && "h-10 w-12",
                )}
              />

              <span
                className={cn(
                  "font-display text-xl font-bold text-text-primary",
                  "md:hidden",
                  scrolled && "hidden",
                )}
              >
                Bappa Ayurveda
              </span>
            </Link>

            {/* Desktop navigation */}
            <ul role="list" className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => {
                const active = isActiveLink(link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative pb-0.5",
                        "font-body text-nav font-medium",
                        "text-text-body",
                        "transition-colors duration-(--duration-fast)",
                        "motion-reduce:transition-none",
                        "hover:text-text-accent",
                        "focus-visible:rounded-sm",
                        "after:absolute after:bottom-0 after:left-0",
                        "after:transition-[width] after:duration-(--duration-normal)",
                        "after:ease-default",
                        "motion-reduce:after:transition-none",
                        "relative pb-0.5",
                        "after:absolute after:bottom-0 after:left-0",
                        "after:h-px after:w-0 after:bg-text-accent",
                        "hover:after:w-full",
                        active && "font-semibold text-text-accent after:w-full",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button href={SHOP_URL} external size="sm">
                Shop Now
              </Button>
            </div>

            {/* Mobile menu toggle */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className={cn(
                "md:hidden",
                "flex h-11 w-11 items-center justify-center",
                "rounded-btn",
                "text-text-primary",
                "transition-colors duration-(--duration-fast)",
                "motion-reduce:transition-none",
                "hover:bg-bg-hover",
                "active:bg-bg-hover",
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

        {/* Mobile navigation */}
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen ? true : undefined}
          className={cn(
            "md:hidden",
            "grid overflow-hidden",
            "border-t border-border-subtle",
            "bg-bg-page",
            "transition-[grid-template-rows,opacity]",
            "duration-(--duration-normal)",
            "motion-reduce:transition-none",
            menuOpen
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="container-page space-y-1 py-6">
              <ul role="list" className="space-y-1">
                {navLinks.map((link, index) => {
                  const active = isActiveLink(link.href);

                  return (
                    <li key={link.href}>
                      <Link
                        ref={index === 0 ? firstMenuLinkRef : undefined}
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block min-h-11 rounded-btn px-3 py-3",
                          "font-body text-nav font-medium",
                          "text-text-body",
                          "transition-colors duration-(--duration-fast)",
                          "motion-reduce:transition-none",
                          "hover:bg-bg-hover hover:text-text-primary",
                          "active:bg-bg-hover active:text-text-primary",
                          "focus-visible:outline-2",
                          "focus-visible:outline-offset-2",
                          "focus-visible:outline-border-accent",
                          active && "bg-bg-hover text-text-accent",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="border-t border-border-subtle pt-4">
                <Button href={SHOP_URL} external fullWidth size="sm">
                  Shop SHUKRAVITA on Amazon
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
