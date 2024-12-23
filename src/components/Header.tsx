import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme); // Sync `data-theme` attribute with selected theme
  };

  const navigationItems = [
    { name: "Subscribers", href: "/category/subscribers" },
    { name: "Cybercrime", href: "/category/cybercrime" },
    { name: "Intel", href: "/category/intel" },
    { name: "News", href: "/category/news" },
    { name: "OSINT", href: "/category/osint" },
    { name: "Resources", href: "/category/resources" },
    { name: "Threat Feeds", href: "/category/threat-feeds" },
    { name: "Visuals", href: "/category/visuals" },
    { name: "Vulnerabilities", href: "/category/vulnerabilities" },
  ];

  return (
    <header className="bg-background text-foreground border-b border-gray-700 items-center ">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-3 container mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png" // Adjust to your logo path
            alt="Dark Web Navigator Logo"
            width={60}
            height={60}
            className={resolvedTheme === "dark" ? "block" : "hidden"}
          />
          <Image
            src="/logo.png" // Adjust to your logo path
            alt="Dark Web Navigator Logo"
            width={60}
            height={60}
            className={resolvedTheme === "light" ? "block" : "hidden"}
          />
        </Link>

        <div className="items-center space-x-4 flex">
          {/* Sign In / Subscribe */}
          <div className="hidden sm:flex items-center space-x-4">
            <Link href="/signin" className="text-sm font-semibold">
              Sign In
            </Link>
            <Link
              href="/subscribe"
              className="px-4 py-2 rounded-md font-semibold transition-colors duration-200"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--foreground)",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Subscribe
            </Link>
          </div>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex items-center text-sm space-x-2 focus:outline-none"
          >
            <span>{resolvedTheme === "dark" ? "Light" : "Dark"}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {resolvedTheme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                  />
                </svg>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-700 bg-background">
        <ul className="flex justify-center items-center space-x-4 px-4 py-3 container mx-auto overflow-auto">
          {navigationItems.map((item) => (
            <li
              key={item.name}
              className="whitespace-nowrap px-3 py-2 rounded-lg hover:bg-secondary hover:text-highlight transition-colors duration-200"
            >
              <Link
                href={item.href}
                className="text-base font-semibold text-foreground hover:text-accent"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
