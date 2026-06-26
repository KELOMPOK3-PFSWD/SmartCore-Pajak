"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const userString = localStorage.getItem("user");

    if (!userString) {
      router.replace("/login");
      return;
    }

    const user = JSON.parse(userString);

    if (user.type_id !== 1) {
      alert("Anda tidak memiliki akses ke halaman admin.");
      router.replace("/dashboard");
    }
  }, [router]);

  return <>{children}</>;
}