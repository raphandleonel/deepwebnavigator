import { defineQuery } from "next-sanity";

export const HOMEPAGE_QUERY = defineQuery(`
*[_type == "post" && !(category->slug.current in ["darknet-vendors-shop", "deep-web-forums", "top-dark-web-markets"])] | order(publishedAt desc) [0...8] {
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
  seoTitle,
  seoDescription,
  excerpt,
  "tags": tags[]-> { title, slug },
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

export const AUTHOR_QUERY = defineQuery(`
  *[_type == "author" && slug.current == $slug][0] {
    name,
    bio,
    "posts": *[_type == "post" && author._ref == ^._id] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      image,
      excerpt,
      author-> {
    name,
    slug,
    image
  },
      category-> { title, slug },
    }
  }
`);

export const CATEGORY_QUERY = defineQuery(`
  *[_type == "category" && slug.current == $slug][0] {
    title,
    description,
    keywords,
    "posts": *[_type == "post" && category._ref == ^._id] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      image,
      excerpt,
      author-> {
    name,
    slug,
    image
  },
      category-> { title, slug },
    }
  }
`);

export const BANNER_QUERY =
  defineQuery(`*[_type == "banner"] | order(position asc) {
        title,
        media {
          asset -> {
            _id,
            url
          }
        },
        linkType,
        postLink-> {
          slug
        },
        externalLink
      }`);

export const MARKET_FORUM_VENDORS_QUERY =
  defineQuery(`*[_type == "post" && category->slug.current in ["darknet-vendors-shop", "deep-web-forums", "top-dark-web-markets"]]{
      title,
      slug,
      excerpt,
      body,
      seoTitle,
      seoDescription,
      category->{slug},
      cryptocurrency,
      links[] {
        name,
        url
      }
    }`);
