"use client";

import { Chip } from "@heroui/react";
import { BarChart3, Building2, FileText, Gauge, Leaf } from "lucide-react";

const items = [
  { label: "Dashboard", icon: Gauge },
  { label: "Emissions", icon: BarChart3 },
  { label: "Buildings", icon: Building2 },
  { label: "Recommendations", icon: Leaf },
  { label: "Reports", icon: FileText },
];

export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-72 flex-col border-r border-white/10 bg-[#111827] p-6 lg:flex">
      <p className="text-2xl font-semibold text-[#E5E7EB]">
        Carbon<span className="text-[#22C55E]">iq</span>
      </p>
      <Chip className="mt-2 w-fit bg-[#14532d] text-[#bbf7d0]" size="sm">
        Campus Carbon Intelligence
      </Chip>

      <nav className="mt-10 space-y-2">
        {items.map((item, idx) => {
          const Icon = item.icon;
          const active = idx === 0;

          return (
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                active
                  ? "bg-[#0f172a] text-[#4ADE80]"
                  : "text-[#cbd5e1] hover:bg-[#0f172a]/70"
              }`}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
