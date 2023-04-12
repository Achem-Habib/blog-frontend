import Related from "@/components/_child/Related";
import Error from "@/components/_child/error";
import Spinner from "@/components/_child/spinner";
import { baseUrl } from "@/lib/constant";
import formatDate from "@/lib/utils/formatDate";
import axios from "axios";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import { useState } from "react";
const ReactDOMServer = require("react-dom/server");

export async function getStaticPaths() {
  const res = await fetch(`${baseUrl}/post-list`);
  const posts = await res.json();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const response = await axios.get(`${baseUrl}/post/?slug=${params.slug}`);
    const post = await response.data;

    const relatedPostsResponse = await axios.get(`${baseUrl}/latest-posts/`);
    const relatedPosts = relatedPostsResponse.data;

    return {
      props: { post, relatedPosts },
      revalidate: 3600,
    };
  } catch (err) {
    return {
      props: { error: true },
      revalidate: 3600,
    };
  }
}

export default function Article({ post, relatedPosts, error }) {
  const [loading, setLoading] = useState(!post && !error && !relatedPosts);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Spinner />;
  }

  const {
    id,
    slug,
    date,
    title,
    table_of_contents,
    body,
    summary,
    tags,
    image,
  } = post;
  const cleanedSummary = DOMPurify.sanitize(summary);
  const convertedSummary = parse(cleanedSummary);

  const cleanedTOC = DOMPurify.sanitize(table_of_contents);
  const convertedTOC = parse(cleanedTOC);

  const cleanedBody = DOMPurify.sanitize(body);
  const convertedBody = parse(cleanedBody, {
    replace: (domNode) => {
      if (domNode.name === "img") {
        const src = domNode.attribs.src;
        if (src.startsWith("/media/")) {
          const imageUrl = `${baseUrl}${src}`;
          domNode.attribs.src = imageUrl;
        }
      }
    },
  });

  return (
    <section className="container mx-auto md:px-2  ">
      <div className="post py-10">
        <div className="flex flex-col pb-4 border-b border-b-slate-300 dark:border-b-slate-600">
          <h1 className="font-bold text-4xl text-center pb-5">
            {title || "No Title"}
          </h1>

          <dl className="mx-auto">
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
          </dl>
        </div>

        <div className="mt-8">
          <Image
            src={baseUrl + image}
            alt="Picture of the blog image"
            width={500}
            height={500}
          />
        </div>

        <div className="prose md:prose-lg  dark:prose-dark mt-10 text-md text-gray-600 dark:text-slate-100 leading-relaxed antialiased dark:font-light ">
          {convertedSummary}
        </div>

        <div className="my-10 bg-gray-50 dark:bg-gray-900  border border-gray-300 dark:border-gray-700 p-3 py-6 rounded flex flex-col gap-y-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Table of Contents
          </h2>

          <div className="prose md:prose-lg  dark:prose-dark ml-16 text-teal-600 ">
            {convertedTOC}
          </div>
        </div>

        <div className="content prose md:prose-lg  dark:prose-dark leading-loose antialiased  ">
          {convertedBody}
        </div>
      </div>

      <Related posts={relatedPosts} />
    </section>
  );
}
