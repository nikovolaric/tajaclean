"use client";

import { Calendar } from "lucide-react";
import { useStatsContext } from "./StatsContextProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function PeriodFilter() {
  const { stats, setStats } = useStatsContext();

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-xs">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-lg border border-black/25 bg-[#FAFAFA] p-3 py-1 text-sm font-semibold">
          <button
            className={`cursor-pointer rounded-lg px-3 py-1 ${!stats.end_date && stats.days === 365 ? "border border-black/25 bg-white shadow-xs" : ""}`}
            onClick={() =>
              setStats({
                ...stats,
                days: 365,
                start_date: undefined,
                end_date: undefined,
              })
            }
          >
            12 mesecev
          </button>
          <button
            className={`cursor-pointer rounded-lg px-3 py-1 ${!stats.end_date && stats.days === 30 ? "border border-black/25 bg-white shadow-xs" : ""}`}
            onClick={() =>
              setStats({
                ...stats,
                days: 30,
                start_date: undefined,
                end_date: undefined,
              })
            }
          >
            30 dni
          </button>
          <button
            className={`cursor-pointer rounded-lg px-3 py-1 ${!stats.end_date && stats.days === 7 ? "border border-black/25 bg-white shadow-xs" : ""}`}
            onClick={() =>
              setStats({
                ...stats,
                days: 7,
                start_date: undefined,
                end_date: undefined,
              })
            }
          >
            7 dni
          </button>
          <button
            className={`cursor-pointer rounded-lg px-3 py-1 ${!stats.end_date && stats.days === 1 ? "border border-black/25 bg-white shadow-xs" : ""}`}
            onClick={() =>
              setStats({
                ...stats,
                days: 1,
                start_date: undefined,
                end_date: undefined,
              })
            }
          >
            24 ur
          </button>
        </div>
        <DatePicker
          selectsRange
          startDate={stats.start_date}
          endDate={stats.end_date}
          onChange={(dates: [Date | null, Date | null]) => {
            const toUTCDate = (date: Date) =>
              new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
              );
            const [start, end] = dates;

            setStats({
              ...stats,
              start_date: start ? toUTCDate(start) : undefined,
              end_date: end ? toUTCDate(end) : undefined,
            });
          }}
          customInput={<Calendar className="cursor-pointer" />}
        />
        {stats.start_date && stats.end_date && (
          <button
            type="button"
            onClick={() => {
              setStats({
                ...stats,
                start_date: undefined,
                end_date: undefined,
              });
            }}
            className="cursor-pointer rounded-xl border px-2 py-1 text-sm shadow-sm hover:bg-gray-100"
          >
            Počisti
          </button>
        )}
      </div>
      <p className="text-sm font-medium">
        {new Date(
          stats.start_date && stats.end_date
            ? stats.start_date
            : Date.now() - stats.days * 24 * 60 * 60 * 1000,
        ).toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}{" "}
        -{" "}
        {new Date(
          stats.start_date && stats.end_date ? stats.end_date : Date.now(),
        ).toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
    </div>
  );
}

export default PeriodFilter;
