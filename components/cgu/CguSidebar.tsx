"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, FileText, Gauge, Lightbulb, X } from "lucide-react";

const items = [
  { label: "Dashboard", href: "/cgu-odisha/dashboard", icon: Gauge },
  { label: "Buildings", href: "/cgu-odisha/buildings", icon: Building2 },
  { label: "Recommendations", href: "/cgu-odisha/recommendations", icon: Lightbulb },
  { label: "Report", href: "/cgu-odisha/report", icon: FileText },
];

type CguSidebarProps = {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
};

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#E5E7EB]">
        Carbon<span className="text-[#22C55E]">iq</span>
      </p>
      <p className="mt-1 text-[12px] font-semibold tracking-[0.24em] text-[#f5d77b]">ENTERPRISE</p>

      <nav className="mt-10 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          const emphasize = item.label === "Recommendations";
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                item.label === "Recommendations"
                  ? active
                    ? "border border-[#22C55E]/45 bg-[linear-gradient(135deg,rgba(34,197,94,0.18),rgba(17,24,39,0.92))] text-[#86efac]"
                    : "border border-[#22C55E]/35 bg-[linear-gradient(135deg,rgba(34,197,94,0.12),rgba(17,24,39,0.9))] text-[#86efac] hover:border-[#22C55E]/55"
                  : active
                    ? "border border-[#22C55E]/35 bg-[#111827] text-[#E5E7EB]"
                    : emphasize
                      ? "bg-[#111827]/45 text-[#cbd5e1] hover:bg-[#111827]/70"
                      : "text-[#cbd5e1] hover:bg-[#111827]/70"
              }`}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default function CguSidebar({ mobileOpen = false, onCloseMobile }: CguSidebarProps) {
  return (
    <>
      <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#0b1220] p-6 lg:block">
        <SidebarNav />
      </aside>

      <div
        className={`fixed inset-0 z-40 bg-black/55 backdrop-blur-sm transition-opacity lg:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onCloseMobile}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[84vw] max-w-xs border-r border-white/10 bg-[#0b1220] p-5 shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={onCloseMobile}
          className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/85"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
        <SidebarNav onNavigate={onCloseMobile} />
      </aside>
    </>
  );
}
