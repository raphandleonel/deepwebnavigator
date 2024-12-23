export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export interface Post {
  readTime: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any; // Use a more specific type if your body content is typed
  image?: {
    asset: {
      url: string;
    };
  };
  excerpt: string;
  category: {
    title: string;
    slug: {
      current: string;
    };
  };
  author: {
    name: string;
    slug: {
      current: string;
    };
    image?: {
      asset: {
        url: string;
      };
    };
  };
}

export interface SectionLayoutProps {
  title: string;
  seeAllLink?: string;
  posts: Post[];
  isLastSection?: boolean;
}
