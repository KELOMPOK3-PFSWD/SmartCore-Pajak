"use client";

import Link from "next/link";
import { useState } from "react";

const taxServices = [
  { id: 1, name: "PPh Badan", description: "Pelaporan pajak penghasilan badan usaha secara digital dan realtime.", status: "Active", icon: "🏢" },
  { id: 2, name: "PPN", description: "Validasi pajak pertambahan nilai dengan sistem administrasi modern.", status: "Available", icon: "📊" },
  { id: 3, name: "e-Faktur", description: "Pembuatan dan monitoring faktur pajak elektronik nasional.", status: "Online", icon: "🧾" },
  { id: 4, name: "Validasi NPWP", description: "Pengecekan identitas dan validasi wajib pajak digital.", status: "Secure", icon: "✅" },
  { id: 5, name: "e-Bupot", description: "Administrasi bukti potong pajak elektronik terintegrasi.", status: "Integrated", icon: "📁" },
  { id: 6, name: "Pajak UMKM", description: "Layanan perpajakan digital khusus usaha mikro dan menengah.", status: "Supported", icon: "🏪" },
];

export default function TaxPage() {
  const [search, setSearch] = useState("");

  const filteredServices = taxServices.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-slate-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Header & Search */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex rounded-full bg-cyan-100 px-5 py-2 text-xs font-black uppercase tracking-widest text-cyan-700">
              Smart Core Pajak
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 lg:text-6xl">
              Tax Modules
            </h1>

            <p className="mt-6 text-lg leading-relaxed font-medium text-slate-500">
              Sistem modul perpajakan digital modern untuk validasi,
              monitoring, integrasi, dan administrasi pajak nasional secara efisien.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative group w-full lg:w-[380px]">
            <input
              type="text"
              placeholder="Search tax modules..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-3xl border border-white bg-white px-8 py-5 pr-16 text-sm font-bold shadow-sm outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl transition-transform group-focus-within:scale-110">
              🔍
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { label: "Total Modules", value: taxServices.length, color: "text-cyan-500" },
            { label: "System Health", value: "99.9%", color: "text-emerald-500" },
            { label: "Active Connections", value: "12K+", color: "text-slate-900" },
          ].map((stat, i) => (
            <div key={i} className="rounded-[40px] border border-white bg-white/50 p-10 shadow-sm backdrop-blur-sm transition-all hover:bg-white">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <h2 className={`mt-5 text-5xl font-black tracking-tighter ${stat.color}`}>
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Services Cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[48px] border border-white bg-white p-10 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-200/40"
              >
                {/* Decorative Hover Element */}
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                <div>
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-cyan-50 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-cyan-700">
                      {service.status}
                    </div>
                    <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-slate-50 text-5xl transition-all duration-500 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-cyan-500/30">
                      {service.icon}
                    </div>
                  </div>

                  <div className="mt-10">
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-cyan-600">
                      {service.name}
                    </h2>
                    <p className="mt-5 text-lg leading-relaxed text-slate-500 font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</p>
                    <h4 className="mt-1 text-sm font-black text-emerald-500 uppercase">Operational</h4>
                  </div>
                  <Link
                    href={`/tax/${service.id}`}
                    className="rounded-2xl bg-slate-950 px-8 py-4 text-xs font-black uppercase text-white transition-all hover:bg-cyan-500 hover:text-slate-950 active:scale-95 shadow-lg shadow-slate-900/10"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full rounded-[60px] border-4 border-dashed border-slate-200 bg-white/50 p-24 text-center">
              <span className="mb-8 block text-8xl grayscale">🔍</span>
              <h3 className="text-4xl font-black text-slate-900">Module Not Found</h3>
              <p className="mt-4 text-xl text-slate-500 font-medium">
                No tax modules match "{search}"
              </p>
              <button 
                onClick={() => setSearch("")}
                className="mt-10 text-sm font-black uppercase tracking-widest text-cyan-600 hover:text-cyan-700 underline underline-offset-8"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}