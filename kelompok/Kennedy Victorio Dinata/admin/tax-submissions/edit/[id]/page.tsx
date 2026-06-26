"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRouter from "@/api/router";

export default function EditTaxSubmissionPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const id = Number(params.id);

  const [taxServiceId, setTaxServiceId] = useState(0);
  const [taxpayerName, setTaxpayerName] = useState("");
  const [npwp, setNpwp] = useState("");
  const [fiscalYear, setFiscalYear] = useState(2026);
  const [amount, setAmount] = useState(0);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Pending");

  const { data, isLoading } = useQuery({
    queryKey: ["getTaxSubmission", id],
    queryFn: () => apiRouter.taxSubmissions.getTaxSubmission(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setTaxServiceId(data.tax_service_id);
      setTaxpayerName(data.taxpayer_name);
      setNpwp(data.npwp);
      setFiscalYear(data.fiscal_year);
      setAmount(Number(data.amount));
      setNotes(data.notes ?? "");
      setStatus(data.status);
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: () =>
      apiRouter.taxSubmissions.updateTaxSubmission(id, {
        tax_service_id: taxServiceId,
        taxpayer_name: taxpayerName,
        npwp,
        fiscal_year: fiscalYear,
        amount,
        notes,
        status,
      }),

    onSuccess: () => {
      alert("Submission berhasil diperbarui.");

      queryClient.invalidateQueries({
        queryKey: ["getTaxSubmissions"],
      });

      router.push("/admin/tax-submissions");
    },

    onError: (error) => {
      console.error(error);
      alert("Gagal memperbarui submission.");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-16 max-w-3xl">

        <Link
          href="/admin/tax-submissions"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-700"
        >
          ← Back to Tax Submissions
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-black text-slate-900">
            Edit Tax Submission
          </h1>

          <p className="mt-2 text-slate-500">
            Verifikasi laporan pajak dari wajib pajak.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <input
              type="text"
              value={taxpayerName}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-100 p-4 text-black"
            />

            <input
              type="text"
              value={npwp}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-100 p-4 text-black"
            />

            <input
              type="number"
              value={fiscalYear}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-100 p-4 text-black"
            />

            <input
              type="number"
              value={amount}
              readOnly
              className="w-full rounded-xl border border-slate-300 bg-slate-100 p-4 text-black"
            />

            <textarea
              value={notes}
              readOnly
              className="h-32 w-full rounded-xl border border-slate-300 bg-slate-100 p-4 text-black"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full rounded-xl bg-cyan-500 p-4 font-bold text-white transition hover:bg-cyan-600 disabled:opacity-50"
            >
              {updateMutation.isPending
                ? "Updating..."
                : "Update Submission"}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}