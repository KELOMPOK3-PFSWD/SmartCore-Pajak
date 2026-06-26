"use client";

import Link from "next/link";
import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import apiRouter from "@/api/router";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  identifier_number: string;
  type_id?: number;
}

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery<User[]>({
    queryKey: ["getUsers"],
    queryFn: apiRouter.users.getUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiRouter.users.deleteUser(id),

    onSuccess: () => {
      alert("User berhasil dihapus!");

      queryClient.invalidateQueries({
        queryKey: ["getUsers"],
      });
    },

    onError: (error: any) => {
      console.error(error);
      alert("Gagal menghapus user.");
    },
  });

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus user ini?"
    );

    if (!confirmDelete) return;

    deleteMutation.mutate(id);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.phone.includes(search) ||
    user.identifier_number.includes(search)
  );

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-16 max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Manage Users
            </h1>

            <p className="mt-2 text-slate-500">
              Daftar seluruh user yang terdaftar pada Smart Core Pajak.
            </p>

            <p className="mt-3 text-sm font-semibold text-cyan-600">
              Total Users : {users.length}
            </p>
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="🔍 Cari nama, email, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-72 rounded-2xl border border-slate-300 px-4 py-3 text-black outline-none focus:border-cyan-500"
            />

            <Link
              href="/admin/users/add"
              className="rounded-2xl bg-cyan-500 px-5 py-3 font-bold text-white transition hover:bg-cyan-600"
            >
              + Add User
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-3xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">NIK / NPWP</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b transition hover:bg-slate-50"
                  >
                    <td className="p-4">{user.id}</td>
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.phone}</td>
                    <td className="p-4">
                      {user.identifier_number}
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">

                        <Link
                          href={`/admin/users/edit/${user.id}`}
                          className="rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-600"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(user.id)
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
                    colSpan={6}
                    className="p-8 text-center text-slate-500"
                  >
                    User tidak ditemukan.
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