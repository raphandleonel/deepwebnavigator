import { client } from "@/sanity/lib/client";
import { CATEGORY_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/interfaces";
import PostCard from "@/components/PostCard";
import Head from "next/head";

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
    },
    revalidate: 30,
  };
}

export default function CategoryPage({
  category,
  posts,
}: {
  category: { title: string };
  posts: Post[];
}) {
  console.log({ post: JSON.stringify(posts) });
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{category.title}</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">{category.title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.slug.current} post={post} size="medium" />
        ))}
      </div>
    </div>
  );
}
