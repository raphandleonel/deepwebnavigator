import { useState } from "react";
import { Post } from "@/interfaces";
import Link from "next/link";
import FeaturedCard from "./FeaturedCard";

const NewFeaturedSection = ({ posts }: { posts: Post[] }) => {
  const [expandedPost, setExpandedPost] = useState<string | null>(null); // Manage expanded post state

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupedPosts = posts.reduce((acc: any, post: Post) => {
    const categorySlug = post.category.slug.current;
    if (!acc[categorySlug]) {
      acc[categorySlug] = [];
    }
    acc[categorySlug].push(post);
    return acc;
  }, {});

  const togglePostExpand = (slug: string) => {
    setExpandedPost(expandedPost === slug ? null : slug); // Toggle visibility of the selected post
  };

  return (
    <section className="text-white py-10 border border-gray-700 p-4 rounded-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Top Dark Web Markets */}
        <div className="col-span-1 md:col-span-3 border border-yellow-700 rounded-lg p-4 bg-gray-900">
          <div className="mb-4">
            <h3 className="text-center uppercase mb-4">
              <Link
                href="/category/top-dark-web-markets"
                className="text-light hover:underline"
              >
                Featured Dark Web Markets
              </Link>
            </h3>
            <ul className="list-unstyled">
              {groupedPosts["top-dark-web-markets"]?.map((post: Post) => (
                <FeaturedCard
                  key={post.slug.current}
                  post={post}
                  expandedPost={expandedPost}
                  onToggleExpand={togglePostExpand}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Darknet Forums */}
        <div className="col-span-1 md:col-span-3 bg-gray-800 border border-green-700 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-center uppercase text-light mb-4">
              <Link
                href="/category/deep-web-forums"
                className="text-light hover:underline"
              >
                Deep Web Forums
              </Link>
            </h3>
            <ul className="list-unstyled">
              {groupedPosts["deep-web-forums"]?.map((post: Post) => (
                <FeaturedCard
                  key={post.slug.current}
                  post={post}
                  path={"deep-web-forums"}
                  expandedPost={expandedPost}
                  onToggleExpand={togglePostExpand}
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Vendors Shop */}
        <div className="col-span-1 md:col-span-3  bg-gray-900 border border-red-700 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-center uppercase text-light mb-4">
              <Link
                href="/category/darknet-vendors-shop"
                className="text-light hover:underline"
              >
                Darknet Vendors Shop
              </Link>
            </h3>
            <ul className="list-unstyled">
              {groupedPosts["darknet-vendors-shop"]?.map((post: Post) => (
                <FeaturedCard
                  key={post.slug.current}
                  post={post}
                  path={"darknet-vendors-shop"}
                  expandedPost={expandedPost}
                  onToggleExpand={togglePostExpand}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewFeaturedSection;
