import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { H3 } from "@/components/Text";
import LinkBtn from "@/components/LinkBtn";

function BlogList({
  posts,
}: {
  posts: { coverImg: string; slug: string; html: string; title: string }[];
}) {
  return (
    <div className="flex flex-col gap-16 md:grid md:grid-cols-2 md:gap-x-5 lg:grid-cols-3">
      {posts.map((el) => (
        <BlogListCard post={el} key={el.slug} />
      ))}
    </div>
  );
}

async function BlogListCard({
  post,
}: {
  post: { coverImg: string; slug: string; html: string; title: string };
}) {
  const supabase = await createClient();

  const { data } = supabase.storage.from("blog").getPublicUrl(post.coverImg);

  return (
    <div className="flex flex-col gap-6">
      <Image
        src={data.publicUrl}
        alt="Naslovna slika"
        width={413}
        height={272}
        className="h-auto max-h-68 w-full object-cover"
      />
      <H3 className="text-xl">{post.title}</H3>
      <p className="h-25 overflow-clip">
        {post.html
          .split("<p>")[1]
          .replaceAll("<br>", "")
          .replaceAll("</p>", "")}
      </p>
      <LinkBtn
        variant="secondary"
        href={`/hr/blog/${post.slug}`}
        className="self-end"
      >
        Pročitaj više
      </LinkBtn>
    </div>
  );
}

export default BlogList;
