import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart Core Pajak",
  description: "Digital Tax Administration System",
  keywords: ["tax", "pajak", "dashboard"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-white text-slate-900`}>
        <QueryProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}