import Post from "../Post";

export default function Related({ posts }) {
  return (
    <section className="pt-20 flex flex-col">
      <h1 className="font-bold text-3xl py-10">Related</h1>

      <div className="pt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-14 mx-auto">
        {!posts.length && "No posts found."}
        {posts.map((post, index) => (
          <Post key={index} post={post}></Post>
        ))}
      </div>
    </section>
  );
}
