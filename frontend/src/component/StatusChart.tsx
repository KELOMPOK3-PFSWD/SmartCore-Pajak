"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useQuery } from "@tanstack/react-query";
import apiRouter from "@/api/router";
import type { TaxSubmission } from "@/api/tax-submission";

const COLORS = [
  "#10b981", // Approved
  "#f59e0b", // Pending
  "#ef4444", // Rejected
];

export default function StatusChart() {
  const { data: submissions = [] } = useQuery<TaxSubmission[]>({
    queryKey: ["statusChart"],
    queryFn: apiRouter.taxSubmissions.getTaxSubmissions,
  });

  const approved = submissions.filter(
    (item) => item.status === "Approved"
  ).length;

  const pending = submissions.filter(
    (item) => item.status === "Pending"
  ).length;

  const rejected = submissions.filter(
    (item) => item.status === "Rejected"
  ).length;

  const data = [
    {
      name: "Approved",
      value: approved,
    },
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  return (
    <div className="rounded-[40px] border border-slate-200/60 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-slate-900">
            Tax Status Overview
          </h3>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Realtime distribution data
          </p>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:text-slate-600">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 5v.01M12 12v.01M12 19v.01"
            />
          </svg>
        </button>
      </div>

      <div className="relative h-[320px]">
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-slate-900">
            {submissions.length}
          </span>

          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Total Reports
          </span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={115}
              paddingAngle={8}
              cornerRadius={12}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `${value} Reports`,
                "Jumlah",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="rounded-2xl border border-slate-100 bg-slate-50/50 p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: COLORS[index],
                }}
              />

              <span className="text-xs font-bold uppercase text-slate-500">
                {item.name}
              </span>
            </div>

            <h4 className="mt-3 text-2xl font-black text-slate-900">
              {item.value}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}