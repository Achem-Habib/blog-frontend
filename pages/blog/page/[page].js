import ListLayout from "@/layouts/ListLayout";
import { baseUrl } from "@/lib/constant";
import { POSTS_PER_PAGE } from "../../blog";

export async function getStaticPaths() {
  const res = await fetch(`${baseUrl}/post-list`);
  const totalPosts = await res.json();
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

  const res = await fetch(`${baseUrl}/post-list`);
  const posts = await res.json();

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
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  };
}

export default function PostPage({ posts, initialDisplayPosts, pagination }) {
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
