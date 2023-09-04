import { PageSEO } from "@/components/SEO";
import Tag from "@/components/Tag";
import Error from "@/components/_child/error";
import siteMetadata from "@/data/siteMetadata";
import { baseUrl } from "@/lib/constant";
import axios from "axios";
import Link from "next/link";

export async function getStaticProps() {
  try {
    const res = await axios.get(`${baseUrl}/tags/`);
    const data = res.data;
    return {
      props: { data },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: { error: true },
      revalidate: 60,
    };
  }
}

export default function Tags({ data, error }) {
  if (error) {
    return <Error />;
  }

  const tags = data;

  return (
    <>
      <PageSEO
        title={`Tags - ${siteMetadata.author}`}
        description="Things I blog about"
      />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14">
            Tags
          </h1>
        </div>
        <div className="flex max-w-lg flex-wrap">
          {Object.keys(tags).length === 0 && "No tags found."}
          {tags.map((tag) => {
            return (
              <div key={tag.slug} className="mt-2 mb-2 mr-5">
                <Tag tag={tag} />
                <Link href={`/tags/${tag.slug}`}>
                  <span className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300">
                    ({tag.post_count})
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
