import BlogCard from "./BlogCard";

async function BlogList() {
  const data = { results: 0 };

  return (
    <div className="flex flex-col gap-4">
      {data.results === 0 ? (
        <p className="font-semibold">
          V spletni trgovini še ni objavljenih novic.
        </p>
      ) : (
        <>
          <NameBar />
          {/* {data.notices.map(
            (notice: {
              title: string;
              updatedAt: string;
              visible: boolean;
              _id: string;
              text: string;
              btn: string;
              btnLink: string;
              coverImg: string;
            }) => (
              <BlogCard key={notice._id} notice={notice} />
            ),
          )} */}
        </>
      )}
    </div>
  );
}

function NameBar() {
  return (
    <>
      <p className="text-lg font-medium">Seznam novic v spletni trgovini</p>
      <div className="grid grid-cols-[7fr_4fr_4fr_4fr] text-sm">
        <p className="w-full rounded-s-lg border border-black/25 bg-white px-6 py-2 font-semibold shadow-sm">
          Naslov novice
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Datum objave
        </p>
        <p className="w-full border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Vidnost
        </p>
        <p className="w-full rounded-e-lg border-y border-e border-black/25 bg-white py-2 text-center font-semibold shadow-sm">
          Uredi
        </p>
      </div>
    </>
  );
}

export default BlogList;
