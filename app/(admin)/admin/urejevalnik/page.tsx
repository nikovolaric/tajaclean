import AddNotice from "@/components/admin/editor/AddBlog";
import BlogList from "@/components/admin/editor/BlogList";
import EditBlogForm from "@/components/admin/editor/EditBlogForm";
import ENews from "@/components/admin/editor/ENews";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Urejevalnik",
};

function Page() {
  return (
    <div className="flex flex-col gap-20">
      <p className="text-xl font-semibold">
        Urejevalnik vsebine v spletni trgovini
      </p>
      <div className="flex flex-col gap-10">
        <p className="text-lg font-semibold">Blog objave</p>
        <BlogList />
        <AddNotice />
        <EditBlogForm />
      </div>
      <div className="flex flex-col gap-10">
        <p className="text-lg font-semibold">Prijava na e-novičke</p>
        <ENews />
      </div>
    </div>
  );
}

export default Page;
