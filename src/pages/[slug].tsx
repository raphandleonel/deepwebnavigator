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
import { useRouter } from "next/router";
import { formateDate } from "@/utils/formatDate";
import { useState } from "react";
import { ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/outline";
import PostCard from "@/components/PostCard";

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
  const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>(
    {}
  );

  if (router.isFallback) {
    return <div>Loading…</div>;
  }

  const formattedDate = formateDate(post.publishedAt);
  const readTime = `${post.readTime || 1} min read`;

  const breadcrumbItems = [
    { name: "Home", url: "/" },
    {
      name: post.category.title,
      url: `/category/${post.category.slug.current}`,
    },
    { name: post.title, url: `/${post.slug.current}` },
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
  return (
    <div className="m-auto pb-10 px-4 sm:px-8 max-w-[1200px]">
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
      <section className="flex flex-wrap px-4">
        <div className="lg:w-3/5 w-full lg:pr-8">
          {/* Main Content */}
          <div className="lg:w-full">
            <div className="text-center mb-8">
              {/* {post.category && (
              <Link href={`/category/${post.category.slug.current}`}>
                <p className="inline-block bg-blue-600 text-white py-1 px-3 rounded-full text-sm">
                  {post.category.title}
                </p>
              </Link>
            )} */}
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
                    link: ({ children, value }) => (
                      <div className="flex items-center space-x-2 overflow-hidden w-full">
                        <a
                          href={value.href}
                          className="text-blue-600 hover:text-blue-800 truncate max-w-[calc(100%-3rem)]"
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
                    ),
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
        <div className="lg:w-2/5 w-full lg:mt-[25vh] lg:p-16">
          {/* Related Posts Section */}
          {latestPost && relatedPosts.length === 0 && (
            <div className="mb-8 mt-8">
              <h2 className="text-2xl font-bold lg:text-center">
                Related Posts
              </h2>
              {latestPost.slice(0, 3).map((post, index) => (
                <PostCard key={index} post={post} noBorder={true} />
              ))}
            </div>
          )}

          {/* Latest Posts section */}
          {latestPost && latestPost.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold lg:text-center">
                Latest Posts
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
        </div>
      </section>
    </div>
  );
}
