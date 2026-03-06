"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import CguSidebar from "@/components/cgu/CguSidebar";
import CguLoadingGate from "@/components/cgu/CguLoadingGate";
import { cguOverview } from "@/data/cguOdishaData";

export default function CguOdishaLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    window.localStorage.removeItem("carboniq_session_v1");
    router.push("/");
  };

  return (
    <main className="relative flex min-h-screen w-full overflow-x-hidden bg-[radial-gradient(circle_at_top,#0b1220,transparent_40%),#020617] text-[#E5E7EB]">
      <CguLoadingGate />
      <CguSidebar mobileOpen={mobileSidebarOpen} onCloseMobile={() => setMobileSidebarOpen(false)} />

      <section className="relative z-10 w-full p-5 md:p-8">
        <div className="mb-6 rounded-2xl border border-white/10 bg-[#111827]/80 p-4 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold sm:text-2xl">
                {cguOverview.university}
              </h1>
              <p className="text-sm text-[#cbd5e1]">{cguOverview.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#ef4444]/35 bg-[#7f1d1d]/20 px-3 text-sm font-semibold text-[#fecaca] transition hover:bg-[#7f1d1d]/35"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
        {children}
      </section>
    </main>
  );
}
