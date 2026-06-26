"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRouter from "@/api/router";

export default function EditTaxServicePage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const slug = params.id as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [icon, setIcon] = useState("monitor");
  const [color, setColor] = useState("cyan");

  const { data, isLoading } = useQuery({
    queryKey: ["taxService", slug],
    queryFn: () => apiRouter.taxServices.getTaxService(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setStatus(data.status);
      setIcon(data.icon);
      setColor(data.color);
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: () =>
      apiRouter.taxServices.updateTaxService(slug, {
        name,
        description,
        status,
        icon,
        color,
      }),

    onSuccess: () => {
      alert("Tax Service berhasil diperbarui.");

      queryClient.invalidateQueries({
        queryKey: ["getTaxServices"],
      });

      router.push("/admin/tax-services");
    },

    onError: (error: any) => {
      console.error(error);
      alert("Gagal memperbarui Tax Service.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-16 max-w-3xl">

        <Link
          href="/admin/tax-services"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-700"
        >
          ← Back to Tax Services
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-black text-slate-900">
            Edit Tax Service
          </h1>

          <p className="mt-2 text-slate-500">
            Ubah informasi layanan perpajakan.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <input
              type="text"
              placeholder="Service Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
              required
            />

            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 w-full rounded-xl border border-slate-300 p-4 text-black"
              required
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
            >
              <option value="monitor">📊 Monitor</option>
              <option value="shield">🛡 Shield</option>
              <option value="file">📄 File</option>
              <option value="database">🗄 Database</option>
              <option value="briefcase">💼 Briefcase</option>
              <option value="chart">📈 Chart</option>
            </select>

            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
            >
              <option value="cyan">🟦 Cyan</option>
              <option value="blue">🔵 Blue</option>
              <option value="emerald">🟢 Emerald</option>
              <option value="purple">🟣 Purple</option>
              <option value="orange">🟠 Orange</option>
              <option value="slate">⚫ Slate</option>
            </select>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full rounded-xl bg-cyan-500 p-4 font-bold text-white transition hover:bg-cyan-600 disabled:opacity-50"
            >
              {updateMutation.isPending
                ? "Menyimpan..."
                : "Update Tax Service"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}