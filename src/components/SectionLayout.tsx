import Link from "next/link";
import PostCard from "@/components/PostCard";
import { SectionLayoutProps } from "@/interfaces";

interface SectionLayoutPropsExtended extends SectionLayoutProps {
  columns?: 1 | 2 | 3 | 4; // Optional prop to define grid columns
}

export default function SectionLayout({
  title,
  seeAllLink,
  posts,
  isLastSection = false,
  columns = 4,
}: SectionLayoutPropsExtended) {
  return (
    <section
      className="py-8 shadow-md px-4"
      style={{
        background: seeAllLink
          ? `linear-gradient(to bottom, var(--section-bg-start), var(--section-bg-end))`
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
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-1`}
      >
        {posts.slice(0, 4).map((post) => (
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
