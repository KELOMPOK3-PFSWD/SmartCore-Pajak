"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRouter from "@/api/router";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const id = Number(params.id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [identifierNumber, setIdentifierNumber] = useState("");
  const [typeId, setTypeId] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["getUser", id],
    queryFn: () => apiRouter.users.getUser(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setIdentifierNumber(data.identifier_number);
      setTypeId(data.type_id ?? 0);
    }
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: () =>
      apiRouter.users.updateUser(id, {
        name,
        email,
        phone,
        identifier_number: identifierNumber,
        password,
        password_confirmation: passwordConfirmation,
        type_id: typeId,
      }),

    onSuccess: () => {
      alert("User berhasil diupdate!");

      queryClient.invalidateQueries({
        queryKey: ["getUsers"],
      });

      router.push("/admin/users");
    },

    onError: (err: any) => {
      console.error(err);
      alert("Gagal mengupdate user");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      password !== "" &&
      password !== passwordConfirmation
    ) {
      alert("Password tidak sama.");
      return;
    }

    updateMutation.mutate();
  };

  if (isLoading) {
    return (
      <section className="p-10 text-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto mt-16 max-w-3xl">

        <Link
          href="/admin/users"
          className="mb-6 inline-flex font-semibold text-cyan-600"
        >
          ← Back to Users
        </Link>

        <div className="rounded-3xl bg-white p-8 shadow">
          <h1 className="text-3xl font-black">
            Edit User
          </h1>

          <p className="mt-2 text-slate-500">
            Perbarui data user.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            <input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border p-4 text-black"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border p-4 text-black"
              required
            />

            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border p-4 text-black"
              required
            />

            <input
              type="text"
              placeholder="NIK / NPWP"
              value={identifierNumber}
              onChange={(e) =>
                setIdentifierNumber(e.target.value)
              }
              className="w-full rounded-xl border p-4 text-black"
              required
            />

            <select
              value={typeId}
              onChange={(e) =>
                setTypeId(Number(e.target.value))
              }
              className="w-full rounded-xl border p-4 text-black"
            >
              <option value={0}>User</option>
              <option value={1}>Admin</option>
            </select>

            <input
              type="password"
              placeholder="Password Baru (opsional)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border p-4 text-black"
            />

            <input
              type="password"
              placeholder="Konfirmasi Password Baru"
              value={passwordConfirmation}
              onChange={(e) =>
                setPasswordConfirmation(e.target.value)
              }
              className="w-full rounded-xl border p-4 text-black"
            />

            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="w-full rounded-xl bg-cyan-500 p-4 font-bold text-white hover:bg-cyan-600"
            >
              {updateMutation.isPending
                ? "Updating..."
                : "Update User"}
            </button>

          </form>
        </div>
      </div>
    </section>
  );
}