import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces";
import { urlFor } from "@/utils/imageBuilder";
import { formateDate } from "@/utils/formatDate";
import { UserIcon, CalendarIcon } from "@heroicons/react/24/outline";

interface PostCardProps {
  post: Post;
  layout?: "vertical" | "horizontal"; // Toggle layout
  size?: "small" | "medium" | "large"; // Card size
  noBorder?: boolean;
}

export default function PostCard({
  post,
  layout = "vertical",
  size = "medium",
  noBorder = false,
}: PostCardProps) {
  const sizeStyles = {
    small: "h-16 sm:h-20",
    medium: "h-32 sm:h-40",
    large: "h-32 sm:h-[500px]", // Adjusted for smaller screens
  };

  const imageWrapperStyles =
    layout === "horizontal"
      ? `w-1/3 ${sizeStyles[size]}`
      : `w-full ${sizeStyles[size]}`;
  const contentWrapperStyles =
    layout === "horizontal" ? "w-2/3 pl-2 sm:pl-4" : "w-full mt-2 sm:mt-4";

  return (
    <article
      className={`bg-background p-3 sm:p-4 m-2 flex ${
        layout === "horizontal"
          ? "flex-row-reverse border-t border-gray-700 gap-2"
          : `flex-col ${noBorder ? "border-t border-gray-700" : "border border-gray-700 rounded-lg shadow-md"}`
      } max-h-max`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${imageWrapperStyles} rounded-lg`}
      >
        {post.image ? (
          <Link href={`/${post.slug.current}`}>
            <Image
              src={urlFor(post.image).url()}
              alt={post.title}
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg transform hover:scale-110 transition-transform duration-500 ease-out"
              loading="lazy"
            />
          </Link>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-400 rounded-lg">
            No Image Available
          </div>
        )}
      </div>

      {/* Content Section */}
      <div
        className={`${contentWrapperStyles}  ${layout === "horizontal" ? "text-left" : "text-center"} overflow-hidden`}
      >
        {/* Title */}
        <Link href={`/${post.slug.current}`}>
          <h3
            className={`text-highlight hover:underline mt-1 sm:mt-2 text-base sm:text-lg font-semibold line-clamp-2`}
          >
            {post.title}
          </h3>
        </Link>

        {/* Category */}
        <Link href={`/category/${post.category.slug.current}`}>
          <p className="text-xs sm:text-xs uppercase tracking-wide text-gray-500">
            {post.category.title}
          </p>
        </Link>
        {/* Excerpt */}
        <p className="text-sm text-gray-400 mt-2 line-clamp-2">
          {post.excerpt}
        </p>
        {/* Author and Date - Moved under the Image Section for horizontal layout */}
        {layout === "horizontal" && (
          <div className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <p>{formateDate(post.publishedAt)}</p>
            </div>
          </div>
        )}
      </div>

      {/* For vertical layout, author and date stay below the content */}
      {layout === "vertical" && (
        <div className="mt-2 sm:mt-3 flex items-center text-xs sm:text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <UserIcon className="w-4 h-4 text-gray-500" />
            <Link
              href={`/author/${post.author.slug.current}`}
              className="text-gray-500"
            >
              {post.author.name}
            </Link>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <p>{formateDate(post.publishedAt)}</p>
          </div>
        </div>
      )}
    </article>
  );
}
