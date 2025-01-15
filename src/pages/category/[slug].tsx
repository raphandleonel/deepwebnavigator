import { client } from "@/sanity/lib/client";
import { CATEGORY_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/interfaces";
import PostCard from "@/components/PostCard";
import Head from "next/head";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { ogImage, siteUrl } from "@/utils/constants";

type Category = {
  title: string;
  description: string;
  keywords: string[];
};

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
      slug: params.slug,
    },
    revalidate: 30,
  };
}

type Props = {
  category: Category;
  posts: Post[];
  slug: string;
};

export default function CategoryPage({ category, posts, slug }: Props) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Metadata category={category} slug={slug} />
      <h1 className="text-3xl font-bold mb-4">{category.title}</h1>
      {posts.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <PostCard key={post.slug.current} post={post} size="medium" />
          ))}
        </div>
      ) : (
        <NoPostsFallback category={category} />
      )}
    </div>
  );
}

function Metadata({ category, slug }: { category: Category; slug: string }) {
  const keywords = category.keywords?.join(", ") || "";

  const ogUrl = `${siteUrl}/category/${slug}`;
  const pageDescription = `Discover insightful articles in the ${category.title} category on Dark Web Navigator. Explore curated posts, tips, and guides related to ${category.title}.`;
  return (
    <>
      <Head>
        <title>{`${category.title} - Category | Dark Web Navigator`}</title>
        <meta
          name="description"
          content={category.description || pageDescription}
        />
        <meta name="keywords" content={keywords} />
        <meta
          property="og:title"
          content={`${category.title} - Category | Dark Web Navigator`}
        />
        <meta
          property="og:description"
          content={category.description || pageDescription}
        />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${category.title} - Category | Dark Web Navigator`}
        />
        <meta
          name="twitter:description"
          content={category.description || pageDescription}
        />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@darkwebnav" />
        <link rel="canonical" href={ogUrl} />
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
    </>
  );
}

function NoPostsFallback({ category }: { category: Category }) {
  return (
    <div className="text-center">
      <p className="text-lg text-gray-600 mb-4">
        {`Sorry, there are no posts in the ${category.title} category yet.`}
      </p>
      <Link
        href="/category"
        className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
      >
        Explore Other Categories
      </Link>
      <div className="mt-8">
        <Image
          src="/placeholder.png"
          alt="No posts available"
          width={300}
          height={300}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
