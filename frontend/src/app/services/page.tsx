"use client";

import { useQuery } from "@tanstack/react-query";
import apiRouter from "@/api/router";

interface TaxService {
  id: number;
  name: string;
  description: string;
  status: string;
  icon: string;
  color: string;
}

const iconMap: Record<string, string> = {
  monitor: "📊",
  shield: "🛡️",
  file: "📄",
  database: "🗄️",
  briefcase: "💼",
  chart: "📈",
};

const colorMap: Record<string, string> = {
  cyan: "group-hover:bg-cyan-500 group-hover:shadow-cyan-500/30",
  blue: "group-hover:bg-blue-500 group-hover:shadow-blue-500/30",
  emerald: "group-hover:bg-emerald-500 group-hover:shadow-emerald-500/30",
  purple: "group-hover:bg-purple-500 group-hover:shadow-purple-500/30",
  orange: "group-hover:bg-orange-500 group-hover:shadow-orange-500/30",
  slate: "group-hover:bg-slate-700 group-hover:shadow-slate-700/30",
};

export default function ServicesPage() {
  const { data: services = [], isLoading } = useQuery<TaxService[]>({
    queryKey: ["getTaxServices"],
    queryFn: apiRouter.taxServices.getTaxServices,
  });

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-16 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-cyan-100 px-5 py-2 text-xs font-black uppercase tracking-widest text-cyan-700">
              Smart Core Pajak
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 lg:text-6xl">
              Core Tax Services
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500">
              Sistem layanan perpajakan digital modern untuk validasi,
              monitoring, administrasi, dan integrasi pajak nasional secara realtime.
            </p>
          </div>

          <div className="inline-flex items-center gap-4 rounded-[24px] border border-white bg-white/50 px-8 py-5 text-sm font-black text-slate-900 shadow-sm backdrop-blur-sm">
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </div>
            All Systems Operational
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {[
            { label: "Total Services", value: services.length, color: "text-cyan-500" },
            { label: "System Uptime", value: "99.9%", color: "text-emerald-500" },
            { label: "Active Users", value: "12K+", color: "text-slate-900" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-[40px] border border-white bg-white/40 p-10 shadow-sm transition-all hover:bg-white"
            >
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <h2 className={`mt-5 text-6xl font-black tracking-tighter ${stat.color}`}>
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="py-20 text-center text-2xl font-bold">Loading Services...</div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const isActive = service.status === "Active";
              const hoverColor =
                colorMap[service.color] ??
                "group-hover:bg-cyan-500 group-hover:shadow-cyan-500/30";

              return (
                <div
                  key={service.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[48px] border border-white bg-white p-10 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-cyan-200/40"
                >
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                  <div>
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-24 w-24 items-center justify-center rounded-[32px] bg-slate-50 text-5xl transition-all duration-500 group-hover:scale-110 group-hover:text-white group-hover:shadow-lg ${hoverColor}`}
                      >
                        {iconMap[service.icon] ?? "📁"}
                      </div>

                      <div
                        className={`rounded-2xl px-4 py-2 text-[10px] font-black uppercase tracking-widest ${
                          isActive
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {service.status}
                      </div>
                    </div>

                    <div className="mt-12">
                      <h2 className="text-3xl font-black tracking-tight text-slate-900 transition-colors group-hover:text-cyan-600">
                        {service.name}
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-slate-500">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-8">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        Status
                      </p>
                      <h4
                        className={`mt-1 text-sm font-black ${
                          isActive ? "text-emerald-500" : "text-red-500"
                        }`}
                      >
                        {service.status}
                      </h4>
                    </div>

                    <div
                      className={`rounded-2xl px-6 py-3 text-sm font-black text-white ${
                        isActive ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    >
                      {service.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}