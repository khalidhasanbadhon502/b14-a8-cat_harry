"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { toast } from "sonner";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "About Us", href: "/about" },
  { label: "Dashboard", href: "/" },
];

const popularCategories = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

const legalLinks = [
  { label: "Terms of Service", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="text-muted-foreground transition-colors hover:text-foreground"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-4"
        fill="currentColor"
        aria-hidden
      >
        {children}
      </svg>
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.7fr_1fr_1fr_1.5fr]">
          <div>
            <Image
              src="/images/studiospace-logo-for-dark-theme.png"
              alt="StudioSpace"
              width={1800}
              height={480}
              style={{ width: "auto" }}
              className="h-8 w-auto"
            />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Book inspiring creative spaces by the hour. Transparent pricing.
              Endless legacies. Built for creators, trusted by hosts.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialLink href="#" label="X">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </SocialLink>
              <SocialLink href="#" label="Instagram">
                <rect
                  x="2.75"
                  y="2.75"
                  width="18.5"
                  height="18.5"
                  rx="5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                />
                <circle cx="17.4" cy="6.6" r="1.35" />
              </SocialLink>
              <SocialLink href="#" label="YouTube">
                <rect
                  x="2.5"
                  y="5.25"
                  width="19"
                  height="13.5"
                  rx="4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                />
                <path d="M10.2 9.3v5.4L14.9 12z" />
              </SocialLink>
              <SocialLink href="#" label="LinkedIn">
                <path d="M6.94 5a2 2 0 1 1-4-.002A2 2 0 0 1 6.94 5zM7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z" />
              </SocialLink>
              <SocialLink href="#" label="Facebook">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.6c-.3-.04-1.3-.13-2.47-.13-2.44 0-4.11 1.49-4.11 4.23V9.9H7.4V13h2.72v8z" />
              </SocialLink>
            </div>
          </div>

          <nav aria-label="Quick links">
            <h2 className="text-sm font-semibold text-foreground">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Popular categories">
            <h2 className="text-sm font-semibold text-foreground">
              Popular Categories
            </h2>
            <ul className="mt-4 space-y-2.5 text-muted-foreground">
              {popularCategories.map((category) => (
                <li key={category}>
                  <Link
                    href="/studios"
                    className="text-sm transition-colors hover:text-foreground"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Stay in the Loop
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              New spaces, host tips and creator offers, once a month.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                event.currentTarget.reset();
                toast.success("You are subscribed. See you next month!");
              }}
              className="mt-4 flex max-w-xs"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Your email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Your email address"
                className="h-10 min-w-0 flex-1 rounded-l-lg border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-amber-400/50"
              />
              <button
                type="submit"
                className="h-10 shrink-0 rounded-r-lg bg-amber-400 px-4 text-sm font-semibold text-black transition-colors hover:bg-amber-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 StudioSpace. All rights reserved.</span>
          <div className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
