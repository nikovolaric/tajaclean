import { type Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Blog",
};

function Page() {
  return (
    <>
      <PageHeader page="BLOG" />
      <main>
        <p className="font-lora font text-center text-xl font-medium">
          Zaradi prenove naše spletne trgovine bo stran blog na voljo čez nekaj
          dni.
          <br />
          <br />
          Se opravičujemo za nevšečnosti.
        </p>
      </main>
    </>
  );
}

export default Page;
