"use client";

import { useEffect, useState } from "react";
import DashboardCard from "@/component/DashboardCard";
import Sidebar from "@/component/Sidebar";
import TaxChart from "@/component/TaxChart";
import StatusChart from "@/component/StatusChart";
import { useQuery } from "@tanstack/react-query";
import apiRouter from "@/api/router";
import type { TaxSubmission } from "@/api/tax-submission";
import type { TaxService } from "@/api/taxService";
import type { Officer } from "@/api/officer";


export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");

  const { data: submissions = [] } = useQuery<TaxSubmission[]>({
  queryKey: ["dashboardSubmissions"],
  queryFn: apiRouter.taxSubmissions.getTaxSubmissions,
});

const { data: services = [] } = useQuery<TaxService[]>({
  queryKey: ["dashboardServices"],
  queryFn: apiRouter.taxServices.getTaxServices,
});

const { data: officers = [] } = useQuery<Officer[]>({
  queryKey: ["dashboardOfficers"],
  queryFn: apiRouter.officers.getOfficers,
});

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      window.location.href = "/login";
    } else {
      setUserName(user);
    }
  }, []);

  const filteredReports = submissions.filter(
    (item) =>
      item.taxpayer_name.toLowerCase().includes(search.toLowerCase()) ||
      item.npwp.includes(search)
  );

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Verified": return "border-emerald-100 bg-emerald-50 text-emerald-600";
      case "Pending": return "border-yellow-100 bg-yellow-50 text-yellow-600";
      case "Approved": return "border-cyan-100 bg-cyan-50 text-cyan-600";
      default: return "border-orange-100 bg-orange-50 text-orange-600";
    }
  };

  const pending = submissions.filter(
  (item) => item.status === "Pending"
).length;

const approved = submissions.filter(
  (item) => item.status === "Approved"
).length;

const rejected = submissions.filter(
  (item) => item.status === "Rejected"
).length;

  return (
    <section className="min-h-screen bg-[#f8fafc]">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <Sidebar />

        <main className="pt-18 px-6 pb-10 lg:px-10">
          {/* Header Section */}
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:gap-10">
            <div>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                Dashboard Overview
              </h2>
              <p className="mt-2 font-medium text-slate-500">
                Monitoring taxpayer validation and realtime reporting.
              </p>
            </div>

            {/* Search Input & Logout */}
            <div className="flex items-center self-end lg:self-center">
              <div className="relative group">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <svg className="h-5 w-5 text-slate-400 transition-colors group-focus-within:text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search taxpayer or NPWP..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-5 text-sm font-medium shadow-sm outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 lg:w-[320px]"
                />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <DashboardCard
              title="Tax Services"
              value={String(services.length)}
            />

            <DashboardCard
              title="Officers"
              value={String(officers.length)}
            />

            <DashboardCard
              title="Tax Reports"
              value={String(submissions.length)}
            />

            <DashboardCard
              title="Pending"
              value={String(pending)}
            />
          </div>

          {/* Charts Section */}
          <div className="mt-8 grid gap-8 xl:grid-cols-2">
            <TaxChart />
            <StatusChart />
          </div>

          {/* Table Section */}
          <div className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-8">
              <h3 className="text-xl font-black text-slate-900">Taxpayer Monitoring</h3>
              <p className="text-sm font-medium text-slate-500">
                Showing {filteredReports.length} total results
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <th className="px-8 py-5">Taxpayer</th>
                    <th className="px-8 py-5">NPWP Number</th>
                    <th className="px-8 py-5">Type</th>
                    <th className="px-8 py-5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredReports.length > 0 ? (
                    filteredReports.map((report) => (
                      <tr key={report.id} className="group transition hover:bg-slate-50/80">
                        <td className="px-8 py-5 font-bold text-slate-900 group-hover:text-cyan-600">
                          {report.taxpayer_name}
                        </td>
                        <td className="px-8 py-5 font-mono text-sm text-slate-500">{report.npwp}</td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-600">{report.tax_service.name}</td>
                        <td className="px-8 py-5 text-right">
                          <span className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-black uppercase tracking-tighter border ${getStatusStyles(report.status)}`}>
                            {report.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-4xl">🔍</span>
                          <h4 className="mt-4 font-bold text-slate-900">No data found</h4>
                          <p className="text-sm text-slate-500">Try adjusting your search for "{search}"</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}