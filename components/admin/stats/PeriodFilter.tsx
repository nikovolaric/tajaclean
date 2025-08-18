"use client";

import { useStatsContext } from "./StatsContextProvider";

function PeriodFilter() {
  const { stats, setStats } = useStatsContext();

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-xs">
      <div className="flex items-center rounded-lg border border-black/25 bg-[#FAFAFA] p-3 py-1 text-sm font-semibold">
        <button
          className={`cursor-pointer rounded-lg px-3 py-1 ${stats.days === 365 ? "border border-black/25 bg-white shadow-xs" : ""}`}
          onClick={() => setStats({ ...stats, days: 365 })}
        >
          12 mesecev
        </button>
        <button
          className={`cursor-pointer rounded-lg px-3 py-1 ${stats.days === 30 ? "border border-black/25 bg-white shadow-xs" : ""}`}
          onClick={() => setStats({ ...stats, days: 30 })}
        >
          30 dni
        </button>
        <button
          className={`cursor-pointer rounded-lg px-3 py-1 ${stats.days === 7 ? "border border-black/25 bg-white shadow-xs" : ""}`}
          onClick={() => setStats({ ...stats, days: 7 })}
        >
          7 dni
        </button>
        {/* <button
          className={`cursor-pointer rounded-lg px-3 py-1 ${stats.days === 1 ? "bg-white shadow-xs" : ""}`}
          onClick={() => setStats({ ...stats, days: 1 })}
        >
          24 ur
        </button> */}
      </div>
      <p className="text-sm font-medium">
        {new Date(
          Date.now() - stats.days * 24 * 60 * 60 * 1000,
        ).toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}{" "}
        -{" "}
        {new Date().toLocaleDateString("sl-SI", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}
      </p>
    </div>
  );
}

export default PeriodFilter;
