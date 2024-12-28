import Link from "next/link";
import { Post } from "@/interfaces";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

interface PostCardProps {
  post: Post;
  expandedPost: string | null;
  onToggleExpand: (slug: string) => void;
  path?: string;
}

const FeaturedCard: React.FC<PostCardProps> = ({
  post,
  // path = "top-dark-web-markets",
  expandedPost,
  onToggleExpand,
}) => {
  return (
    <li
      key={post.slug.current}
      onClick={() => onToggleExpand(post.slug.current)}
      className="bg-gradient-to-r p-3 mb-4 rounded-md hover:scale-105 transition-transform"
      style={{
        background:
          "linear-gradient(to right, rgb(29 78 216), rgb(30 58 138 ))",
        cursor: "pointer",
      }}
    >
      <div className={"flex items-center justify-between"}>
        <Link
          href={`/${post.slug.current}`}
          className="text-light hover:text-gray-300"
        >
          {post.title}
        </Link>
        <button
          onClick={() => onToggleExpand(post.slug.current)}
          className="ml-2 rounded-full bg-blue-800 p-2"
        >
          {expandedPost === post.slug.current ? (
            <ArrowUpIcon className="w-4 h-4 text-white" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {expandedPost === post.slug.current && (
        <div>
          <p className="mt-4 mb-4">{post.excerpt}</p>
          <div className="bg-green-700 p-2 rounded-md text-center">
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
