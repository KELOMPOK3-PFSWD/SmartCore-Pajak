"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import apiRouter from "@/api/router";

export default function EditOfficerPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const slug = params.id as string;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");

  const { data: officer, isLoading } = useQuery({
    queryKey: ["getOfficer", slug],
    queryFn: () => apiRouter.officers.getOfficer(slug),
    enabled: !!slug,
  });

  useEffect(() => {
    if (officer) {
      setName(officer.name);
      setEmail(officer.email);
      setPhone(officer.phone);
      setPosition(officer.position);
      setDepartment(officer.department);
      setDescription(officer.description);
      setStatus(officer.status);
    }
  }, [officer]);

  const updateMutation = useMutation({
    mutationFn: () =>
      apiRouter.officers.updateOfficer(slug, {
        name,
        email,
        phone,
        position,
        department,
        description,
        status,
      }),

    onSuccess: () => {
      alert("Officer berhasil diupdate!");

      queryClient.invalidateQueries({
        queryKey: ["getOfficers"],
      });

      router.push("/admin/officers");
    },

    onError: (error: any) => {
      console.error(error);
      alert("Gagal mengupdate Officer.");
    },
  });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    updateMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

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
            Edit Officer
          </h1>

          <p className="mt-2 text-slate-500">
            Ubah data officer.
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
              disabled={updateMutation.isPending}
              className="w-full rounded-xl bg-amber-500 p-4 font-bold text-white hover:bg-amber-600 disabled:opacity-50"
            >
              {updateMutation.isPending
                ? "Updating..."
                : "Update Officer"}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}