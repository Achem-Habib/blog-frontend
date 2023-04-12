import Error from "@/components/_child/error";
import Spinner from "@/components/_child/spinner";
import ListLayout from "@/layouts/ListLayout";
import { baseUrl } from "@/lib/constant";
import axios from "axios";
import { useState } from "react";

export const POSTS_PER_PAGE = 5;

export async function getStaticProps() {
  try {
    const res = await axios.get(`${baseUrl}/post-list/`);
    const posts = res.data;

    return {
      props: { posts },
      revalidate: 3600,
    };
  } catch (err) {
    return {
      props: { error: true },
      revalidate: 3600,
    };
  }
}

export default function Blog({ posts, error }) {
  const [loading, setLoading] = useState(!posts && !error);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Spinner />;
  }
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  };
  return (
    <>
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  );
}
