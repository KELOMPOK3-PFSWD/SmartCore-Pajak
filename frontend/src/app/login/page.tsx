"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const res = await fetch("http://172.26.131.14:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Simpan user
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        // Simpan token
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        // Simpan role admin/user
        localStorage.setItem(
          "role",
          data.user.type_id.toString()
        );

        setMessage("Login berhasil!");

        // Semua login diarahkan ke Home
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setError(data.error || "Login gagal");
      }
    } catch (err) {
      setError("Gagal terhubung ke server backend");
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 px-6 py-20">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[40px] bg-white shadow-2xl lg:grid-cols-2">

        {/* Left */}
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-700 p-14 lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              Smart Core Pajak
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-white">
              Digital Tax
              <span className="block">
                Administration
              </span>
            </h1>

            <p className="mt-6 max-w-md leading-8 text-cyan-100">
              Platform modern untuk pengelolaan perpajakan,
              validasi data, dan monitoring realtime.
            </p>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
            <p className="text-sm text-cyan-100">
              System Status
            </p>

            <h3 className="mt-3 text-3xl font-black text-white">
              Stable & Secure
            </h3>
          </div>
        </div>

        {/* Right */}
        <div className="p-10 md:p-16">
          <div className="mx-auto max-w-md">

            <h2 className="text-4xl font-black text-slate-900">
              Login Account
            </h2>

            <p className="mt-3 text-slate-500">
              Access Smart Core Pajak dashboard system.
            </p>

            {message && (
              <div className="mt-6 rounded-2xl bg-green-100 px-4 py-3 text-sm font-semibold text-green-700">
                {message}
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-2xl bg-red-100 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <form
              className="mt-10 space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="mt-3 w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="mt-3 w-full rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-cyan-500"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 text-sm text-slate-600">
                  <input type="checkbox" />
                  Remember me
                </label>

                <a
                  href="#"
                  className="text-sm font-medium text-cyan-600"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-950 px-5 py-4 font-bold text-white transition hover:bg-cyan-500 hover:text-slate-950"
              >
                Login System
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don&apos;t have an account?

              <Link
                href="/register"
                className="ml-2 font-semibold text-cyan-600"
              >
                Register
              </Link>
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}