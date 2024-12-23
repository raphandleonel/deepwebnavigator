import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = defineQuery(`
*[_type == "post"] | order(publishedAt desc) [0...8] {
  title,
  slug,
  publishedAt,
  category-> { title, slug },
  image,
  excerpt,
  author-> {
    name,
    slug,
    image
  }
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  title,
  slug,
  publishedAt,
  category-> { title, slug },
  image,
  excerpt,
  author-> {
    name,
    slug,
    image
  },
  body
}`);
export const RELATED_POST_QUERY =
  defineQuery(`*[_type == "post" && category._ref == $categoryId && slug.current != $slug][0...5]{
  title,
  slug,
  publishedAt,
  image{ asset->{url,metadata {dimensions {width,height}
 }
      }
    },
        excerpt
      }`);
