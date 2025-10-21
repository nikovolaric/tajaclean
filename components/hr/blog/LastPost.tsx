import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { H3 } from "@/components/Text";
import LinkBtn from "@/components/LinkBtn";

async function LastPost({
  post,
}: {
  post: { coverImg: string; slug: string; html_hr: string; title_hr: string };
}) {
  const supabase = await createClient();

  const { data } = supabase.storage.from("blog").getPublicUrl(post.coverImg);

  return (
    <div className="bg-secondary1/15 ml-[calc(-50vw+50%)] w-[100vw] py-10 lg:py-16">
      <div className="mx-4 flex max-w-[1440px] flex-col gap-6 md:mx-8 lg:mx-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-x-20 xl:mx-auto xl:px-20">
        <Image
          src={data.publicUrl}
          alt="Naslovna slika"
          width={540}
          height={340}
          className="h-auto max-h-85 w-full object-cover"
        />
        <div className="flex flex-col gap-6 lg:gap-10">
          <H3 className="text-xl">{post.title_hr}</H3>
          <p
            dangerouslySetInnerHTML={{
              __html: post.html_hr.match(/<p>(.*?)<\/p>/)?.[1] || "",
            }}
          />

          <LinkBtn variant="secondary" href={`/hr/blog/${post.slug}`}>
            Pročitaj više
          </LinkBtn>
        </div>
      </div>
    </div>
  );
}

export default LastPost;
