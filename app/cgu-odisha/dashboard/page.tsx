"use client";

import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { cguMonthlyTrend, cguOverview } from "@/data/cguOdishaData";

ChartJS.register(CategoryScale, Filler, Legend, LineElement, LinearScale, PointElement, Tooltip);

const sourceRows = [
  { label: "Electricity", value: 1960 },
  { label: "Transport", value: 80 },
  { label: "Generators", value: 59 },
  { label: "Waste", value: 70 },
];

export default function CguDashboardPage() {
  return (
    <motion.div
      className="flex min-h-0 flex-col gap-4 lg:h-[calc(100vh-210px)] lg:min-h-[560px]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="grid min-h-0 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <Card className="overflow-hidden border border-white/10 bg-[#111827]/95">
          <CardBody className="space-y-4 p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold tracking-tight sm:text-2xl">
                Energy Flow
              </h2>
              <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-[#cbd5e1]">
                9 Buildings
              </span>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#0b1220] p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#94a3b8]">Total Emissions</p>
              <p className="mt-1 text-2xl font-bold text-[#E5E7EB]">{cguOverview.totalEmissions} tCO/year</p>

              <div className="mt-4 space-y-3">
                {sourceRows.map((row) => {
                  const pct = Math.max(3, Math.round((row.value / cguOverview.totalEmissions) * 100));
                  return (
                    <div key={row.label}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="text-[#cbd5e1]">{row.label}</span>
                        <span className="font-medium text-[#86efac]">{row.value} tCO</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-[#0f172a]">
                        <motion.div
                          className="h-2.5 rounded-full bg-[linear-gradient(90deg,#22C55E,#16A34A)]"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="border border-white/10 bg-[#111827]/95">
          <CardBody className="space-y-2 p-4 sm:p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-[#94a3b8]">Sustainability Score</p>
            <p className="text-4xl font-extrabold text-[#E5E7EB]">68</p>
            <p className="text-base text-[#bbf7d0]">Grade B</p>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#cbd5e1]">
              <li>Winter usage stays low.</li>
              <li>Peak summer drives higher demand.</li>
              <li>Summer break period reduces overall load.</li>
              <li>Post-break reopening gradually raises demand again.</li>
            </ul>
          </CardBody>
        </Card>
      </div>

      <Card className="min-h-[240px] overflow-hidden border border-white/10 bg-[#111827] lg:min-h-0 lg:flex-1">
        <CardBody className="h-[240px] overflow-hidden p-4 md:p-5 lg:h-full">
          <Line
            data={{
              labels: cguMonthlyTrend.labels,
              datasets: [
                {
                  label: "tCO2/month",
                  data: cguMonthlyTrend.values,
                  borderColor: "#4ADE80",
                  backgroundColor: "rgba(74,222,128,0.18)",
                  fill: true,
                  tension: 0.35,
                  pointRadius: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(148,163,184,0.35)" } },
                y: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(148,163,184,0.35)" } },
              },
              plugins: { legend: { labels: { color: "#cbd5e1" } } },
            }}
          />
        </CardBody>
      </Card>
    </motion.div>
  );
}
