"use client";

import Link from "next/link";
import { useState, use } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import apiRouter from "@/api/router";
import jsPDF from "jspdf";

interface TaxService {
  id: number;
  slug: string;
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
  chart: "📈",
  briefcase: "💼",
};

import { useParams } from "next/navigation";

export default function TaxDetailPage() {
  const params = useParams();

  const slug = params.id as string;
  
  const {
    data: tax,
    isLoading,
  } = useQuery<TaxService>({
    queryKey: ["getTaxService", slug],
    queryFn: () => apiRouter.taxServices.getTaxService(slug),
    enabled: !!slug,
  });
  
    const [formData, setFormData] = useState({
    npwp: "",
    taxpayer: "",
    year: "2026",
    amount: "",
    notes: "",
  });

  const submitMutation = useMutation({
  mutationFn: () =>
    apiRouter.taxSubmissions.addTaxSubmission({
      tax_service_id: tax!.id,
      taxpayer_name: formData.taxpayer,
      npwp: formData.npwp,
      fiscal_year: Number(formData.year),
      amount: Number(formData.amount.replace(/\D/g, "")),
      notes: formData.notes,
      status: "Pending",
    }),

  onSuccess: () => {
    alert("Submission berhasil dikirim.");
    downloadPdf();
  },

  onError: (error) => {
    console.error(error);
    alert("Gagal mengirim data.");
  },
});

  if (!tax) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
        <div className="rounded-[40px] bg-white p-16 text-center shadow-2xl shadow-slate-200">
          <span className="mb-6 block text-7xl animate-bounce">⚠️</span>
          <h1 className="text-4xl font-black text-slate-900">Module Not Found</h1>
          <p className="mt-4 text-lg text-slate-500 font-medium">Modul pajak yang Anda cari tidak tersedia dalam sistem.</p>
          <Link href="/tax" className="mt-8 inline-block rounded-2xl bg-slate-950 px-8 py-4 text-sm font-black text-white transition hover:bg-cyan-500 hover:text-slate-950">
            Kembali ke Daftar Modul
          </Link>
        </div>
      </section>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const raw = value.replace(/\D/g, "");
      const formatted = raw ? `Rp ${new Intl.NumberFormat("id-ID").format(Number(raw))}` : "";
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    submitMutation.mutate();
  };

  const downloadPdf = () => {
  if (!tax) return;

  const doc = new jsPDF();

  const pageWidth = doc.internal.pageSize.getWidth();

  // ===== HEADER =====
  doc.setFillColor(15, 23, 42); // slate-950
  doc.rect(0, 0, pageWidth, 40, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("SMART CORE PAJAK", pageWidth / 2, 16, {
    align: "center",
  });

  doc.setFontSize(11);
  doc.text("Digital Tax Submission Receipt", pageWidth / 2, 25, {
    align: "center",
  });

  // ===== CONTENT =====
  let y = 55;

  doc.setTextColor(0, 0, 0);

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Submission Information", 20, y);

  y += 10;

  doc.setDrawColor(200);
  doc.line(20, y, 190, y);

  y += 10;

  const rows = [
    ["Tax Service", tax.name],
    ["Taxpayer", formData.taxpayer],
    [
      "NPWP",
      formData.npwp.replace(
        /^(\d{2}\.\d{3}\.\d{3})\.\d-(\d{3})\.(\d{3})$/,
        "$1.*-***.$3"
      ),
    ],
    ["Fiscal Year", formData.year],
    ["Amount", formData.amount],
    ["Status", "Pending"],
    [
      "Generated",
      new Date().toLocaleString("id-ID", {
        dateStyle: "full",
        timeStyle: "medium",
      }),
    ],
  ];

  rows.forEach(([title, value]) => {
    doc.setFillColor(245, 247, 250);
    doc.roundedRect(20, y - 6, 170, 12, 2, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(title + " :", 24, y + 2);

    doc.setFont("helvetica", "normal");
    doc.text(String(value), 70, y + 2);

    y += 16;
  });

  // ===== STATUS BOX =====
  y += 8;

  doc.setFillColor(255, 248, 220);
  doc.roundedRect(20, y, 170, 22, 3, 3, "F");

  doc.setTextColor(180, 120, 0);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("STATUS : PENDING", 30, y + 14);

  // ===== FOOTER =====
  y += 40;

  doc.setDrawColor(220);
  doc.line(20, y, 190, y);

  y += 10;

  doc.setTextColor(100);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(10);

  doc.text(
    "This document is automatically generated by Smart Core Pajak.",
    pageWidth / 2,
    y,
    {
      align: "center",
    }
  );

  y += 6;

  doc.text(
    "Keep this receipt as proof of your tax submission.",
    pageWidth / 2,
    y,
    {
      align: "center",
    }
  );

  doc.save(`Tax-Submission-${formData.taxpayer}.pdf`);
};

  return (
    <section className="min-h-screen bg-slate-100 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        
        <Link
          href="/tax"
          className="group inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-700 shadow-sm transition hover:bg-slate-950 hover:text-white"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Back to Tax Modules
        </Link>

        <div className="mt-8 overflow-hidden rounded-[48px] border border-white bg-white shadow-2xl shadow-slate-200/50">
          
          {/* Header Hero */}
          <div className="relative overflow-hidden bg-slate-950 px-10 py-16 text-white">
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-500/10 blur-[100px]"></div>
            
            <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
                  Smart Core Pajak Administration
                </div>
                <h1 className="mt-6 text-5xl font-black tracking-tight lg:text-7xl">{tax.name}</h1>
                <p className="mt-5 max-w-2xl text-xl font-medium leading-relaxed text-slate-400">
                  {tax.description} — <span className="text-cyan-400">Status: {tax.status}</span>
                </p>
              </div>
              <div className="flex h-36 w-36 items-center justify-center rounded-[44px] border border-white/10 bg-white/5 text-7xl backdrop-blur-xl shadow-inner transition-transform hover:rotate-3 hover:scale-105">
                {iconMap[tax.icon] ?? "📄"}
              </div>
            </div>
          </div>

          <div className="p-10 lg:p-14">
            <div className="mb-14">
              <h2 className="text-4xl font-black tracking-tight text-slate-900">Taxpayer Data Input</h2>
              <p className="mt-3 text-lg font-medium text-slate-500">Lengkapi detail pelaporan Anda untuk verifikasi sistem integrasi.</p>
            </div>

            <form className="grid gap-8 md:grid-cols-2" onSubmit={handleSubmit}>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">NPWP Number</label>
                <input
                  type="text"
                  name="npwp"
                  value={formData.npwp}
                  onChange={handleChange}
                  placeholder="00.000.000.0-000.000"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 font-bold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Taxpayer Name</label>
                <input
                  type="text"
                  name="taxpayer"
                  value={formData.taxpayer}
                  onChange={handleChange}
                  placeholder="PT Smart Indonesia"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 font-bold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Fiscal Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 font-bold text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Reported Amount (IDR)</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Rp 0"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 text-3xl font-black text-cyan-600 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Official Notes</label>
                <textarea
                  rows={4}
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tambahkan detail atau referensi transaksi..."
                  className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-6 py-5 font-medium text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-6 md:col-span-2">
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="rounded-2xl bg-slate-950 px-12 py-5 text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-slate-900/10 transition hover:bg-cyan-500 hover:text-slate-950 active:scale-95 disabled:opacity-50"
                >
                  {submitMutation.isPending
                    ? "Submitting..."
                    : "Confirm Submission"}
                </button>
              </div>
            </form>

            {/* Enhanced Live Preview */}
            <div className="mt-20 overflow-hidden rounded-[48px] bg-slate-950 p-12 text-white relative">
               <div className="absolute top-0 right-0 p-12 text-white/[0.03] font-black text-[120px] leading-none select-none">DATA</div>
              
              <div className="relative z-10 flex items-center justify-between">
                <h3 className="text-3xl font-black tracking-tight italic">Live Monitoring</h3>
                <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 border border-white/10">
                  <div className={`h-2 w-2 rounded-full animate-ping ${formData.amount ? 'bg-cyan-500' : 'bg-slate-500'}`}></div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Real-time Encrypted</span>
                </div>
              </div>

              <div className="relative z-10 mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Wajib Pajak", val: formData.taxpayer || "—" },
                  { label: "Identitas NPWP", val: formData.npwp || "—" },
                  { label: "Nominal Input", val: formData.amount || "Rp 0", highlight: true },
                  { label: "Periode Fiskal", val: formData.year },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{item.label}</p>
                    <h4 className={`mt-3 text-xl font-black truncate ${item.highlight ? 'text-cyan-400' : 'text-white'}`}>
                      {item.val}
                    </h4>
                  </div>
                ))}
              </div>

              <div className="relative z-10 mt-12 flex items-center gap-4 rounded-[28px] bg-white/5 border border-white/10 p-6">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${formData.npwp && formData.taxpayer && formData.amount ? 'bg-emerald-500 text-white' : 'bg-amber-500/20 text-amber-500'}`}>
                  {formData.npwp && formData.taxpayer && formData.amount ? '✓' : '!'}
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-white">System Status</p>
                  <p className="text-sm font-medium text-slate-400">
                    {formData.npwp && formData.taxpayer && formData.amount 
                      ? "Semua data wajib telah terisi. Siap dikirim." 
                      : "Harap lengkapi NPWP, Nama, dan Nominal Pajak."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}