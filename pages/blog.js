import Error from "@/components/_child/error";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { baseUrl } from "@/lib/constant";
import axios from "axios";

import { PageSEO } from "@/components/SEO";

export const POSTS_PER_PAGE = 10;

export async function getStaticProps() {
  try {
    const res = await axios.get(`${baseUrl}/post-list/`);
    const posts = res.data;

    return {
      props: { posts },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: { error: true },
      revalidate: 60,
    };
  }
}

export default function Blog({ posts, error }) {
  if (error) {
    return <Error />;
  }

  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };
  return (
    <>
      <PageSEO
        title={`Blog - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  );
}
