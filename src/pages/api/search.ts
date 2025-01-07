// pages/api/search.ts

import { SearchResult } from "@/interfaces";
import { client } from "@/sanity/lib/client";
import type { NextApiRequest, NextApiResponse } from "next";

type ErrorResponse = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult[] | ErrorResponse>
) {
  const { query } = req.query;

  if (!query || typeof query !== "string") {
    return res.status(400).json({ message: "Query is required" });
  }

  const searchQuery = query.toLowerCase();

  try {
    const results: SearchResult[] = await client.fetch(
      `*[_type == "post" && (
        lower(title) match '*${searchQuery}*' ||
        lower(excerpt) match '*${searchQuery}*' ||
        lower(seoDescription) match '*${searchQuery}*' ||
        lower(pt::text(body)) match '*${searchQuery}*'
      )]{
        title,
        "slug": slug.current,
        "category": category->title,
        publishedAt
      }`
    );

    res.status(200).json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "An error occurred while searching." });
  }
}
