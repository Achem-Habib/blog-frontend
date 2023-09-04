import formatDate from "@/lib/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import Tag from "./Tag";

export default function Post({ post }) {
  const { id, slug, date, title, summary, tags, image } = post;

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <div
      key={id}
      className="bg-white dark:bg-gray-800 shadow max-w-sm rounded-lg"
    >
      <div className="relative ">
        <Image
          src={image}
          alt="Picture of the blog image"
          width={300}
          height={200}
          className="w-full aspect-auto"
        />
      </div>

      <div className="px-4 py-5 sm:p-6">
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <Tag key={tag.slug} tag={tag} />
          ))}
        </div>
        <Link
          href={`/blog/${slug}`}
          className="text-lg leading-6 font-semibold text-gray-900 hover:text-sky-500 dark:text-gray-200 dark:hover:text-sky-300 mb-2"
        >
          {title}
        </Link>
        <p className="text-sm leading-5 text-gray-500 dark:text-gray-400 mb-4">
          {truncateText(summary, 200)}
        </p>
        <div className="flex flex-wrap justify-between text-sm leading-5 font-medium text-gray-900 dark:text-gray-400">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className=" font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
          </dl>

          <Link
            href={`/blog/${slug}`}
            className="my-auto text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition ease-in-out duration-150"
          >
            Read More &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
