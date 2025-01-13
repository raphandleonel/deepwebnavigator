import { GetStaticProps } from "next";
import { client } from "@/sanity/lib/client";
import { AUTHOR_LIST_QUERY } from "@/sanity/lib/queries";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ogImage, siteUrl } from "@/utils/constants";
import { urlFor } from "@/utils/imageBuilder";
import Script from "next/script";

type Author = {
  name: string;
  slug: { current: string };
  bio?: string;
  image?: string;
};

type Props = {
  authors: Author[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const authors = await client.fetch(AUTHOR_LIST_QUERY);

  return {
    props: {
      authors: authors || [],
    },
    revalidate: 60, // Revalidate every 60 seconds
  };
};

export default function AuthorIndexPage({ authors }: Props) {
  const pageTitle = "Authors - Dark Web Navigator";
  const pageDescription =
    "Explore the list of authors contributing to Dark Web Navigator. Discover their profiles and posts.";
  const ogUrl = `${siteUrl}/author`;

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
        <meta name="twitter:site" content="@darkwebnavigator" />
        <link rel="canonical" href={ogUrl} />
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

      <h1 className="text-3xl font-bold mb-6">Authors</h1>
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <Link
              href={`/author/${author.slug.current}`}
              key={author.slug.current}
              className="block border rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-4">
                {author.image ? (
                  <Image
                    src={urlFor(author.image).url()}
                    alt={author.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold">{author.name}</h2>
                  {author.bio && (
                    <p className="text-sm text-gray-600 mt-1">
                      {author.bio.substring(0, 80)}...
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">
            No authors are currently available. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
}
