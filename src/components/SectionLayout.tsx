import Link from "next/link";
import PostCard from "@/components/PostCard";
import { SectionLayoutProps } from "@/interfaces";

export default function SectionLayout({
  title,
  seeAllLink,
  posts,
  isLastSection = false,
}: SectionLayoutProps) {
  return (
    <section
      className="py-8 shadow-md px-4"
      style={{
        background: seeAllLink
          ? `
          linear-gradient(
            to bottom,
            var(--section-bg-start),
            var(--section-bg-end)
          )
        `
          : "",
      }}
    >
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground hover:underline">
            {seeAllLink && (
              <Link href={seeAllLink} className="text-highlight font-medium">
                {title}
              </Link>
            )}
            {!seeAllLink && title}
          </h2>
          {seeAllLink && (
            <Link
              href={seeAllLink}
              className="text-highlight font-medium hover:underline"
            >
              See All
            </Link>
          )}
        </div>
        {/* Border below the title */}
        {!isLastSection && <hr className="border-gray-700 mt-4" />}
      </div>

      {/* Grid Layout for Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {posts.map((post) => (
          <PostCard
            key={post.slug.current}
            post={post}
            layout="vertical"
            size="medium"
          />
        ))}
      </div>
    </section>
  );
}
