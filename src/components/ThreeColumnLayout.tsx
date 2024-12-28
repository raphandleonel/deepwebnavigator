import React from "react";
import PostCard from "./PostCard";
import { Post } from "@/interfaces";
import NewFeaturedSection from "./NewFeaturedSection";

function ThreeColumnLayout({
  featurePosts,
  latestPosts,
  marketForumVendors,
}: {
  marketForumVendors: Post[];
  featurePosts: Post[];
  latestPosts: Post[];
}) {
  return (
    <section className="flex flex-wrap py-8 my-8">
      {/* Column 1: Markets, forums, Posts */}
      <div className="lg:w-1/4 w-full px-4 order-2 lg:order-1 lg:pt-8">
        <section aria-labelledby="featured-posts">
          <NewFeaturedSection posts={marketForumVendors} />
        </section>
      </div>

      {/* Column 2: Featured Posts */}
      <div className="lg:w-2/4 w-full order-1 lg:order-2 lg:pt-4">
        {/* <h1 className="text-foreground text-center font-extrabold text-2xl">
          Dark Web Navigator
        </h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1">
          {featurePosts.map((post: Post) => (
            <PostCard
              key={post.slug.current}
              post={post}
              layout="vertical"
              size="medium"
            />
          ))}
        </div>
      </div>

      {/* Column 3: Latest Posts */}
      <div className="lg:w-1/4 w-full order-3 lg:order-3">
        <section aria-labelledby="featured-posts ">
          <h2
            id="latest-posts"
            className="text-xl font-bold text-center lg:text-left lg:ml-5 mt-4 lg:mt-0"
          >
            Latest
          </h2>
          {latestPosts.map((post: Post) => (
            <PostCard
              key={post.slug.current}
              post={post}
              layout="horizontal"
              size="small"
            />
          ))}
        </section>
      </div>
    </section>
  );
}

export default ThreeColumnLayout;
