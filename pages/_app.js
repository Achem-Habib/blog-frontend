import "katex/dist/katex.css";
import "../styles/globals.css";
import "../styles/prism.css";

import "@fontsource/inter/variable-full.css";

import { ThemeProvider } from "next-themes";
import Head from "next/head";
import LayoutWrapper from "../components/LayoutWrapper";
import siteMetadata from "../data/siteMetadata";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          name="ahrefs-site-verification"
          content="211fd062142ff2c6a14ccff9e3f3de680f351ebb9eb46d77d75f954edbdde419"
        />
      </Head>

      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
