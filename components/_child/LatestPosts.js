import Error from "@/components/_child/error";
import Post from "../Post";

const MAX_DISPLAY = 6;

export default function LatestPosts({ posts, error }) {
  return (
    <div className="flex flex-col">
      <div className="space-y-2 mt-6 mb-8 pb-4 md:space-y-5 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-700 dark:text-gray-200 sm:text-4xl sm:leading-10">
          Latest Posts
        </h1>
      </div>
      {error ? (
        <Error />
      ) : (
        <div className="mx-auto pt-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-14">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => (
            <Post key={index} post={post}></Post>
          ))}
        </div>
      )}
    </div>
  );
}
