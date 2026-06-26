"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRouter from "@/api/router";

export default function AddUserPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [identifierNumber, setIdentifierNumber] = useState("");
  const [typeId, setTypeId] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const addUserMutation = useMutation({
    mutationFn: () =>
      apiRouter.users.addUser({
        name,
        email,
        phone,
        identifier_number: identifierNumber,
        type_id: typeId,
        password,
        password_confirmation: passwordConfirmation,
      }),

    onSuccess: () => {
      alert("User berhasil ditambahkan!");

      queryClient.invalidateQueries({
        queryKey: ["getUsers"],
      });

      router.push("/admin/users");
    },

    onError: (error: any) => {
      console.error(error);
      alert("Gagal menambahkan user");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Password dan Konfirmasi Password tidak sama.");
      return;
    }

    addUserMutation.mutate();
  };

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-16 max-w-3xl">

        <Link
          href="/admin/users"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-cyan-600 hover:text-cyan-700"
        >
          ← Back to Users
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow">

          <h1 className="text-3xl font-black text-slate-900">
            Add User
          </h1>

          <p className="mt-2 text-slate-500">
            Tambahkan user baru ke Smart Core Pajak.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            <input
              type="text"
              placeholder="Nama"
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
              placeholder="NIK / NPWP"
              value={identifierNumber}
              onChange={(e) => setIdentifierNumber(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
              required
            />

            <select
              value={typeId}
              onChange={(e) => setTypeId(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
            >
              <option value={0}>User</option>
              <option value={1}>Admin</option>
            </select>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
              required
            />

            <input
              type="password"
              placeholder="Konfirmasi Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="w-full rounded-xl border border-slate-300 p-4 text-black"
              required
            />

            <button
              type="submit"
              disabled={addUserMutation.isPending}
              className="w-full rounded-xl bg-cyan-500 p-4 font-bold text-white transition hover:bg-cyan-600 disabled:opacity-50"
            >
              {addUserMutation.isPending
                ? "Menambahkan..."
                : "Add User"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}