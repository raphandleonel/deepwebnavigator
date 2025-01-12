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

// GROQ query to fetch posts from Sanity
async function getData() {
  const query = `*[_type == "post"] {
    "currentSlug": slug.current,
    "lastModified": _updatedAt
  }`;
  const data = await client.fetch(query);
  return data;
}

// Sitemap generation
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data for posts
  const data = await getData();

  // Map posts into sitemap format
  const dynamicPages: MetadataRoute.Sitemap = data.map(
    (post: SanityDocument) => ({
      url: `https://darkwebnavigator.com/posts/${post.currentSlug}`,
      lastModified: new Date(post.lastModified).toISOString(),
      changeFrequency: "weekly" as const, // Explicitly cast to the correct type
      priority: 0.9,
    })
  );

  // Combine static and dynamic pages
  return [...staticPages, ...dynamicPages];
}
