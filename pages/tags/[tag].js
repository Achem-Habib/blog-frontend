import { TagSEO } from "@/components/SEO";
import Error from "@/components/_child/error";
import siteMetadata from "@/data/siteMetadata";
import ListLayout from "@/layouts/ListLayout";
import { baseUrl } from "@/lib/constant";
import axios from "axios";

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
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: { error: true },
      revalidate: 60,
    };
  }
}

export default function Tag({ posts, tag, error }) {
  // Capitalize first letter and convert space to dash
  const title = tag;

  if (error) {
    return <Error />;
  }

  return (
    <>
      <TagSEO
        title={`${tag} - ${siteMetadata.author}`}
        description={`${tag} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={posts} title={title} />
    </>
  );
}
