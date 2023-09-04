import { BlogSEO } from "@/components/SEO";
import ScrollTop from "@/components/ScrollTop";
import SectionContainer from "@/components/SectionContainer";
import LatestPosts from "@/components/_child/LatestPosts";
import Error from "@/components/_child/error";
import siteMetadata from "@/data/siteMetadata";
import { baseUrl } from "@/lib/constant";
import formatDate from "@/lib/utils/formatDate";
import axios from "axios";
import parse from "html-react-parser";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Tag from "../../components/Tag";
const ReactDOMServer = require("react-dom/server");

export async function getStaticPaths() {
  const res = await axios.get(`${baseUrl}/post-list`);
  const posts = await res.data;

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

    const latestPostsRes = await axios.get(`${baseUrl}/latest-posts/`);
    const latestPosts = latestPostsRes.data;

    return {
      props: { post, latestPosts },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: { error: true },
      revalidate: 60,
    };
  }
}

export default function Article({ post, latestPosts, error }) {
  if (error) {
    return <Error />;
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
    <SectionContainer>
      <BlogSEO
        title={title}
        summary={summary}
        date={date}
        lastmod={date}
        url={`${siteMetadata.siteUrl}/blog/${slug}`}
        images={image}
        canonicalUrl={`${siteMetadata.siteUrl}/blog/${slug}`}
      />
      <ScrollTop />
      <section className="container mx-auto md:px-2  ">
        <div className="post py-10">
          <div className="flex flex-col pb-4 border-b border-b-slate-300 dark:border-b-slate-600">
            <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {title}
            </h1>

            <dl className="flex gap-x-2 mt-4">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="26"
                  viewBox="0 -960 960 960"
                  width="26"
                  className="fill-gray-500 dark:fill-gray-400"
                >
                  <path d="M483-120q-75 0-141-28.5T226.5-226q-49.5-49-78-115T120-482q0-75 28.5-140t78-113.5Q276-784 342-812t141-28q80 0 151.5 35T758-709v-106h60v208H609v-60h105q-44-51-103.5-82T483-780q-125 0-214 85.5T180-485q0 127 88 216t215 89q125 0 211-88t86-213h60q0 150-104 255.5T483-120Zm122-197L451-469v-214h60v189l137 134-43 43Z" />
                </svg>
              </span>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={date}>Updated {formatDate(date)}</time>
              </dd>
            </dl>

            <div className="mt-4 flex gap-x-2">
              <span className="my-auto">
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                >
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
              </span>

              <span className="flex flex-wrap my-auto">
                {tags.map((tag) => (
                  <Tag key={tag.slug} tag={tag} />
                ))}
              </span>
            </div>
          </div>

          <div className="mt-8  ">
            <Image
              src={baseUrl + image}
              alt="blog image"
              width={800}
              height={500}
              className="  w-full xl:w-3/4 object-cover "
            />
          </div>

          <div className="content prose md:prose-lg  dark:prose-dark mt-10 text-md text-gray-600 dark:text-slate-100 leading-relaxed antialiased dark:font-light ">
            {summary}
          </div>

          <div className="mt-10 content prose md:prose-lg  dark:prose-dark leading-loose antialiased  border border-gray-300 dark:border-gray-700 p-3 py-6 rounded ">
            {convertedTOC}
          </div>

          <div className="mt-8 content prose md:prose-lg  dark:prose-dark leading-loose antialiased  ">
            {convertedBody}
          </div>
        </div>

        <div className="mt-20">
          <LatestPosts posts={latestPosts} error={error} />
        </div>
      </section>
    </SectionContainer>
  );
}
