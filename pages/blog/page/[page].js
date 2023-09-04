import { PageSEO } from "@/components/SEO";
import Error from "@/components/_child/error";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { baseUrl } from "@/lib/constant";
import axios from "axios";
import { POSTS_PER_PAGE } from "../../blog";

export async function getStaticPaths() {
  const res = await axios.get(`${baseUrl}/post-list`);
  const totalPosts = await res.data;
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE);
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context;

  try {
    const res = await axios.get(`${baseUrl}/post-list`);
    const posts = res.data;

    const pageNumber = parseInt(page);
    const initialDisplayPosts = posts.slice(
      POSTS_PER_PAGE * (pageNumber - 1),
      POSTS_PER_PAGE * pageNumber
    );
    const pagination = {
      currentPage: pageNumber,
      totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
    };
    return {
      props: { posts, initialDisplayPosts, pagination },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: { error: true },
      revalidate: 60,
    };
  }
}

export default function PostPage({
  posts,
  initialDisplayPosts,
  pagination,
  error,
}) {
  if (error) {
    return <Error />;
  }

  return (
    <>
      <PageSEO
        title={siteMetadata.title}
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
