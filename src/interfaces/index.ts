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
  seoTitle: string;
  seoDescription: string;
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
    bio?: string;
  };
}

export interface SectionLayoutProps {
  title: string;
  seeAllLink?: string;
  posts: Post[];
  isLastSection?: boolean;
}

export interface BannerLink {
  linkType: "internal" | "external";
  postLink?: {
    slug: {
      current: string;
    };
  };
  externalLink?: string;
}

export interface IBanner {
  title: string;
  position: number;
  media: {
    asset: {
      url: string;
    };
  };
  linkType: "internal" | "external";
  postLink?: { slug: { current: string } };
  externalLink?: string;
}
