import { GetStaticProps } from "next";
import { client } from "@/sanity/lib/client";
import { CATEGORY_LIST_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Script from "next/script";

type Category = {
  title: string;
  slug: { current: string };
  description?: string;
};

type Props = {
  categories: Category[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const categories = await client.fetch(CATEGORY_LIST_QUERY);

  return {
    props: {
      categories: categories || [],
    },
    revalidate: 60, // ISR for incremental builds
  };
};

export default function CategoriesPage({ categories }: Props) {
  const pageTitle = "Categories - DarkWebNavigator";
  const pageDescription =
    "Explore all the categories available on DarkWebNavigator. Discover curated content from various topics.";
  const ogImage = "https://darkwebnavigator.com/logo.png";
  const ogUrl = "https://darkwebnavigator.com/category";

  if (!categories.length) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Head>
          <title>No Categories Found - DarkWebNavigator</title>
          <meta
            name="description"
            content="No categories are currently available. Please check back later."
          />
          <meta
            property="og:title"
            content="No Categories Found - DarkWebNavigator"
          />
          <meta
            property="og:description"
            content="No categories are currently available. Please check back later."
          />
          <meta property="og:image" content={ogImage} />
          <meta property="og:url" content={ogUrl} />
        </Head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BBGWDRZQGK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BBGWDRZQGK');
        `}
        </Script>
        <h1 className="text-3xl font-bold mb-4">No Categories Found</h1>
        <p className="text-lg text-gray-600 mb-8">
          There are currently no categories available. Please check back later.
        </p>
        <div className="mt-12">
          <Image
            src="/placeholder.png"
            alt="No categories available"
            width={300}
            height={300}
            className="mx-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-BBGWDRZQGK"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BBGWDRZQGK');
        `}
      </Script>
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            href={`/category/${category.slug.current}`}
            key={category.slug.current}
            className="block border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">{category.title}</h2>
              <p className="text-gray-600">
                {category.description || "Explore posts in this category."}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
