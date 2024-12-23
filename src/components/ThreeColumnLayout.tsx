import React from "react";
import PostCard from "./PostCard";
import { Post } from "@/interfaces";

function ThreeColumnLayout({
  featuredPosts,
  mainPost,
  latestPosts,
}: {
  featuredPosts: Post[];
  mainPost: Post;
  latestPosts: Post[];
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8 my-8">
      {/* Column 1: Featured Posts */}
      <div className="space-y-6 lg:col-span-3 pr-4 order-2 lg:order-1">
        <section aria-labelledby="featured-posts">
          <h2 id="featured-posts" className="text-xl font-bold">
            Featured
          </h2>
          {featuredPosts.map((post) => (
            <PostCard
              key={post.slug.current}
              post={post}
              layout="vertical"
              size="medium"
            />
          ))}
        </section>
      </div>

      {/* Column 2: Main Post */}
      <div className="space-y-6 lg:col-span-6 px-4 lg:pt-14 order-1 lg:order-2">
        {mainPost && (
          <PostCard post={mainPost} layout="vertical" size="large" />
        )}
      </div>

      {/* Column 3: Latest Posts */}
      <div className="space-y-6 lg:col-span-3 pl-4 order-3 lg:order-3">
        <section aria-labelledby="featured-posts">
          <h2 id="latest-posts" className="text-xl font-bold">
            Latest
          </h2>
          {latestPosts.map((post) => (
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
