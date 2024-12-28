import "tailwindcss/tailwind.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
