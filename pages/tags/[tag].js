import Error from "@/components/_child/error";
import Spinner from "@/components/_child/spinner";
import ListLayout from "@/layouts/ListLayout";
import { baseUrl } from "@/lib/constant";
import axios from "axios";
import { useState } from "react";

export async function getStaticPaths() {
  const res = await axios.get(`${baseUrl}/tags/`);
  const tags = res.data;

  const paths = tags.map((tag) => ({ params: { tag: tag.slug } }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  try {
    const res = await axios.get(`${baseUrl}/tag/${params.tag}`);
    const posts = res.data;
    return {
      props: { posts: posts, tag: params.tag },
      revalidate: 3600,
    };
  } catch (err) {
    return {
      props: { error: true },
      revalidate: 3600,
    };
  }
}

export default function Tag({ posts, tag, error }) {
  // Capitalize first letter and convert space to dash
  const title = tag;
  const [loading, setLoading] = useState(!posts && !error);

  if (error) {
    return <Error />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ListLayout posts={posts} title={title} />
    </>
  );
}
