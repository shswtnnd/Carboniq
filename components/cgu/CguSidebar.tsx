"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, FileText, Gauge, Lightbulb } from "lucide-react";

const items = [
  { label: "Dashboard", href: "/cgu-odisha/dashboard", icon: Gauge },
  { label: "Buildings", href: "/cgu-odisha/buildings", icon: Building2 },
  { label: "Recommendations", href: "/cgu-odisha/recommendations", icon: Lightbulb },
  { label: "Report", href: "/cgu-odisha/report", icon: FileText },
];

export default function CguSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-[#0b1220] p-6 lg:block">
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
    </aside>
  );
}
