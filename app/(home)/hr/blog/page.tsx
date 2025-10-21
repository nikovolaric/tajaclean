import { type Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getAllBlogPosts } from "@/lib/blogActions";
import LastPost from "@/components/hr/blog/LastPost";
import BlogList from "@/components/hr/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
};

async function Page() {
  const data = await getAllBlogPosts({ hr: true });

  type BlogPost = {
    coverImg: string;
    slug: string;
    html_hr: string;
    title_hr: string;
  };

  if (!data) {
    return (
      <>
        <PageHeader page="BLOG" />
        <main>
          <p className="font-lora font text-center text-xl font-medium">
            Zbog obnove naše internetske trgovine, stranica bloga bit će
            dostupna za nekoliko dana.
            <br />
            <br />
            Ispričavamo se zbog neugodnosti.
          </p>
        </main>
      </>
    );
  }

  const posts = data as BlogPost[];

  return (
    <>
      <PageHeader page="BLOG">
        Saznajte više o našoj čudesnoj krpici i pridružite se našim izazovima
        čišćenja!
      </PageHeader>
      <main>
        <LastPost post={posts[0]} />
        <BlogList posts={posts.slice(1)} />
      </main>
    </>
  );
}

export default Page;
