"use client";

import { useEffect, useState } from "react";
import { useStatsContext } from "./StatsContextProvider";
import {
  getAverageByDays,
  getOrdersByDays,
  getSalesByDays,
} from "@/lib/orderActions";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";
import Spinner from "@/components/Spinner";

function SalesByPeriod() {
  const { stats, setStats } = useStatsContext();
  const [chartData, setChartData] = useState([]);
  const [salesTotal, setSalesTotal] = useState({ total: 0, growth: 0 });
  const [ordersTotal, setOrdersTotal] = useState({ total: 0, growth: 0 });
  const [averageTotal, setAverageTotal] = useState({ total: 0, growth: 0 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      try {
        setIsLoading(true);
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
            growth: ordersData.percent_change,
          });

          if (stats.orders) {
            setChartData(ordersData.data);
          }

          const averageData = await getAverageByDays(stats.days);
          setAverageTotal({
            total: averageData.total_sum,
            growth: averageData.percent_change,
          });

          if (stats.average) {
            setChartData(averageData.data);
          }
        }

        getSales();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [stats],
  );

  return (
    <div className="flex flex-col gap-8 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex gap-16 select-none">
            <div
              className={`flex cursor-pointer flex-col gap-3 py-2 ${stats.sales ? "border-b-2 border-black/50" : ""}`}
              onClick={() =>
                setStats({
                  ...stats,
                  average: false,
                  orders: false,
                  sales: true,
                })
              }
            >
              <p className="text-black/50">Skupna prodaja</p>
              <p className="text-xl font-semibold">
                {new Intl.NumberFormat("sl-SI", {
                  style: "currency",
                  currency: "EUR",
                }).format(salesTotal.total)}
              </p>
              <p
                className={`flex items-center gap-2 font-semibold ${salesTotal.growth > 0 ? "text-green-600" : salesTotal.growth < 0 ? "text-red-600" : ""}`}
              >
                {salesTotal.growth === 0 ? (
                  "-"
                ) : (
                  <>
                    {salesTotal.growth > 0 ? (
                      <ArrowUp />
                    ) : salesTotal.growth < 0 ? (
                      <ArrowDown />
                    ) : (
                      <></>
                    )}
                    {salesTotal.growth.toFixed(2).replace(".", ",")}%
                  </>
                )}
              </p>
            </div>
            <div
              className={`flex cursor-pointer flex-col gap-3 py-2 ${stats.orders ? "border-b-2 border-black/50" : ""}`}
              onClick={() =>
                setStats({
                  ...stats,
                  average: false,
                  orders: true,
                  sales: false,
                })
              }
            >
              <p className="text-black/50">Število naročil</p>
              <p className="text-xl font-semibold">{ordersTotal.total}</p>
              <p
                className={`flex items-center gap-2 font-semibold ${ordersTotal.growth > 0 ? "text-green-600" : ordersTotal.growth < 0 ? "text-red-600" : ""}`}
              >
                {ordersTotal.growth === 0 ? (
                  "-"
                ) : (
                  <>
                    {ordersTotal.growth > 0 ? (
                      <ArrowUp />
                    ) : ordersTotal.growth < 0 ? (
                      <ArrowDown />
                    ) : (
                      <></>
                    )}{" "}
                    {ordersTotal.growth.toFixed(2).replace(".", ",")}%
                  </>
                )}
              </p>
            </div>
            <div
              className={`flex cursor-pointer flex-col gap-3 py-2 ${stats.average ? "border-b-2 border-black/50" : ""}`}
              onClick={() =>
                setStats({
                  ...stats,
                  average: true,
                  orders: false,
                  sales: false,
                })
              }
            >
              <p className="text-black/50">Povp. vrednost naročila</p>
              <p className="text-xl font-semibold">
                {new Intl.NumberFormat("sl-SI", {
                  style: "currency",
                  currency: "EUR",
                }).format(averageTotal.total)}
              </p>
              <p
                className={`flex items-center gap-2 font-semibold ${averageTotal.growth > 0 ? "text-green-600" : averageTotal.growth < 0 ? "text-red-600" : ""}`}
              >
                {averageTotal.growth === 0 ? (
                  "-"
                ) : (
                  <>
                    {averageTotal.growth > 0 ? (
                      <ArrowUp />
                    ) : averageTotal.growth < 0 ? (
                      <ArrowDown />
                    ) : (
                      <></>
                    )}
                    {averageTotal.growth.toFixed(2).replace(".", ",")}%
                  </>
                )}
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart width={600} height={500} data={chartData}>
                <XAxis
                  dataKey="sale_date"
                  tickFormatter={(_, index) => {
                    if (chartData.length > 31) {
                      const step = Math.floor(chartData.length / 12);
                      return index % step === 0 ? `${index / step + 1}` : "";
                    } else {
                      return `${index + 1}`;
                    }
                  }}
                  interval={0}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default SalesByPeriod;
