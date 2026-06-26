"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import apiRouter from "@/api/router";

interface Officer {
  id: number;
  slug: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  description: string;
  status: string;
}

export default function OfficersPage() {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data: officers = [], isLoading } = useQuery<Officer[]>({
    queryKey: ["getOfficers"],
    queryFn: apiRouter.officers.getOfficers,
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) => apiRouter.officers.deleteOfficer(slug),

    onSuccess: () => {
      alert("Officer berhasil dihapus.");
      queryClient.invalidateQueries({
        queryKey: ["getOfficers"],
      });
    },

    onError: (error: any) => {
      console.error(error);
      alert("Gagal menghapus Officer.");
    },
  });

  const handleDelete = (slug: string) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus Officer?");

    if (!confirmDelete) return;

    deleteMutation.mutate(slug);
  };

  const filteredOfficers = officers.filter(
    (officer) =>
      officer.name.toLowerCase().includes(search.toLowerCase()) ||
      officer.email.toLowerCase().includes(search.toLowerCase()) ||
      officer.phone.toLowerCase().includes(search.toLowerCase()) ||
      officer.position.toLowerCase().includes(search.toLowerCase()) ||
      officer.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-16 max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Manage Officers
            </h1>

            <p className="mt-2 text-slate-500">
              Daftar petugas Smart Core Pajak.
            </p>

            <p className="mt-3 text-sm font-semibold text-cyan-600">
              Total Officers : {officers.length}
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="🔍 Cari officer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 rounded-2xl border border-slate-300 px-4 py-3 text-black outline-none focus:border-cyan-500"
            />

            <Link
              href="/admin/officers/add"
              className="rounded-2xl bg-cyan-500 px-5 py-3 font-bold text-white transition hover:bg-cyan-600"
            >
              + Add Officer
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Position</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredOfficers.length > 0 ? (
                filteredOfficers.map((officer) => (
                  <tr
                    key={officer.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">{officer.id}</td>
                    <td className="p-4">{officer.name}</td>
                    <td className="p-4">{officer.email}</td>
                    <td className="p-4">{officer.phone}</td>
                    <td className="p-4">{officer.position}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-xl px-3 py-1 text-sm font-bold ${
                          officer.status === "Active"
                            ? "bg-emerald-100 text-emerald-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {officer.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          href={`/admin/officers/edit/${officer.slug}`}
                          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(officer.slug)}
                          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-8 text-center text-slate-500"
                  >
                    Tidak ada Officer.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}