"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import apiRouter from "@/api/router";
import type { Officer } from "@/api/officer";
import type { TaxService } from "@/api/taxService";
import type { TaxSubmission } from "@/api/tax-submission";

export default function AdminDashboardPage() {
  const { data: officers = [] } = useQuery<Officer[]>({
    queryKey: ["getOfficers"],
    queryFn: apiRouter.officers.getOfficers,
  });

  const { data: taxServices = [] } = useQuery<TaxService[]>({
    queryKey: ["getTaxServices"],
    queryFn: apiRouter.taxServices.getTaxServices,
  });

  const { data: users = [] } = useQuery({
  queryKey: ["getUsers"],
  queryFn: apiRouter.users.getUsers,
});

  const { data: submissions = [] } = useQuery<TaxSubmission[]>({
    queryKey: ["getTaxSubmissions"],
    queryFn: apiRouter.taxSubmissions.getTaxSubmissions,
  });

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
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-16 max-w-7xl">

        <div className="mb-10">
          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-bold text-cyan-700">
            Smart Core Pajak
          </span>

          <h1 className="mt-5 text-5xl font-black text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-3 text-lg text-slate-500">
            Monitoring dan administrasi sistem perpajakan digital.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <DashboardCard
            icon="👥"
            title="Users"
            subtitle="Total pengguna"
            value={users.length}
            color="bg-blue-100"
            iconColor="text-blue-600"
          />

          <DashboardCard
            icon="📋"
            title="Tax Services"
            subtitle="Total layanan pajak"
            value={taxServices.length}
            color="bg-cyan-100"
            iconColor="text-cyan-600"
          />

          <DashboardCard
            icon="👨‍💼"
            title="Officers"
            subtitle="Total petugas pajak"
            value={officers.length}
            color="bg-purple-100"
            iconColor="text-purple-600"
          />

          <DashboardCard
            icon="🧾"
            title="Tax Submissions"
            subtitle="Total pengajuan pajak"
            value={submissions.length}
            color="bg-emerald-100"
            iconColor="text-emerald-600"
          />

          <DashboardCard
            icon="⏰"
            title="Pending"
            subtitle="Menunggu verifikasi"
            value={pending}
            color="bg-yellow-100"
            iconColor="text-yellow-600"
          />

          <DashboardCard
            icon="✅"
            title="Approved"
            subtitle="Pengajuan disetujui"
            value={approved}
            color="bg-green-100"
            iconColor="text-green-600"
          />

          <DashboardCard
            icon="❌"
            title="Rejected"
            subtitle="Pengajuan ditolak"
            value={rejected}
            color="bg-red-100"
            iconColor="text-red-600"
          />

        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <AdminButton
            href="/admin/officers"
            title="Manage Officers"
            icon="👨‍💼"
          />

          <AdminButton
            href="/admin/tax-services"
            title="Manage Tax Services"
            icon="📑"
          />

          <AdminButton
            href="/admin/tax-submissions"
            title="Manage Tax Submissions"
            icon="🧾"
          />

          <AdminButton
            href="/admin/users"
            title="Manage Users"
            icon="👥"
          />

        </div>

      </div>
    </section>
  );
}

function DashboardCard({
  icon,
  title,
  subtitle,
  value,
  color,
  iconColor,
}: {
  icon: string;
  title: string;
  subtitle: string;
  value: number;
  color: string;
  iconColor: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {subtitle}
          </p>

          <h2 className="mt-5 text-4xl font-black text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color}`}
        >
          <span className={`text-3xl ${iconColor}`}>
            {icon}
          </span>
        </div>
      </div>
    </div>
  );
}

function AdminButton({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-3xl bg-slate-900 p-8 text-white transition hover:-translate-y-1 hover:bg-cyan-600"
    >
      <div className="text-5xl">
        {icon}
      </div>

      <h2 className="mt-6 text-2xl font-black">
        {title}
      </h2>
    </Link>
  );
}