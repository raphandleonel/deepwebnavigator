import { client } from "@/sanity/lib/client";
import { AUTHOR_QUERY } from "@/sanity/lib/queries";
import { Post } from "@/interfaces";
import PostCard from "@/components/PostCard";
import Head from "next/head";

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
    },
    revalidate: 30,
  };
}

export default function AuthorPage({
  author,
  posts,
}: {
  author: { name: string; bio?: string };
  posts: Post[];
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{author.name}</title>
      </Head>
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
