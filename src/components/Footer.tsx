import React from "react";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://twitter.com/DarkWebInformer",
    label: "Twitter",
    icon: "X", // Text-based icon
    ariaLabel: "Twitter",
  },
  {
    href: "https://infosec.exchange/@DarkWebInformer",
    label: "Mastodon",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-mastodon text-white"
        viewBox="0 0 16 16"
      >
        <path d="..." />
      </svg>
    ),
    ariaLabel: "Mastodon",
  },
  {
    href: "https://youtube.com/@DarkWebInformer",
    label: "YouTube",
    icon: "YT",
    ariaLabel: "YouTube",
  },
  {
    href: "https://www.linkedin.com/company/darkwebinformer/",
    label: "LinkedIn",
    icon: "In",
    ariaLabel: "LinkedIn",
  },
  {
    href: "/rss",
    label: "RSS",
    icon: "RSS",
    ariaLabel: "RSS",
  },
];

const navLinks = [
  { href: "/canary", label: "Canary" },
  { href: "/changelog", label: "Changelog" },
  { href: "/donations", label: "Donations" },
  { href: "/pgp", label: "PGP Key" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/stats", label: "Stats" },
  { href: "/support", label: "Support" },
  { href: "/terms-of-service", label: "Terms of Service" },
  { href: "/transparency", label: "Transparency Report" },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground py-6">
      <div className="container mx-auto text-center space-y-6 max-w-screen-lg">
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-accent">Deep Web Navigator</h2>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-4">
          {socialLinks.map(({ href, icon, ariaLabel }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ariaLabel}
              className="p-2 bg-primary rounded-full hover:bg-accent transition-colors duration-200"
            >
              <span className="text-white">{icon}</span>
            </a>
          ))}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium hover:text-highlight transition-colors duration-200"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Deep Web Navigator - Cyber Threat
          Intelligence. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
