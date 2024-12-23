import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/lib/queries";
import { Post, SectionLayoutProps } from "@/interfaces";
import Hero from "@/components/Hero";
import ThreeColumnLayout from "@/components/ThreeColumnLayout";
import Head from "next/head";
import Script from "next/script";
import SectionLayout from "@/components/SectionLayout";

export async function getStaticProps() {
  const posts = await client.fetch<Post[]>(HOMEPAGE_QUERY);
  return { props: { posts } };
}

export default function HomePage({ posts }: { posts: Post[] }) {
  const featuredPosts = posts.slice(0, 2); // Column 1
  const mainPost = posts[3]; // Center column (largest, single post)
  const latestPosts = posts.slice(1, 5); // Column 3 (smaller posts)
  // Example sections data
  const sections: SectionLayoutProps[] = [
    {
      title: "Data Breaches",
      seeAllLink: "/category/data-breaches",
      posts: posts.slice(0, 4),
    },
    {
      title: "Leaks",
      seeAllLink: "/category/leaks",
      posts: posts.slice(1, 5),
    },
    {
      title: "Vulnerabilities",
      seeAllLink: "/category/vulnerabilities",
      posts: posts.slice(0, 4),
    },
    {
      title: "Ransomware",
      seeAllLink: "/category/ransomware",
      posts: posts.slice(1, 5),
      isLastSection: true,
    },
  ];

  return (
    <>
      <Head>
        <title>Homepage - Deep Web Navigator</title>
        <meta
          name="description"
          content="Discover the latest featured, trending, and insightful posts on Deep Web Navigator."
        />
        <meta property="og:title" content="Homepage - Deep Web Navigator" />
        <meta
          property="og:description"
          content="Discover the latest featured, trending, and insightful posts on Deep Web Navigator."
        />
        <meta
          property="og:image"
          content="https://yourwebsite.com/og-image.jpg"
        />
      </Head>
      <Script
        type="application/ld+json"
        id="deep_web_navigator-schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            url: "https://deepwebnavigator.com",
            name: "Deep Web Navigator",
            article: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: post.publishedAt,
            })),
          }),
        }}
      />
      {/* Hero Section */}
      <Hero />
      {/* Three-Column Layout */}
      <ThreeColumnLayout
        featuredPosts={featuredPosts}
        mainPost={mainPost}
        latestPosts={latestPosts}
      />
      {/* Render Sections Dynamically */}
      {sections.map((section, index) => (
        <SectionLayout
          key={index}
          title={section.title}
          seeAllLink={section.seeAllLink}
          posts={section.posts}
        />
      ))}
    </>
  );
}
