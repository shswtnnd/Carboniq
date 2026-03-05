"use client";

import type { ReactNode } from "react";
import CguSidebar from "@/components/cgu/CguSidebar";
import CguLoadingGate from "@/components/cgu/CguLoadingGate";
import { cguOverview } from "@/data/cguOdishaData";

export default function CguOdishaLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen w-full overflow-x-hidden bg-[radial-gradient(circle_at_top,#0b1220,transparent_40%),#020617] text-[#E5E7EB]">
      <CguLoadingGate />
      <CguSidebar />

      <section className="relative z-10 w-full p-5 md:p-8">
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#111827]/80 p-4 backdrop-blur-sm">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
            {cguOverview.university}
          </h1>
          <p className="text-sm text-[#cbd5e1]">{cguOverview.location}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
