import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { H3 } from "../Text";
import LinkBtn from "../LinkBtn";
import { Suspense } from "react";

function BlogList({
  posts,
}: {
  posts: { coverImg: string; slug: string; html: string; title: string }[];
}) {
  return (
    <div className="flex flex-col gap-16 md:grid md:grid-cols-2 md:gap-x-5 lg:grid-cols-3">
      <Suspense>
        {posts.map((el) => (
          <BlogListCard post={el} key={el.slug} />
        ))}
      </Suspense>
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

  console.log(data);

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
      <p
        className="h-25 overflow-clip"
        dangerouslySetInnerHTML={{ __html: post.html.split("<p>")[1] }}
      />

      <LinkBtn
        variant="secondary"
        href={`/blog/${post.slug}`}
        className="self-end"
      >
        Preberi več
      </LinkBtn>
    </div>
  );
}

export default BlogList;
