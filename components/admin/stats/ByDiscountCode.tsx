"use client";

import Spinner from "@/components/Spinner";
import { useStatsContext } from "@/components/admin/stats/StatsContextProvider";
import { getIncomeByDiscounts } from "@/lib/discountActions";
import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

function ByDiscountCode() {
  const { stats } = useStatsContext();
  const [isLoading, setIsLoading] = useState(false);
  const [discountData, setDiscountData] = useState({
    total_sum: 0,
    by_code: [],
  });

  useEffect(
    function () {
      async function getDiscountData() {
        setIsLoading(true);
        try {
          if (stats.start_date && stats.end_date) {
            const data = await getIncomeByDiscounts({
              start_date: stats.start_date,
              end_date: stats.end_date,
            });

            setDiscountData(data);
          } else {
            const data = await getIncomeByDiscounts({
              start_date: new Date(
                Date.now() - stats.days * 24 * 60 * 60 * 1000,
              ),
            });

            setDiscountData(data);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }

      getDiscountData();
    },
    [stats.days, stats.start_date, stats.end_date],
  );

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const top3Codes = [...discountData.by_code]
    .sort(
      (a: { total_sum: number }, b: { total_sum: number }) =>
        b.total_sum - a.total_sum,
    )
    .slice(0, 3)
    .map((el: { code: string }) => el.code);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Prodaja glede na kode za popust</p>
      <div className="flex h-full min-h-62 flex-col justify-between gap-4 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
        {isLoading ? (
          <Spinner />
        ) : (
          <ResponsiveContainer>
            <PieChart width={730} height={250}>
              <Pie
                dataKey="total_sum"
                nameKey="code"
                data={discountData.by_code}
                innerRadius={40}
                outerRadius={80}
                label={({ name }) => (top3Codes.includes(name) ? name : "")}
              >
                {discountData.by_code.map((el: { code: string }) => (
                  <Cell key={el.code} fill={getRandomColor()} />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (!payload || !payload.length) return null;
                  const data = payload[0].payload;
                  return (
                    <div
                      style={{
                        background: "#fff",
                        padding: "4px 8px",
                        border: "1px solid #ccc",
                      }}
                    >
                      <strong>{data.code}</strong>:{" "}
                      {new Intl.NumberFormat("sl-SI", {
                        style: "currency",
                        currency: "EUR",
                      }).format(data.total_sum)}
                    </div>
                  );
                }}
              />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={16}
                fontWeight="600"
              >
                <tspan x="50%" dy="-0.6em" fontSize={12} fontWeight="400">
                  Skupaj
                </tspan>
                <tspan x="50%" dy="1.2em">
                  {new Intl.NumberFormat("sl-SI", {
                    style: "currency",
                    currency: "EUR",
                  }).format(discountData.total_sum)}
                </tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default ByDiscountCode;
