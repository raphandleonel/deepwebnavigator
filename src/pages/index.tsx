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
import { pageDescription, pageTitle } from "@/utils/constants";

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
  const featuredPosts = [...featuredPosts_].slice(0, 6);
  const latestPosts = posts.filter((p) => !p.isFeatured)?.slice(0, 6);
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
        <title>Dark Web Navigator: Your Guide to the Hidden Internet</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:image"
          content="https://darkwebnavigator.com/logo.png"
        />

        {/* Twitter card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://darkwebnavigator.com/logo.png"
        />
        <meta name="twitter:site" content="@darkwebnav" />
        {/* Canonical Tag */}
        <link rel="canonical" href="https://darkwebnavigator.com" />
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
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-BBGWDRZQGK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BBGWDRZQGK');
        `}
      </Script>
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
