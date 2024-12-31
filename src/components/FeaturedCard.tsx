import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Post } from "@/interfaces";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import { truncateUrl } from "@/utils/truncate";

interface PostCardProps {
  post: Post;
  expandedPost: string | null;
  onToggleExpand: (slug: string) => void;
  path?: string;
}

const FeaturedCard: React.FC<PostCardProps> = ({
  post,
  expandedPost,
  onToggleExpand,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null); // Track the copied link index

  // Function to copy the link to the clipboard
  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
    });
  };

  return (
    <li
      key={post.slug.current}
      className="bg-gradient-to-r p-3 mb-4 rounded-md hover:scale-105 transition-transform"
      style={{
        background:
          "linear-gradient(to right, rgb(29 78 216), rgb(30 58 138 ))",
      }}
    >
      <div className={"flex items-center justify-between"}>
        <div className="flex items-center space-x-2">
          <Link
            href={`/${post.slug.current}`}
            className="text-sm hover:text-gray-300 truncate"
          >
            {post.title}
          </Link>

          {/* Display cryptocurrency logos using next/image for optimization */}
          {post.cryptocurrency?.map((currency) => (
            <div key={currency} className="relative w-5 h-5">
              <Image
                src={`/images/logos/${currency.toLowerCase()}.png`}
                alt={`${currency} logo`}
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => onToggleExpand(post.slug.current)}
          className="ml-2"
        >
          <ChevronDownIcon
            className={`h-5 w-5 transition-transform ${expandedPost === post.slug.current ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {expandedPost === post.slug.current && (
        <div>
          {/* Display Market Links if available */}
          {post.links && post.links.length > 0 ? (
            <div className="mt-4 space-y-4">
              {post.links.map((linkObj, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm truncate w-60 text-highlight">
                    {truncateUrl(linkObj.url)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(linkObj.url, index)}
                    className="flex items-center space-x-1 text-sm bg-green-700 p-1 px-2 rounded-md text-center"
                  >
                    <span>
                      {copiedIndex === index ? (
                        <CheckIcon className="w-5 h-5" />
                      ) : (
                        <ClipboardDocumentIcon className="w-5 h-5" />
                      )}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 mb-4 text-sm">{post.excerpt}</p>
          )}

          <div className="bg-green-700 p-2 mt-4 rounded-md text-center">
            <Link href={`/${post.slug.current}`} className="text-white">
              <div className="flex items-center justify-between px-6">
                <span className="text-sm">Read More</span>
                <span>
                  <ArrowRightIcon className="w-5 h-5" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </li>
  );
};

export default FeaturedCard;
