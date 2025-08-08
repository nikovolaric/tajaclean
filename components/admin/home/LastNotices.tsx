import { getNotices } from "@/app/_lib/noticeAPI";
import LinkBtn from "../LinkBtn";

async function LastNotices() {
  const data = await getNotices(2);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Urejevalnik spletne trgovine</p>
      <div className="flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
        {data.results === 0 && (
          <p className="font-semibold">Trenutno ni objavljenih novic.</p>
        )}
        {data.results > 0 && (
          <ul className="flex flex-col gap-8">
            {data.notices.map((notice: { _id: string; title: string }) => (
              <LastNoticeCard key={notice._id} notice={notice} />
            ))}
          </ul>
        )}
        <LinkBtn type="primary" href="/admin/urejevalnik">
          Odpri urejevalnik vsebine
        </LinkBtn>
      </div>
    </div>
  );
}

function LastNoticeCard({
  notice,
}: {
  notice: { _id: string; title: string };
}) {
  return (
    <li className="flex flex-col gap-2">
      <p className="text-secondary text-sm font-medium">Zadnje novice</p>
      <p className="text-sm font-medium">{notice.title}</p>
    </li>
  );
}

export default LastNotices;
