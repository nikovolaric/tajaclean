"use client";

import { compareSalesByCodes } from "@/lib/orderActions";
import { useStatsContext } from "./StatsContextProvider";
import { useEffect, useState } from "react";
import { Spinner } from "@radix-ui/themes";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

function CompareDiscount() {
  const { stats } = useStatsContext();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(
    function () {
      async function getData() {
        try {
          setIsLoading(true);

          if (stats.start_date && stats.end_date) {
            const statsData = await compareSalesByCodes({
              start_date: stats.start_date,
              end_date: stats.end_date,
            });

            setData(statsData);
          } else {
            const statsData = await compareSalesByCodes({
              start_date: new Date(
                Date.now() - stats.days * 24 * 60 * 60 * 1000,
              ),
            });
            setData(statsData);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }

      getData();
    },
    [stats],
  );

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Prodaja s kodo vs brez kode</p>
      <div className="flex h-full min-h-62 flex-col justify-between gap-4 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
        {isLoading ? (
          <Spinner />
        ) : (
          <ResponsiveContainer>
            <PieChart width={730} height={250}>
              <Pie
                dataKey="total_sum"
                nameKey="code"
                data={data}
                innerRadius={55}
                outerRadius={80}
                startAngle={90}
                endAngle={450}
                label={({ name }) => (name === "with" ? "S KODO" : "BREZ KODE")}
              >
                {data.map((el: { code: string }) => (
                  <Cell key={el.code} fill={getRandomColor()} />
                ))}
              </Pie>
              <Pie
                dataKey="total_orders"
                nameKey="code"
                data={data}
                outerRadius={50}
              >
                {data.map((el: { code: string }) => (
                  <Cell key={el.code} fill={getRandomColor()} />
                ))}
              </Pie>
              <Tooltip
                content={({ payload }) => {
                  if (!payload || !payload.length) return null;

                  return (
                    <div
                      style={{
                        background: "#fff",
                        padding: 8,
                        border: "1px solid #ccc",
                      }}
                    >
                      {payload.map((p) => (
                        <div key={p.name}>
                          <strong>
                            {p.payload.code === "with" ? "S kodo" : "Brez kode"}
                          </strong>
                          :{" "}
                          {p.dataKey === "total_sum"
                            ? new Intl.NumberFormat("sl-SI", {
                                style: "currency",
                                currency: "EUR",
                              }).format(p.value)
                            : p.value}
                        </div>
                      ))}
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default CompareDiscount;
