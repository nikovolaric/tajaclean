import { getAllBlogPosts } from "@/lib/blogActions";
import BlogCard from "./BlogCard";

async function BlogList() {
  const data = await getAllBlogPosts();

  return (
    <div className="flex flex-col gap-4">
      {(data as Array<[]>).length === 0 ? (
        <p className="font-semibold">
          V spletni trgovini še ni objavljenih blog objav.
        </p>
      ) : (
        <>
          <NameBar />
          {(
            data as Array<{
              title: string;
              created_at: string;
              slug: string;
            }>
          ).map((blog: { title: string; created_at: string; slug: string }) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
}

function NameBar() {
  return (
    <>
      <p className="text-lg font-medium">
        Seznam blog objav v spletni trgovini
      </p>
      <div className="grid grid-cols-[7fr_4fr_4fr] text-sm">
        <p className="w-full rounded-s-lg border border-black/25 bg-white px-6 py-2 font-semibold shadow-sm">
          Naslov blog objave
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Datum objave
        </p>
        <p className="w-full rounded-e-lg border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Uredi
        </p>
      </div>
    </>
  );
}

export default BlogList;
