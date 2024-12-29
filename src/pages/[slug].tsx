import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { Post } from "@/interfaces";
import {
  HOMEPAGE_QUERY,
  POST_QUERY,
  RELATED_POST_QUERY,
} from "@/sanity/lib/queries";
import Head from "next/head";
import Link from "next/link";
import SectionLayout from "@/components/SectionLayout"; // Reusing the section layout for related posts
import { useRouter } from "next/router";
import { formateDate } from "@/utils/formatDate";

const builder = imageUrlBuilder(client);

const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source);

export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type == "post"].slug.current`);
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = await client.fetch(POST_QUERY, { slug: params.slug });
  const latestPost = await client.fetch(HOMEPAGE_QUERY);

  // Fetch related posts based on the category
  let relatedPosts = [];
  if (post?.category?._ref) {
    relatedPosts = await client.fetch(RELATED_POST_QUERY, {
      categoryId: post.category._ref,
      slug: params.slug,
    });
  }

  if (!post) {
    return { notFound: true };
  }

  return { props: { post, relatedPosts, latestPost }, revalidate: 30 };
}

export default function PostPage({
  post,
  relatedPosts,
  latestPost,
}: {
  post: Post;
  latestPost: Post[];
  relatedPosts: Post[];
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading…</div>;
  }

  const formattedDate = formateDate(post.publishedAt);
  const readTime = post.readTime || "1 min read";

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    { name: "Posts", url: "/posts" },
    { name: post.title, url: `/posts/${post.slug}` },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  const tags = post.tags?.map((tag) => tag.title).join(", ");

  const schemaTags = post.tags
    ? post.tags.map((tag) => ({
        "@type": "ListItem",
        position: post.tags ? post.tags.indexOf(tag) + 1 : 1,
        name: tag.title,
        item: `/tags/${tag.slug.current}`, // You can link to your tag page
      }))
    : [];

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: urlFor(post.image ?? "").url(),
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    description: post.excerpt,
    keywords: tags,
    mainEntityOfPage: `https://darkwebnavigator.com/${post.slug}`,
    breadcrumb: breadcrumbSchema,
    articleSection: post.category?.title,
    tag: schemaTags,
  };

  return (
    <div className="m-auto pb-10 px-4 sm:px-8 max-w-[1170px]">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.seoDescription} />
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.excerpt} />
        {post.image && (
          <meta property="og:image" content={urlFor(post.image).url()} />
        )}
        <meta property="og:url" content={`/posts/${post.slug}`} />
        <meta property="og:type" content="article" />
        {tags && <meta name="keywords" content={tags} />}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(postSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema),
          }}
        />
      </Head>

      <div className="lg:flex lg:space-x-8 mb-10">
        {/* Main Content */}
        <div className="lg:w-full">
          <div className="text-center mb-8">
            {post.category && (
              <Link href={`/category/${post.category.slug.current}`}>
                <p className="inline-block bg-blue-600 text-white py-1 px-3 rounded-full text-sm">
                  {post.category.title}
                </p>
              </Link>
            )}
            <h1 className="font-bold text-2xl sm:text-4xl text-foreground mt-4">
              {post.title}
            </h1>
            <p className="mt-4">{post.excerpt}</p>
            <div className="flex justify-center mt-2 text-sm text-gray-500 gap-4">
              <span>Published on {formattedDate}</span>
              <span>|</span>
              <span>{readTime}</span>
            </div>
          </div>

          {post.image && (
            <figure className="w-full mb-8">
              <Image
                src={urlFor(post.image).url()}
                alt={post.title}
                layout="responsive"
                objectFit="cover"
                width={800}
                height={450}
                loading="lazy"
                className="rounded-lg"
              />
            </figure>
          )}

          <div className="prose prose-lg text-foreground dark:text-foreground prose-invert max-w-none">
            <PortableText
              value={post.body}
              components={{
                block: {
                  h1: ({ children }) => (
                    <h1 className="text-foreground font-heading">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-foreground font-heading">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-foreground font-heading">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-foreground font-heading">{children}</h4>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-bold text-foreground">
                      {children}
                    </strong>
                  ),
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <SectionLayout title="Related Posts" posts={relatedPosts} />
      )}

      {/* Latest Posts section */}
      {latestPost && latestPost.length > 0 && (
        <SectionLayout title="Latest Posts" posts={latestPost.slice(1, 5)} />
      )}
    </div>
  );
}
