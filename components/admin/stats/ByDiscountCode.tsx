"use client";

import { getIncomeByDiscounts } from "@/lib/discountActions";
import { useEffect, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

function ByDiscountCode() {
  const [isLoading, setIsLoading] = useState(false);
  const [discountData, setDiscountData] = useState({
    total_sum: 0,
    by_code: [],
  });

  useEffect(function () {
    async function getDiscountData() {
      setIsLoading(true);
      try {
        const data = await getIncomeByDiscounts();

        setDiscountData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getDiscountData();
  }, []);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const top3Codes = discountData.by_code
    .sort(
      (a: { total_sum: number }, b: { total_sum: number }) =>
        b.total_sum - a.total_sum,
    )
    .slice(0, 3)
    .map((el: { code: string }) => el.code);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold">Prodaja glede na kode za popust</p>
      <div className="flex h-full flex-col justify-between gap-4 rounded-xl bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.25)]">
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
              fontSize={20}
              fontWeight="semibold"
            >
              {new Intl.NumberFormat("sl-SI", {
                style: "currency",
                currency: "EUR",
              }).format(discountData.total_sum)}
            </text>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ByDiscountCode;
