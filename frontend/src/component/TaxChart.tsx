"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

import { useQuery } from "@tanstack/react-query";
import apiRouter from "@/api/router";
import type { TaxSubmission } from "@/api/tax-submission";

export default function TaxChart() {
  const { data: submissions = [] } = useQuery<TaxSubmission[]>({
    queryKey: ["chartSubmissions"],
    queryFn: apiRouter.taxSubmissions.getTaxSubmissions,
  });

  const yearlyData = submissions.reduce(
    (acc: Record<number, number>, item) => {
      acc[item.fiscal_year] =
        (acc[item.fiscal_year] || 0) + Number(item.amount);

      return acc;
    },
    {}
  );

  const data = Object.entries(yearlyData).map(([year, amount]) => ({
    year,
    amount,
  }));

  const colors = [
    "#06b6d4", // cyan
    "#10b981", // emerald
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // violet
    "#3b82f6", // blue
    "#ec4899", // pink
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-black text-slate-900">
        Total Pajak per Tahun
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="year" />

          <YAxis
            tickFormatter={(value) =>
              `Rp ${(Number(value) / 1000000).toFixed(0)} Jt`
            }
          />

          <Tooltip
            formatter={(value) => [
              `Rp ${Number(value).toLocaleString("id-ID")}`,
              "Total Pajak",
            ]}
          />

          <Bar
            dataKey="amount"
            radius={[10, 10, 0, 0]}
            maxBarSize={80}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}