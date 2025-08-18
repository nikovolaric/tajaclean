import { type Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { getAllBlogPosts } from "@/lib/blogActions";
import LastPost from "@/components/blog/LastPost";
import BlogList from "@/components/blog/BlogList";

export const metadata: Metadata = {
  title: "Blog",
};

async function Page() {
  const data = await getAllBlogPosts();

  type BlogPost = {
    coverImg: string;
    slug: string;
    html: string;
    title: string;
  };

  if (!data) {
    return (
      <>
        <PageHeader page="BLOG" />
        <main>
          <p className="font-lora font text-center text-xl font-medium">
            Zaradi prenove naše spletne trgovine bo stran blog na voljo čez
            nekaj dni.
            <br />
            <br />
            Se opravičujemo za nevšečnosti.
          </p>
        </main>
      </>
    );
  }

  const posts = data as BlogPost[];

  return (
    <>
      <PageHeader page="BLOG">
        Izvedite več o naši čudežni krpici in se pridružite našim izzivom
        čiščenja!
      </PageHeader>
      <main>
        <LastPost post={posts[0]} />
        <BlogList posts={posts.slice(1)} />
      </main>
    </>
  );
}

export default Page;
