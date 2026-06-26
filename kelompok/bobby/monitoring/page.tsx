"use client";

import Sidebar from "@/component/Sidebar";
import TaxChart from "@/component/TaxChart";
import { useQuery } from "@tanstack/react-query";
import apiRouter from "@/api/router";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { TaxSubmission } from "@/api/tax-submission";

export default function MonitoringPage() {
  
  const [role, setRole] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
    setMounted(true);
  }, []);
    const { data: submissions = [] } = useQuery<TaxSubmission[]>({
      queryKey: ["monitoringSubmissions"],
      queryFn: apiRouter.taxSubmissions.getTaxSubmissions,
    });

    if (role !== "1") {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        </div>
      );
    }

  return (
    <section className="min-h-screen bg-slate-100">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <Sidebar />

        <main className="pt-28 px-6 pb-10 lg:px-10">
          {/* Header */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-bold text-cyan-700">
                Realtime Monitoring System
              </div>
              <h1 className="mt-5 text-4xl font-black text-slate-900">
                Monitoring Pajak
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Sistem pemantauan transaksi dan validasi pajak nasional secara realtime.
              </p>
            </div>

            <div className="rounded-2xl bg-white px-6 py-4 shadow-sm border border-slate-200/60">
              <p className="text-sm text-slate-500 font-medium">System Status</p>
              <h3 className="mt-1 text-2xl font-black text-emerald-500 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                </span>
                ACTIVE
              </h3>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/50">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Total Transaksi
              </p>
              <h2 className="mt-3 text-4xl font-black text-slate-900">
                {submissions.length}
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/50">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Pajak Masuk
              </p>
              <h2 className="mt-3 text-4xl font-black text-cyan-500">
                Rp{" "}
                {submissions
                  .reduce((sum, item) => sum + Number(item.amount), 0)
                  .toLocaleString("id-ID")}
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/50">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Validasi Berhasil
              </p>
              <h2 className="mt-3 text-4xl font-black text-emerald-500">
                {Math.round(
                  (submissions.filter((x) => x.status === "Approved").length /
                    (submissions.length || 1)) *
                    100
                )}
                %
              </h2>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/50">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Pending Data
              </p>
              <h2 className="mt-3 text-4xl font-black text-orange-500">
                {submissions.filter((x) => x.status === "Pending").length}
              </h2>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mt-8 bg-white p-6 rounded-[32px] shadow-sm border border-slate-200/50">
            <TaxChart />
          </div>

          {/* Activity Log */}
          <div className="mt-8 rounded-[32px] bg-white p-8 shadow-sm border border-slate-200/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Aktivitas Sistem
                </h2>
                <p className="mt-1 text-slate-500 font-medium">
                  Monitoring aktivitas perpajakan terbaru.
                </p>
              </div>

              <Link
                href="/reports"
                className="text-sm font-bold text-cyan-600 hover:underline"
              >
                Lihat Semua →
              </Link>
            </div>

            <div className="mt-8 space-y-4">
              {submissions.slice(0, 5).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition hover:border-cyan-200"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {item.taxpayer_name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-slate-400">
                      {item.tax_service.name} • {item.fiscal_year}
                    </p>
                  </div>

                  <span
                    className={`rounded-xl px-4 py-2 text-xs font-black uppercase ${
                      item.status === "Approved"
                        ? "bg-emerald-100 text-emerald-600"
                        : item.status === "Rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}