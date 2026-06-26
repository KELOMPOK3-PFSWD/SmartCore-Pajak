import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-3">

        {/* Brand */}
        <div>

          <h2 className="text-3xl font-black">
            Smart Core
            <span className="text-cyan-400">
              Pajak
            </span>
          </h2>

          <p className="mt-5 leading-8 text-slate-400">

            Platform modern untuk administrasi perpajakan digital,
            monitoring transaksi, dan validasi data perusahaan.

          </p>

        </div>

        {/* Navigation */}
        <div>

          <h3 className="text-lg font-bold">
            Navigation
          </h3>

          <div className="mt-5 flex flex-col gap-4 text-slate-400">

            <Link href="/" className="hover:text-cyan-400">
              Home
            </Link>

            <Link href="/tax" className="hover:text-cyan-400">
              Tax Services
            </Link>

            <Link href="/dashboard" className="hover:text-cyan-400">
              Dashboard
            </Link>

            <Link href="/login" className="hover:text-cyan-400">
              Login
            </Link>

            <Link href="/register" className="hover:text-cyan-400">
              Register
            </Link>

          </div>

        </div>

        {/* Contact */}
        <div>

          <h3 className="text-lg font-bold">
            System Information
          </h3>

          <div className="mt-5 space-y-4 text-slate-400">

            <p>
              📍 Jakarta Digital Center
            </p>

            <p>
              📧 smartcore@tax.id
            </p>

            <p>
              ☎ +62 812 3456 7890
            </p>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">

        © 2026 Smart Core Pajak. All rights reserved.

      </div>

    </footer>
  );
}