import Link from "next/link";
import Image from "next/image";
import { Post } from "@/interfaces";
import { urlFor } from "@/utils/imageBuilder";
import { formateDate } from "@/utils/formatDate";

interface PostCardProps {
  post: Post;
  layout?: "vertical" | "horizontal"; // Toggle layout
  size?: "small" | "medium" | "large"; // Card size
}

export default function PostCard({
  post,
  layout = "vertical",
  size = "medium",
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
      className={`bg-background p-3 sm:p-4 m-3 sm:m-4 rounded-lg shadow-md flex ${
        layout === "horizontal" ? "flex-row" : "flex-col"
      } ${size === "large" ? "" : "border border-gray-700"} 
      hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-out`}
    >
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${imageWrapperStyles} rounded-lg`}
      >
        {post.image ? (
          <Image
            src={urlFor(post.image).url()}
            alt={post.title}
            layout="fill"
            objectFit={size === "small" ? "contain" : "cover"}
            className="rounded-lg transform hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-800 text-gray-400 rounded-lg">
            No Image Available
          </div>
        )}
      </div>

      {/* Content Section */}
      <div
        className={`${contentWrapperStyles} ${
          size === "large" ? "text-center" : "text-left"
        }`}
      >
        {/* Category */}
        <Link href={`/category/${post.category.slug.current}`}>
          <p className="text-xs sm:text-sm font-semibold text-highlight uppercase tracking-wide">
            {post.category.title}
          </p>
        </Link>

        {/* Title */}
        <Link href={`/${post.slug.current}`}>
          <h3
            className={`text-foreground hover:underline mt-1 sm:mt-2 ${
              size === "large"
                ? "text-lg sm:text-3xl font-bold"
                : size === "medium"
                  ? "text-base sm:text-xl font-semibold"
                  : "text-sm sm:text-base font-medium"
            } line-clamp-3`}
          >
            {post.title}
          </h3>
        </Link>

        {/* Author and Date */}
        <div className="mt-2 sm:mt-3 flex flex-col">
          <p className="text-sm sm:text-l  text-gray-400 uppercase">
            {post.author.name}
          </p>
          <p className="text-xs sm:text-sm text-gray-500">
            {formateDate(post.publishedAt)}
          </p>
        </div>
      </div>
    </article>
  );
}
