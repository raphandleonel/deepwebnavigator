import { Post } from "@/interfaces";
import PostCard from "./PostCard";

export default function CategorySection({
  title,
  posts,
}: {
  title: string;
  posts: Post[];
}) {
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug.current} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
