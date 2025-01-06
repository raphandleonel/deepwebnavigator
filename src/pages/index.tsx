import { client } from "@/sanity/lib/client";
import {
  BANNER_QUERY,
  FEATURED_POSTS_QUERY,
  HOMEPAGE_QUERY,
  MARKET_FORUM_VENDORS_QUERY,
} from "@/sanity/lib/queries";
import { IBanner, Post, SectionLayoutProps } from "@/interfaces";
import Banner from "@/components/Banner";
import ThreeColumnLayout from "@/components/ThreeColumnLayout";
import Head from "next/head";
import Script from "next/script";
import SectionLayout from "@/components/SectionLayout";

export async function getStaticProps() {
  const featuredPosts_ = await client.fetch<Post[]>(FEATURED_POSTS_QUERY);
  const posts = await client.fetch<Post[]>(HOMEPAGE_QUERY);
  const banners = await client.fetch<IBanner[]>(BANNER_QUERY);
  const marketForumVendors = await client.fetch<Post[]>(
    MARKET_FORUM_VENDORS_QUERY
  );

  return {
    props: {
      featuredPosts_,
      posts,
      banners,
      marketForumVendors,
    },
    revalidate: 600, // Revalidate every 10 minutes
  };
}

export default function HomePage({
  posts,
  featuredPosts_,
  banners,
  marketForumVendors,
}: {
  posts: Post[];
  banners: IBanner[];
  marketForumVendors: Post[];
  featuredPosts_: Post[];
}) {
  const featuredPosts = [
    ...featuredPosts_,
    ...posts.filter((p) => !p.isFeatured),
  ].slice(0, 4);
  const latestPosts = posts.slice(1, 5);
  const sections: SectionLayoutProps[] = [
    // {
    //   title: "News",
    //   seeAllLink: "/category/news",
    //   posts: posts.filter((i) => i.category.slug.current === "news"),
    // },

    {
      title: "Leaks",
      seeAllLink: "/category/leaks",
      posts: posts.filter((i) => i.category.slug.current === "leaks"),
    },
    {
      title: "DDoS Attacks",
      seeAllLink: "/category/ddos-attacks",
      posts: posts.filter((i) => i.category.slug.current === "ddos-attacks"),
    },
    {
      title: "Guides",
      seeAllLink: "/category/guides",
      posts: posts.filter((i) => i.category.slug.current === "guides"),
    },
  ];
  return (
    <>
      <Head>
        <title>Homepage - Dark Web Navigator</title>
        <meta
          name="description"
          content="Darkwebnavigator is a resource hub for those seeking information on navigating the Dark Web, including access to hidden websites, darknet forums, and tools for private communication"
        />
        <meta property="og:title" content="Homepage - Dark Web Navigator" />
        <meta
          property="og:description"
          content="Darkwebnavigator is a resource hub for those seeking information on navigating the Dark Web, including access to hidden websites, darknet forums, and tools for private communication"
        />
        <meta
          property="og:image"
          content="https://darkwebnavigator.com/og-image.jpg"
        />

        {/* Twitter card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Homepage - Dark Web Navigator" />
        <meta
          name="twitter:description"
          content="Darkwebnavigator is a resource hub for those seeking information on navigating the Dark Web..."
        />
        <meta
          name="twitter:image"
          content="https://darkwebnavigator.com/og-image.jpg"
        />
        <meta name="twitter:site" content="@darkwebnavigator" />
      </Head>
      <Script
        type="application/ld+json"
        id="deep_web_navigator-schema"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            url: "https://darkwebnavigator.com",
            name: "Dark Web Navigator",
            article: posts.map((post) => ({
              "@type": "BlogPosting",
              headline: post.title,
              datePublished: post.publishedAt,
            })),
          }),
        }}
      />
      {/* Banner Section */}
      <Banner banners={banners} /> {/* Pass banners to Banner component */}
      {/* Three-Column Layout */}
      <ThreeColumnLayout
        featurePosts={featuredPosts}
        latestPosts={latestPosts}
        marketForumVendors={marketForumVendors}
      />
      {/* Render Sections Dynamically */}
      {sections.map((section, index) => {
        if (section.posts.length === 0) return null;
        return (
          <SectionLayout
            key={index}
            title={section.title}
            seeAllLink={section.seeAllLink}
            posts={section.posts}
          />
        );
      })}
    </>
  );
}
