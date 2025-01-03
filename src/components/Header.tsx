import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import {
  AcademicCapIcon,
  HomeIcon,
  NewspaperIcon,
  UsersIcon,
  ShieldExclamationIcon,
  ShoppingBagIcon,
  ChevronDownIcon, // Import Chevron Down Icon from Heroicons
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import SubscribeModal from "./SubscribeModal";

export default function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const navigationItems = [
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      name: "News",
      href: "/category/news",
      icon: <NewspaperIcon className="h-5 w-5" />,
    },
    {
      name: "Dark Web Markets",
      href: "/category/top-dark-web-markets",
      icon: <ShieldExclamationIcon className="h-5 w-5" />,
    },
    {
      name: "Forums",
      href: "/category/deep-web-forums",
      icon: <UsersIcon className="h-5 w-5" />,
    },
    {
      name: "Darknet Vendors",
      href: "/category/darknet-vendors-shop",
      icon: <ShoppingBagIcon className="h-5 w-5" />,
    },
    {
      name: "Vulnerabilities",
      href: "/category/vulnerabilities",
      icon: <AcademicCapIcon className="h-5 w-5" />,
    },
  ];

  return (
    <header className="bg-background text-foreground items-center">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-3 container mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Dark Web Navigator Logo"
            width={60}
            height={60}
            className={resolvedTheme === "dark" ? "block" : "hidden"}
          />
          <Image
            src="/logo.png"
            alt="Dark Web Navigator Logo"
            width={60}
            height={60}
            className={resolvedTheme === "light" ? "block" : "hidden"}
          />
        </Link>

        <div className="items-center space-x-4 flex">
          {/* Subscribe Button */}
          <SubscribeModal />

          {/* Support Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setShowDropdown(true)}
          >
            {/* Button */}
            <button className="flex items-center text-sm font-semibold text-white bg-gray-600 hover:bg-gray-700 transition-all px-4 py-2 rounded-lg">
              Support
              <ChevronDownIcon
                className={`h-4 w-4 ml-2 transition-transform ${
                  showDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className="absolute right-0 mt-2 bg-white shadow-md rounded-md py-2 w-48 z-10 dark:bg-gray-700 dark:text-white"
                onMouseLeave={() => setShowDropdown(false)}
              >
                <ul className="text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <Link
                      href="/contact-us"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/get-listed"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Get Listed
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex items-center text-sm space-x-2 focus:outline-none"
          >
            <span className="hidden lg:block">
              {resolvedTheme === "dark" ? "Light" : "Dark"}
            </span>
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
      <nav className="border-y border-gray-700 bg-background">
        <ul className="flex items-center lg:justify-evenly space-x-4 px-4 container mx-auto overflow-x-auto">
          {navigationItems.map((item) => {
            const isActive = router.asPath === item.href;
            return (
              <li
                key={item.name}
                className={`whitespace-nowrap h-full px-3 py-5  transition-colors duration-200 ${
                  isActive
                    ? "border-b-2 border-highlight"
                    : "hover:border-highlight hover:border-b-2"
                }`}
              >
                <Link
                  href={item.href}
                  className={`text-xs sm:text-base font-semibold ${
                    isActive ? "text-highlight" : "text-foreground"
                  } hover:text-highlight flex items-center`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name.toUpperCase()}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
