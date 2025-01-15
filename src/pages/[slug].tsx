import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { Post } from "@/interfaces";
import {
  LATEST_POSTS_QUERY,
  POST_QUERY,
  RELATED_POST_QUERY,
} from "@/sanity/lib/queries";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { formateDate } from "@/utils/formatDate";
import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import PostCard from "@/components/PostCard";
import Script from "next/script";
import { siteUrl } from "@/utils/constants";

const builder = imageUrlBuilder(client);

const urlFor = (source: Parameters<typeof builder.image>[0]) =>
  builder.image(source);

export async function getStaticPaths() {
  const slugs = await client.fetch(`*[_type == "post"].slug.current`);
  const paths = slugs.map((slug: string) => ({ params: { slug } }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post: Post = await client.fetch(POST_QUERY, { slug: params.slug });
  const latestPost = await client.fetch(LATEST_POSTS_QUERY, {
    slug: params.slug,
  });

  // Fetch related posts based on the category
  let relatedPosts = [];
  if (post?.category?.slug?.current) {
    relatedPosts = await client.fetch(RELATED_POST_QUERY, {
      categorySlug: post.category.slug.current,
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
  const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>(
    {}
  );

  if (router.isFallback) {
    return <div>Loading…</div>;
  }

  const formattedDate = formateDate(post.publishedAt);
  const readTime = `${post.readTime || 1} min read`;

  const breadcrumbItems = [
    { name: "Home", url: `${siteUrl}/` },
    {
      name: post.category.title,
      url: `${siteUrl}/category/${post.category.slug.current}`,
    },
    {
      name: post.title,
      url: `${siteUrl}/${post.slug.current}`,
    },
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
    keywords: tags, // Comma-separated keywords
    mainEntityOfPage: `${siteUrl}/${post.slug.current}`,
    breadcrumb: breadcrumbSchema, // Breadcrumb schema
    articleSection: post.category?.title,
  };
  const handleCopy = (link: string, index: string) => {
    navigator.clipboard.writeText(link).then(() => {
      setCopiedLinks((prev) => ({
        ...prev,
        [index]: true,
      }));
      setTimeout(() => {
        setCopiedLinks((prev) => ({
          ...prev,
          [index]: false,
        }));
      }, 2000); // Revert the icon back after 2 seconds
    });
  };
  const meta = generatePostMeta(post, tags);
  return (
    <div className="pb-10 px-2 2xl:px-8 container mx-auto">
      <Head>
        <title>{meta.pageTitle}</title>
        <meta name="description" content={meta.pageDescription} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:url" content={meta.ogUrl} />
        <meta property="og:type" content="article" />
        {meta.keywords && <meta name="keywords" content={meta.keywords} />}
        <link rel="canonical" href={meta.canonicalUrl} />
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
      <section className="flex flex-wrap px-4">
        <div className="lg:w-2/3 w-full 2xl:px-8 lg:px-4">
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
              <p className="mt-4 text-gray-400">{post.excerpt}</p>
              <div className="flex justify-center mt-2 text-sm text-gray-500 gap-4">
                <span>Published on {formattedDate}</span>
                <span>|</span>
                <span>{readTime}</span>
              </div>
            </div>
            {/* Breadcrumb */}
            <nav className="text-xs sm:text-sm text-gray-500 mt-6 flex items-center">
              <ol className="flex flex-wrap items-center gap-1">
                {breadcrumbItems.map((item, index) => (
                  <li key={item.url} className="flex items-center">
                    {index < breadcrumbItems.length - 1 ? (
                      <Link
                        href={item.url}
                        className={`hover:text-foreground transition-colors`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <span className="truncate font-semibold text-foreground  overflow-hidden text-ellipsis max-sm:max-w-[150px]">
                        {item.name}
                      </span>
                    )}

                    {index < breadcrumbItems.length - 1 && (
                      <span className="text-gray-5 mx-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            {post.image && (
              <figure className="w-full mt-6 mb-8">
                <div
                  className="relative w-full"
                  style={{ paddingBottom: "56.25%" }}
                >
                  {/* 16:9 aspect ratio */}
                  <Image
                    src={urlFor(post.image).url()}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }} // Replaces objectFit="cover"
                    loading="lazy"
                    className="rounded-lg"
                  />
                </div>
              </figure>
            )}

            <div className="prose prose-lg text-foreground dark:text-foreground prose-invert max-w-full break-words">
              <PortableText
                value={post.body}
                components={{
                  block: {
                    // Apply theme classes to headings (h1, h2, h3, etc.)
                    h1: ({ children }) => (
                      <h1 className="text-foreground font-heading">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-blue-500 font-heading">{children}</h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-foreground font-heading">
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-foreground font-heading">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-foreground">{children}</p> // Apply text color for paragraphs
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-5 text-foreground">
                        {children}
                      </ul> // Apply list styles
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-5 text-foreground">
                        {children}
                      </ol> // Apply list styles
                    ),
                    li: ({ children }) => (
                      <li className="text-foreground">{children}</li> // Apply text color for list items
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-bold text-foreground">
                        {children}
                      </strong> // Ensure strong text is bold and has theme color
                    ),
                    em: ({ children }) => (
                      <em className="italic text-foreground">{children}</em> // Apply italic and text color for em
                    ),
                    link: ({ children, value }) => {
                      const isOnionLink = value.href.includes(".onion");

                      return isOnionLink ? (
                        <div className="flex items-center space-x-2 overflow-hidden w-full">
                          <a
                            href={
                              value.href.startsWith("http")
                                ? value.href
                                : `https://${value.href}`
                            }
                            className="text-blue-600 hover:text-blue-800 truncate max-w-full"
                          >
                            {children}
                          </a>
                          <button
                            onClick={() => handleCopy(value.href, value.href)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {copiedLinks[value.href] ? (
                              <CheckIcon className="w-5 h-5" />
                            ) : (
                              <ClipboardDocumentIcon className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <a
                          href={
                            value.href.startsWith("http")
                              ? value.href
                              : `https://${value.href}`
                          }
                          className="text-blue-600 hover:text-blue-800 truncate max-w-full"
                        >
                          {children}
                        </a>
                      );
                    },
                  },
                  types: {
                    // Custom component for images
                    image: ({ value }) => {
                      return (
                        <div
                          className="relative w-full mb-8"
                          style={{ paddingBottom: "56.25%" }}
                        >
                          <Image
                            src={urlFor(value).url()}
                            alt={value.alt || "Image"}
                            fill
                            style={{ objectFit: "contain" }}
                            loading="lazy"
                            className="rounded-lg"
                          />
                        </div>
                      );
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 w-full lg:mt-[25vh] 2xl:px-8 lg:px-4">
          {/* Related Posts Section */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mb-8 mt-8">
              <h2 className="text-2xl font-bold lg:text-center">
                Related Posts
              </h2>
              {latestPost.slice(0, 3).map((post, index) => (
                <PostCard
                  key={index}
                  post={post}
                  layout="horizontal"
                  size="small"
                />
              ))}
            </div>
          )}

          {/* Latest Posts section */}
          {latestPost && latestPost.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold lg:text-center">
                Latest Posts
              </h2>
              {latestPost.slice(0, 4).map((post, index) => (
                <PostCard
                  key={index}
                  post={post}
                  layout="horizontal"
                  size="small"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const generatePostMeta = (post: Post, tags: string | undefined) => {
  const postUrl = `${siteUrl}/${post.slug.current}`;
  return {
    pageTitle: post.title,
    pageDescription: post.seoDescription || post.excerpt || "",
    ogTitle: post.seoTitle || post.title,
    ogDescription: post.excerpt || "",
    ogImage: post.image ? urlFor(post.image).url() : `${siteUrl}/logo.png`,
    ogUrl: postUrl,
    keywords: tags || "",
    canonicalUrl: postUrl,
  };
};
