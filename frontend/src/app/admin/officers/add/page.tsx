"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import apiRouter from "@/api/router";

export default function AddOfficerPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const addMutation = useMutation({
    mutationFn: () =>
      apiRouter.officers.addOfficer({
        name,
        email,
        phone,
        position,
        department,
        description,
        status,
      }),

    onSuccess: () => {
      alert("Officer berhasil ditambahkan!");

      queryClient.invalidateQueries({
        queryKey: ["getOfficers"],
      });

      router.push("/admin/officers");
    },

    onError: (error: any) => {
      console.error(error);
      alert("Gagal menambahkan Officer.");
    },
  });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    addMutation.mutate();
  };

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-16 max-w-3xl">

        <Link
          href="/admin/officers"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-700"
        >
          ← Back to Officers
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-black text-slate-900">
            Add Officer
          </h1>

          <p className="mt-2 text-slate-500">
            Tambahkan petugas baru.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <input
              type="text"
              placeholder="Officer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
              required
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
              required
            />

            <input
              type="text"
              placeholder="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
              required
            />

            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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

            <button
              type="submit"
              disabled={addMutation.isPending}
              className="w-full rounded-xl bg-cyan-500 p-4 font-bold text-white hover:bg-cyan-600 disabled:opacity-50"
            >
              {addMutation.isPending
                ? "Menambahkan..."
                : "Add Officer"}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}