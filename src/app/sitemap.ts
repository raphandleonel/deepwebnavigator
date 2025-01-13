import { MetadataRoute } from "next";
import type { SanityDocument } from "@sanity/client";
import { client } from "@/sanity/lib/client";

// Static pages that should always be included in the sitemap
const staticPages: MetadataRoute.Sitemap = [
  {
    url: "https://darkwebnavigator.com/",
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: "https://darkwebnavigator.com/contact",
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly",
    priority: 0.8,
  },
  {
    url: "https://darkwebnavigator.com/get-listed",
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly",
    priority: 0.8,
  },
  {
    url: "https://darkwebnavigator.com/author",
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: "https://darkwebnavigator.com/category",
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

// Fetch posts from Sanity
async function fetchPosts() {
  const query = `*[_type == "post"] {
    "currentSlug": slug.current,
    "lastModified": _updatedAt
  }`;
  const data = await client.fetch(query);
  return data;
}

// Fetch categories from Sanity
async function fetchCategories() {
  const query = `*[_type == "category"] {
    "currentSlug": slug.current,
    "lastModified": _updatedAt
  }`;
  const data = await client.fetch(query);
  return data;
}

// Fetch authors from Sanity
async function fetchAuthors() {
  const query = `*[_type == "author"] {
    "currentSlug": slug.current,
    "lastModified": _updatedAt
  }`;
  const data = await client.fetch(query);
  return data;
}

// Sitemap generation
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data
  const posts = await fetchPosts();
  const categories = await fetchCategories();
  const authors = await fetchAuthors();

  // Map posts to sitemap format
  const postPages: MetadataRoute.Sitemap = posts.map(
    (post: SanityDocument) => ({
      url: `https://darkwebnavigator.com/${post.currentSlug}`,
      lastModified: new Date(post.lastModified).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })
  );

  // Map categories to sitemap format
  const categoryPages: MetadataRoute.Sitemap = categories.map(
    (category: SanityDocument) => ({
      url: `https://darkwebnavigator.com/category/${category.currentSlug}`,
      lastModified: new Date(category.lastModified).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );
  // Map authors to sitemap format
  const authorPages: MetadataRoute.Sitemap = authors.map(
    (author: SanityDocument) => ({
      url: `https://darkwebnavigator.com/author/${author.currentSlug}`,
      lastModified: new Date(author.lastModified).toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  // Combine all pages
  return [...staticPages, ...postPages, ...categoryPages, ...authorPages];
}
