"use client";

import { useMemo, useState } from "react";
import { Chip } from "@heroui/react";
import { cguRecommendations } from "@/data/cguOdishaData";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function CguRecommendationsPage() {
  const [openCard, setOpenCard] = useState<string | null>(null);

  const sortedRecommendations = useMemo(() => {
    const rank = { High: 3, Medium: 2, Low: 1 };
    return [...cguRecommendations].sort((a, b) => rank[b.impact] - rank[a.impact]);
  }, []);

  return (
    <div className="space-y-2">
      {sortedRecommendations.map((item) => {
        const isOpen = openCard === item.title;
        return (
          <motion.button
            key={item.title}
            type="button"
            onClick={() => setOpenCard((prev) => (prev === item.title ? null : item.title))}
            className={`w-full border-b px-2 py-5 text-left transition-colors md:px-4 ${
              isOpen ? "border-[#22C55E]/45 bg-[#0b1220]/35" : "border-white/10 hover:bg-[#111827]/45"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-[30px] font-bold leading-tight text-[#E5E7EB]">
                  {item.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <Chip
                    className={
                      item.impact === "High"
                        ? "bg-[#14532d] text-[#bbf7d0]"
                        : item.impact === "Medium"
                          ? "bg-[#1e293b] text-[#cbd5e1]"
                          : "border border-white/15 bg-[#111827] text-[#94a3b8]"
                    }
                    size="sm"
                  >
                    {item.impact} Impact
                  </Chip>
                  <p className="text-base font-semibold text-[#86efac]">Reduction: {item.reduction}</p>
                </div>
              </div>

              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="pt-2 text-[#94a3b8]"
              >
                <ChevronDown size={22} />
              </motion.span>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 max-w-3xl rounded-xl border border-white/10 bg-[#0b1220] p-4">
                    <p className="text-base leading-relaxed text-[#cbd5e1]">{item.description}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[#94a3b8]">
                      Recommended for rollout in 30-90 days
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
