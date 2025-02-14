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
  body: any;
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
  tags?: {
    title: string;
    slug: {
      current: string;
    };
  }[];
  cryptocurrency?: string[];
  links?: {
    name: string;
    url: string;
  }[];
  isFeatured?: boolean;
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

export type SearchResult = {
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
};
