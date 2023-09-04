import Document, { Head, Html, Main, NextScript } from "next/document";
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="scroll-smooth">
        <Head>
          <link
            rel="icon"
            type="image/svg"
            sizes="32x32"
            href="static/logo.svg"
          />
          <link
            rel="icon"
            type="image/svg"
            sizes="16x16"
            href="static/logo.svg"
          />
        </Head>
        <body className="bg-white text-black antialiased dark:bg-gray-900 dark:text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
