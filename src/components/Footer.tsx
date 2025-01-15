import React from "react";
import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  // {
  //   href: "https://twitter.com/DarkWebnavigator",
  //   label: "Twitter",
  // },
  // {
  //   href: "https://youtube.com/@DarkWebnavigator",
  //   label: "YouTube",
  // },
  // {
  //   href: "https://www.linkedin.com/company/darkwebnavigator/",
  //   label: "LinkedIn",
  // },
  {
    href: "https://www.telegram.com/@darkwebnav/",
    label: "Telegram",
  },
  // {
  //   href: "https://www.instagram.com/@Darkwebnavigator/",
  //   label: "Instagram",
  // },
  // {
  //   href: "https://www.facebook.com/@Darkwebnavigator/",
  //   label: "Facebook",
  // },
];

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/category/top-dark-web-markets",
    label: "Featured Markets",
  },
  { href: "/category/deep-web-forums", label: "Forums" },
  { href: "/category/darknet-vendors-shop", label: "Vendors Shop" },
];

const supportLinks = [
  { href: "/contact-us", label: "Contact Us" },
  { href: "/get-listed", label: "Get Listed" },
];

const topDarkWebMarkets = [
  { href: "/anubis-market", label: "Anubis Market" },
  { href: "/abacus-market", label: "Abacus Market" },
  { href: "/drughub-market", label: "DrugHub Market" },
  { href: "/archetyp-market", label: "Archetyp Market" },
];

export default function Footer() {
  return (
    <footer className="py-8 border-t border-gray-700">
      <div className="px-8 py-3 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* About Section */}
        <div className="lg:col-span-2 lg:px-4">
          <Image
            src="/logo.png"
            alt="Dark Web Navigator Logo"
            width={60}
            height={60}
          />
          <p className="text-sm text-gray-4 leading-6">
            Darkwebnavigator is a resource hub for those seeking information on
            navigating the Dark Web, including access to hidden websites,
            darknet forums, and tools for private communication.
          </p>
        </div>

        {/* Quick Links Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {navLinks.map((l, index) => (
              <li key={index}>
                <Link href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Markets section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Top Dark Web Markets</h4>
          <ul className="space-y-2">
            {topDarkWebMarkets.map(
              (l, index) =>
                index < 4 && (
                  <li key={index}>
                    <Link href={l.href} className="hover:underline">
                      {l.label}
                    </Link>
                  </li>
                )
            )}
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            {supportLinks.map((l, index) => (
              <li key={index}>
                <Link href={l.href} className="hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Section */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex items-center space-x-1">
            {socialLinks.map((platform) => (
              <a
                key={platform.label}
                href={platform.href}
                aria-label={`${platform.label} social link`}
                className="p-2 rounded-full bg-gray-9 hover:bg-gray-7 transition"
              >
                <Image
                  src={`/images/icons/${platform.label.toLowerCase()}.svg`}
                  alt={platform.label}
                  className="w-6 h-6"
                  width={60}
                  height={60}
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-highlight text-gray-5">
        &copy; {new Date().getFullYear()} Dark Web Navigator. All rights
        reserved.
      </div>
    </footer>
  );
}
