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
  MoonIcon,
  SunIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import SubscribeModal from "./SubscribeModal";
import { SearchResult } from "@/interfaces";
import ResultCard from "./ResultCard";

const categories: category[] = [
  {
    title: "Insight",
    slug: "insights",
    icon: <InformationCircleIcon className="h-5 w-5" />,
  },
  {
    title: "DDoS Attacks",
    slug: "ddos-attacks",
    icon: <InformationCircleIcon className="h-5 w-5" />,
  },
  {
    title: "Leaks",
    slug: "leaks",
    icon: <InformationCircleIcon className="h-5 w-5" />,
  },
  {
    title: "Vulnerabilities",
    slug: "vulnerabilities",
    icon: <AcademicCapIcon className="h-5 w-5" />,
  },
  {
    title: "Arrests",
    slug: "arrests",
    icon: <InformationCircleIcon className="h-5 w-5" />,
  },
  {
    title: "Technology",
    slug: "technology",
    icon: <NewspaperIcon className="h-5 w-5" />,
  },

  {
    title: "Data Breaches",
    slug: "data-breaches",
    icon: <ShieldExclamationIcon className="h-5 w-5" />,
  },
  {
    title: "Guides",
    slug: "guides",
    icon: <InformationCircleIcon className="h-5 w-5" />,
  },
];

interface category {
  title: string;
  slug: string;
  icon: JSX.Element;
}
const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: <HomeIcon className="h-5 w-5" />,
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
    name: "News",
    href: "#",
    icon: <NewspaperIcon className="h-5 w-5" />,
  },
];

export default function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false); // Dropdown state
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  // State and API call in Header component
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setShowResults(true);

    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data: SearchResult[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="bg-background text-foreground items-center">
      {/* Top Section */}
      <div className="flex items-center justify-between px-4 py-3 container mx-auto lg:gap-6">
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
        <div className="hidden lg:block relative w-full max-w-2xl">
          {/* Search Form */}
          <form className="relative" onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search posts..."
              />
              <button
                type="submit"
                className="absolute right-1 bottom-1 bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </form>

          {/* Expandable Results Section */}
          <div
            className={`absolute z-10 left-0 w-full mt-2 bg-gray-100 dark:bg-gray-800 transition-all duration-300 overflow-hidden ${
              showResults ? "max-h-[500px] p-4" : "max-h-0 p-0"
            }`}
            style={{ borderRadius: "0 0 8px 8px" }}
          >
            {/* Collapse Button */}
            {showResults && (
              <div className="text-right">
                <button
                  onClick={() => setShowResults(false)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 text-sm mb-2"
                >
                  Collapse Results
                </button>
              </div>
            )}
            {loading ? (
              <p className="text-center text-gray-500 dark:text-gray-300">
                Loading...
              </p>
            ) : searchResults.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <ResultCard key={result.slug} result={result} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-300">
                {`No results found for "${query}".`}
              </p>
            )}
          </div>
        </div>

        <div className="items-center space-x-4 flex">
          {/* Subscribe Button */}
          <SubscribeModal />

          {/* Support Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setShowDropdown(true)}
            // onMouseLeave={() => setShowDropdown(false)} // Hide dropdown on mouse leave
          >
            {/* Button */}
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center text-sm font-semibold text-white bg-gray-600 hover:bg-gray-700 transition-all px-4 py-2 rounded-lg"
            >
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
            <span className="hidden">
              {resolvedTheme === "dark" ? "Light" : "Dark"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {resolvedTheme === "dark" ? (
                <SunIcon className="size-6" />
              ) : (
                <MoonIcon className="size-6" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative border-y border-gray-700 bg-background">
        <ul className="flex items-center lg:justify-evenly space-x-4 px-4 container mx-auto overflow-x-auto">
          {navigationItems.map((item) => {
            const isActive = router.asPath === item.href;
            return (
              <li
                key={item.name}
                className={`whitespace-nowrap h-full px-3 py-5 transition-colors duration-200 ${
                  isActive
                    ? "border-b-2 border-highlight"
                    : "hover:border-highlight hover:border-b-2"
                }`}
                onMouseEnter={() =>
                  item.name === "News" &&
                  setShowCategoriesDropdown(!showCategoriesDropdown)
                }
                onClick={() =>
                  item.name === "News" &&
                  setShowCategoriesDropdown(!showCategoriesDropdown)
                }
              >
                <Link
                  href={item.href}
                  className={`text-xs sm:text-base font-semibold ${
                    isActive ? "text-highlight" : "text-foreground"
                  } hover:text-highlight flex items-center`}
                >
                  {item.icon}
                  <span className="ml-2">{item.name.toUpperCase()}</span>
                  {item.name === "News" && (
                    <ChevronDownIcon
                      className={`h-4 w-4 ml-2 transition-transform ${
                        showCategoriesDropdown ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>
                {item.name === "News" &&
                  showCategoriesDropdown &&
                  categories.length > 0 && (
                    <div
                      className="absolute top-full left-0 w-full mt-2 px-4"
                      onMouseEnter={() => setShowCategoriesDropdown(true)}
                      onMouseLeave={() => setShowCategoriesDropdown(false)}
                    >
                      <ul
                        className="container sm:mx-auto bg-white shadow-md rounded-md py-4 z-10000 dark:bg-gray-700 dark:text-white grid lg:grid-cols-3 grid-cols-2 gap-4 px-4"
                        style={{ position: "relative", zIndex: 999999 }}
                      >
                        {categories.map((category) => (
                          <li
                            key={category.slug}
                            className="flex items-center overflow-x-hidden"
                          >
                            <Link
                              href={`/category/${category.slug}`}
                              className="flex items-center px-4 py-2 text-sm sm:text-base text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              <span className="mr-2">{category.icon}</span>
                              <span className="truncate">{category.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
