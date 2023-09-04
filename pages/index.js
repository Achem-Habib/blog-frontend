// components
import { PageSEO } from "@/components/SEO";
import LatestPosts from "@/components/_child/LatestPosts";
import Newsletter from "@/components/_child/Newsletter";
import siteMetadata from "@/data/siteMetadata";
import { baseUrl } from "@/lib/constant";
import axios from "axios";
import Link from "next/link";

export async function getStaticProps() {
  try {
    const latestPostsRes = await axios.get(`${baseUrl}/latest-posts/`);
    const latestPosts = latestPostsRes.data;

    return {
      props: { latestPosts },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: { error: true },
      revalidate: 60,
    };
  }
}

export default function Home({ latestPosts, error }) {
  return (
    <>
      <PageSEO
        title={siteMetadata.title}
        description={siteMetadata.description}
      />

      <div>
        {/* Welcoming speech for home page */}
        <div className="flex flex-col items-center my-6 xl:flex-row gap-x-12 xl:mb-12">
          <div className="pt-6">
            <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-purple-500 dark:text-fuchsia-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Welcome to our blockchain technology blog!
            </h1>
            <h2 className="text-lg prose text-gray-600 dark:text-gray-400">
              Here, we aim to provide you with the latest news and insights on
              theme ever-evolving world of blockchain and cryprocurrency. Join
              us on our journey to discover the potential of blockchain and stay
              up-to-date with the latest trends and advancements in this
              exciting field
            </h2>
          </div>
          <div className="w-full flex items-center justify-center  my-12 ">
            <Newsletter></Newsletter>
          </div>
        </div>

        {/* Latest posts */}
        <LatestPosts posts={latestPosts} error={error} />

        {/* Link to see all posts */}
        <div className="flex justify-end text-base font-medium leading-6 mt-10">
          <Link
            href="/blog"
            className="bg-blue-800 text-slate-200 hover:bg-blue-700 px-4 py-2 rounded"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      </div>
    </>
  );
}
