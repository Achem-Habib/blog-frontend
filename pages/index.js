// components
import Post from "@/components/Post";
import Error from "@/components/_child/error";
import Newsletter from "@/components/_child/newsletter";
import Spinner from "@/components/_child/spinner";
import { baseUrl } from "@/lib/constant";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const MAX_DISPLAY = 5;

export default function Home({ latestPosts, error }) {
  const [loading, setLoading] = useState(
    !latestPosts && !mostPopularPosts && !error
  );

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {/* Welcoming speech for home page */}
      <div className="flex flex-col items-center my-6 xl:flex-row gap-x-12 xl:mb-12">
        <div className="pt-6">
          <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-purple-500 dark:text-fuchsia-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Welcome to our blockchain technology blog!
          </h1>
          <h2 className="text-lg prose text-gray-600 dark:text-gray-400">
            Here, we aim to provide you with the latest news and insights on
            theme ever-evolving world of blockchain and cryprocurrency. Join us
            on our journey to discover the potential of blockchain and stay
            up-to-date with the latest trends and advancements in this exciting
            field
          </h2>
        </div>
        <Newsletter></Newsletter>
      </div>

      {/* Latest posts */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-violet-600 dark:text-blue-400 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest Posts
          </h1>
        </div>
        <div className="pt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-14">
          {!latestPosts.length && "No posts found."}
          {latestPosts.slice(0, MAX_DISPLAY).map((post, index) => (
            <Post key={index} post={post}></Post>
          ))}
        </div>
      </div>

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
  );
}

export async function getStaticProps() {
  try {
    const latestPostsRes = await axios.get(`${baseUrl}/latest-posts/`);
    const latestPosts = latestPostsRes.data;

    return {
      props: { latestPosts },
      revalidate: 3600,
    };
  } catch (err) {
    return {
      props: { error: true },
      revalidate: 3600,
    };
  }
}
