import React from "react";
import Head from "next/head";
import { LayoutProps } from "@/interfaces";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <meta name="apple-mobile-web-app-title" content="dwnav" />
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
