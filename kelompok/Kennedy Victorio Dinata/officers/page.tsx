"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiRouter from "@/api/router";

interface Officer {
  id: number;
  slug: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: string;
}

export default function OfficersPage() {
  const [search, setSearch] = useState("");

  const { data: officers = [], isLoading } = useQuery<Officer[]>({
    queryKey: ["getOfficers"],
    queryFn: apiRouter.officers.getOfficers,
  });

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(search.toLowerCase()) ||
      officer.position.toLowerCase().includes(search.toLowerCase()) ||
      officer.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-slate-100 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">
              Smart Core Team
            </div>
            <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-900">
              Tax Experts
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 font-medium">
              Tim profesional Smart Core Pajak yang membantu administrasi
              perpajakan digital modern dan monitoring nasional.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search officers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 pr-14 text-sm font-medium shadow-sm outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 lg:w-[320px]"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors">
              🔍
            </div>
          </div>
        </div>

        {/* Status Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/50">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Total Officers
            </p>
            <h2 className="mt-3 text-4xl font-black text-cyan-500">
              {officers.length}
            </h2>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/50">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              Active Monitoring
            </p>
            <h2 className="mt-3 text-4xl font-black text-emerald-500">98%</h2>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200/50">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
              National Coverage
            </p>
            <h2 className="mt-3 text-4xl font-black text-slate-900">
              34 Provinsi
            </h2>
          </div>
        </div>

        {/* Experts Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full py-24 text-center text-2xl font-bold">
              Loading Officers...
            </div>
          ) : filteredOfficers.length > 0 ? (
            filteredOfficers.map((officer: Officer) => (
              <Link
                key={officer.id}
                href={`/officers/${officer.slug}`}
                className="group rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-cyan-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-5xl shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    👨‍💼
                  </div>
                    <div
                      className={`flex items-center gap-2 rounded-2xl px-4 py-2 text-xs font-black uppercase tracking-tighter ${
                        officer.status === "Active"
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          officer.status === "Active"
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-red-500"
                        }`}
                      ></span>

                      {officer.status}
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-3xl font-black text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {officer.name}
                  </h2>
                  <p className="mt-2 text-lg font-bold text-cyan-600/80">
                    {officer.position}
                  </p>
                  <p className="mt-5 leading-relaxed text-slate-500 font-medium line-clamp-3">
                    Profesional perpajakan digital dengan pengalaman mendalam
                    dalam administrasi, validasi, dan monitoring sistem pajak
                    nasional berskala besar.
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Department
                    </p>
                    <h4 className="font-black text-slate-900 text-sm">
                      Tax Administration
                    </h4>
                  </div>
                  <div className="rounded-xl bg-slate-950 px-5 py-3 text-xs font-black text-white transition-all group-hover:bg-cyan-500 group-hover:text-slate-950">
                    View Profile
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full rounded-[40px] bg-white p-24 text-center shadow-sm border border-dashed border-slate-300">
              <span className="text-6xl block mb-6">🔍</span>
              <h3 className="text-2xl font-black text-slate-900">
                No Officers Found
              </h3>
              <p className="mt-2 text-slate-500 font-medium">
                Try searching with another keyword.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}