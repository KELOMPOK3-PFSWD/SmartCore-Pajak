"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedRole) setRole(storedRole);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/60 bg-white/90 py-3 backdrop-blur-xl shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="group flex flex-col">
          <span className="text-2xl font-black tracking-tighter text-slate-950">
            Smart Core<span className="text-cyan-500">Pajak</span>
          </span>
          <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 transition-colors group-hover:text-cyan-500">
            Digital Tax Administration
          </p>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className={`relative rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                isActive("/")
                  ? "text-cyan-600"
                  : "text-slate-600 hover:text-cyan-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/tax"
              className={`relative rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                isActive("/tax")
                  ? "text-cyan-600"
                  : "text-slate-600 hover:text-cyan-600"
              }`}
            >
              Tax
            </Link>
            <Link
              href="/reports"
              className={`relative rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                isActive("/reports")
                  ? "text-cyan-600"
                  : "text-slate-600 hover:text-cyan-600"
              }`}
            >
              Reports
            </Link>

          {user && (
            <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1">
              <Link
                href="/dashboard"
                className={`relative rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                  isActive("/dashboard")
                    ? "text-cyan-600"
                    : "text-slate-600 hover:text-cyan-600"
                }`}
              >
                Dashboard
              </Link>
              
              <Link
                href="/services"
                className={`relative rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                  isActive("/services")
                    ? "text-cyan-600"
                    : "text-slate-600 hover:text-cyan-600"
                }`}
              >
                Services
              </Link>
              
              <Link
                href="/officers"
                className={`relative rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                  isActive("/officers")
                    ? "text-cyan-600"
                    : "text-slate-600 hover:text-cyan-600"
                }`}
              >
                Officers
              </Link>

              {role === "1" && (
                <Link
                  href="/admin"
                  className={`relative rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                    isActive("/admin")
                      ? "text-cyan-600"
                      : "text-slate-600 hover:text-cyan-600"
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          )}
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="hidden lg:flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-sm font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{user.name}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/register"
              className="rounded-2xl bg-slate-950 px-7 py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-xl transition hover:bg-cyan-500"
            >
              Get Started
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="group flex h-12 w-12 flex-col items-center justify-center gap-1.5 rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-500 lg:hidden"
          >
            <span className="h-0.5 w-5 rounded-full bg-slate-600 group-hover:bg-cyan-500"></span>
            <span className="h-0.5 w-5 rounded-full bg-slate-600 group-hover:bg-cyan-500"></span>
            <span className="h-0.5 w-3 rounded-full bg-slate-600 group-hover:bg-cyan-500"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="flex flex-col p-5 gap-2">
            <Link href="/" className="px-4 py-2 hover:bg-slate-50 rounded-xl">Home</Link>
            <Link href="/tax" className="px-4 py-2 hover:bg-slate-50 rounded-xl">Tax</Link>
            <Link href="/reports" className="px-4 py-2 hover:bg-slate-50 rounded-xl">Reports</Link>
            {user && (
              <>
                <Link href="/dashboard" className="px-4 py-2 hover:bg-slate-50 rounded-xl">Dashboard</Link>
                <Link href="/services" className="px-4 py-2 hover:bg-slate-50 rounded-xl">Services</Link>
                <Link href="/officers" className="px-4 py-2 hover:bg-slate-50 rounded-xl">Officers</Link>
                {role === "1" && (
                  <Link href="/admin" className="px-4 py-2 hover:bg-slate-50 rounded-xl text-red-600">Admin</Link>
                )}
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}