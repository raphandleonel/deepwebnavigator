import React from "react";
import Head from "next/head";
import { LayoutProps } from "@/interfaces";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Layout({ children, title, description }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title || "Dark Web Navigator"}</title>
        <meta
          name="description"
          content={
            description ||
            "Explore the latest cybercrime news, data breaches, DDoS attacks, and resources."
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/favicon.ico" />
        <meta property="og:title" content={title || "DeepWeb Navigator"} />
        <meta
          property="og:description"
          content={
            description ||
            "Explore the latest cybercrime news, data breaches, DDoS attacks, and resources."
          }
        />
      </Head>

      <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow container mx-auto my-8 px-4 md:px-6 lg:px-8">
          {children}
        </main>

        {/* Footer */}
        <Footer />

        {/* ScrollToTop */}
        <ScrollToTop />
      </div>
    </>
  );
}
