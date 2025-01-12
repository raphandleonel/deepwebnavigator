import { client } from "@/sanity/lib/client";
import { AUTHOR_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/interfaces";
import PostCard from "@/components/PostCard";
import Head from "next/head";
import Script from "next/script";

export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type == "author"].slug.current`);
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const authorData = await client.fetch(AUTHOR_QUERY, { slug: params.slug });
  if (!authorData) {
    return { notFound: true };
  }

  return {
    props: {
      author: authorData,
      posts: authorData.posts,
      slug: params.slug,
    },
    revalidate: 30,
  };
}

export default function AuthorPage({
  author,
  posts,
}: {
  author: { name: string; bio?: string; slug: string };
  posts: Post[];
}) {
  const pageTitle = `Posts by ${author.name} - Dark Web Navigator`;
  const pageDescription = author.bio
    ? `${author.bio}`
    : `Explore articles and posts authored by ${author.name} on Dark Web Navigator.`;
  const ogImage = "https://darkwebnavigator.com/logo.png";
  const ogUrl = `https://darkwebnavigator.com/author/${author.slug}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@darkwebnavigator" />
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
      <h1 className="text-3xl font-bold mb-4">Posts by {author.name}</h1>
      {author.bio && <p className="mb-6">{author.bio}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug.current} post={post} size="medium" />
        ))}
      </div>
    </div>
  );
}
