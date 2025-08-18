"use client";

import { useEffect, useState } from "react";
import { useStatsContext } from "./StatsContextProvider";
import {
  getAverageByDays,
  getOrdersByDays,
  getSalesByDays,
} from "@/lib/orderActions";

function SalesByPeriod() {
  const { stats, setStats } = useStatsContext();
  const [chartData, setChartData] = useState([]);
  const [salesTotal, setSalesTotal] = useState({ total: 0, growth: 0 });
  const [ordersTotal, setOrdersTotal] = useState({ total: 0, growth: 0 });
  const [averageTotal, setAverageTotal] = useState({ total: 0, growth: 0 });

  useEffect(
    function () {
      async function getSales() {
        const salesData = await getSalesByDays(stats.days);
        setSalesTotal({
          total: salesData.total_sum,
          growth: salesData.growth_percent,
        });

        if (stats.sales) {
          setChartData(salesData.data);
        }

        const ordersData = await getOrdersByDays(stats.days);
        setOrdersTotal({
          total: ordersData.total_sum,
          growth: ordersData.growth_percent,
        });

        if (stats.orders) {
          setChartData(ordersData.data);
        }

        const averageData = await getAverageByDays(stats.days);
        setAverageTotal({
          total: averageData.total_sum,
          growth: averageData.growth_percent,
        });

        if (stats.average) {
          setChartData(averageData.data);
        }
      }

      getSales();
    },
    [stats],
  );

  return (
    <div className="rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
      <div className="flex gap-16 select-none">
        <div
          className={`flex cursor-pointer flex-col gap-3 py-2 ${stats.sales ? "border-b-2 border-black/50" : ""}`}
          onClick={() =>
            setStats({ ...stats, average: false, orders: false, sales: true })
          }
        >
          <p className="text-black/50">Skupna prodaja</p>
          <p className="text-xl font-semibold">
            {new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
            }).format(salesTotal.total)}
          </p>
        </div>{" "}
        <div
          className={`flex cursor-pointer flex-col gap-3 py-2 ${stats.orders ? "border-b-2 border-black/50" : ""}`}
          onClick={() =>
            setStats({ ...stats, average: false, orders: true, sales: false })
          }
        >
          <p className="text-black/50">Število naročil</p>
          <p className="text-xl font-semibold">{ordersTotal.total}</p>
        </div>{" "}
        <div
          className={`flex cursor-pointer flex-col gap-3 py-2 ${stats.average ? "border-b-2 border-black/50" : ""}`}
          onClick={() =>
            setStats({ ...stats, average: true, orders: false, sales: false })
          }
        >
          <p className="text-black/50">Povp. vrednost naročila</p>
          <p className="text-xl font-semibold">
            {new Intl.NumberFormat("sl-SI", {
              style: "currency",
              currency: "EUR",
            }).format(averageTotal.total)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SalesByPeriod;
