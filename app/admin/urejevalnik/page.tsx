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
    </div>
  );
}

export default Page;
