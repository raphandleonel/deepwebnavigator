import { client } from "@/sanity/lib/client";
import { CATEGORY_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/interfaces";
import PostCard from "@/components/PostCard";
import Head from "next/head";
import Script from "next/script";

export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type == "category"].slug.current`);
  const paths = slugs.map((slug: string) => ({ params: { slug } }));
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const categoryData = await client.fetch(CATEGORY_QUERY, {
    slug: params.slug,
  });
  if (!categoryData) {
    return { notFound: true };
  }

  return {
    props: {
      category: categoryData,
      posts: categoryData.posts,
    },
    revalidate: 30,
  };
}

export default function CategoryPage({
  category,
  posts,
}: {
  category: { title: string; description: string; keywords: string[] };
  posts: Post[];
}) {
  const keywords = category.keywords ? category.keywords.join(", ") : "";
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{category.title}</title>
        <meta name="description" content={category.description || ""} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={`${category.title} - Category`} />
        <meta property="og:description" content={category.description} />
        <meta
          property="og:image"
          content="https://darkwebnavigator.com/logo.png"
        />
        <meta
          property="og:url"
          content={`https://darkwebnavigator.com/category/${posts[0].category.slug.current}`}
        />

        {/* Twitter card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${category.title} - Category`} />
        <meta name="twitter:description" content={category.description} />
        <meta
          name="twitter:image"
          content="https://darkwebnavigator.com/logo.png"
        />
        <meta name="twitter:site" content="@darkwebnavigator" />
      </Head>
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
      <h1 className="text-3xl font-bold mb-4">{category.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        {posts.map((post) => (
          <PostCard key={post.slug.current} post={post} size="medium" />
        ))}
      </div>
    </div>
  );
}
