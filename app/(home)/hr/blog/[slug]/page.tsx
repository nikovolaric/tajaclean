import LinkBtn from "@/components/LinkBtn";
import PageHeader from "@/components/PageHeader";
import { H2 } from "@/components/Text";
import { getOnePost } from "@/lib/blogActions";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const data = await getOnePost({ slug });

  return { title: data.title_hr };
}

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await getOnePost({ slug });

  return (
    <>
      <PageHeader />
      <div className="mt-25 flex flex-col gap-10 lg:mt-30 lg:gap-14">
        <H2>{data.title_hr}</H2>
        <div
          dangerouslySetInnerHTML={{
            __html: data.html_hr.replaceAll("<p></p>", "<br/>"),
          }}
          className="editor"
        />
        <LinkBtn variant="primary" href="/hr/blog" className="self-center">
          Natrag na sve objave
        </LinkBtn>
      </div>
    </>
  );
}

export default Page;
