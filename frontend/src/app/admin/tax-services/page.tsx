"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import apiRouter from "@/api/router";

interface TaxService {
  id: number;
  slug: string;
  name: string;
  description: string;
  status: string;
}

export default function TaxServicesPage() {
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  const { data: taxServices = [], isLoading } = useQuery<TaxService[]>({
    queryKey: ["getTaxServices"],
    queryFn: apiRouter.taxServices.getTaxServices,
  });

  const deleteMutation = useMutation({
    mutationFn: (slug: string) =>
      apiRouter.taxServices.deleteTaxService(slug),

    onSuccess: () => {
      alert("Tax Service berhasil dihapus.");

      queryClient.invalidateQueries({
        queryKey: ["getTaxServices"],
      });
    },

    onError: (error: any) => {
      console.error(error);
      alert("Gagal menghapus Tax Service.");
    },
  });

  const handleDelete = (slug: string) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus Tax Service?"
    );

    if (!confirmDelete) return;

    deleteMutation.mutate(slug);
  };

  const filteredServices = taxServices.filter(
    (service) =>
      service.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      service.description
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      service.status
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-16 max-w-7xl">

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Manage Tax Services
            </h1>

            <p className="mt-2 text-slate-500">
              Daftar layanan perpajakan Smart Core Pajak.
            </p>

            <p className="mt-3 text-sm font-semibold text-cyan-600">
              Total Services : {taxServices.length}
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="🔍 Cari layanan..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-72 rounded-2xl border border-slate-300 px-4 py-3 text-black outline-none focus:border-cyan-500"
            />

            <Link
              href="/admin/tax-services/add"
              className="rounded-2xl bg-cyan-500 px-5 py-3 font-bold text-white transition hover:bg-cyan-600"
            >
              + Add Service
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Service Name</th>
                <th className="p-4 text-left">
                  Description
                </th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">
                      {service.id}
                    </td>

                    <td className="p-4">
                      {service.name}
                    </td>

                    <td className="p-4">
                      {service.description}
                    </td>

                    <td className="p-4">
                      {service.status}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">

                        <Link
                          href={`/admin/tax-services/edit/${service.slug  }`}
                          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(service.slug)
                          }
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
                    colSpan={5}
                    className="p-8 text-center text-slate-500"
                  >
                    Tidak ada Tax Service.
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