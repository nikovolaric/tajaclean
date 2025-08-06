import { createClient } from "@/lib/supabase/client";
import ArticlesCard from "./ArticlesCard";

async function Articles() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("stock", { ascending: false });

  if (error) {
    return <></>;
  }

  const imgs = await Promise.all(
    data.map(async (article) => {
      const { data: imgData } = supabase.storage
        .from("articles")
        .getPublicUrl(article.img);

      return imgData.publicUrl;
    }),
  );

  return (
    <div className="grid gap-10 md:mx-auto md:w-2/3 lg:w-full lg:grid-cols-3 lg:gap-x-5">
      {data.map((article, i) => (
        <ArticlesCard key={article.id} article={article} img={imgs[i]!} />
      ))}
    </div>
  );
}

export default Articles;
