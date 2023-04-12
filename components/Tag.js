import Link from "next/link";

const Tag = ({ tag }) => {
  return (
    <Link href={`/tags/${tag.slug}`}>
      <span className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {tag.name}
      </span>
    </Link>
  );
};

export default Tag;
