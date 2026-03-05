"use client";

import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { motion } from "framer-motion";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { cguBuildings } from "@/data/cguOdishaData";

ChartJS.register(BarElement, CategoryScale, Legend, LinearScale, Tooltip);

export default function CguBuildingsPage() {
  const sorted = [...cguBuildings].sort((a, b) => b.emissionsTco2 - a.emissionsTco2);
  const top = sorted[0];
  const total = sorted.reduce((acc, item) => acc + item.emissionsTco2, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-white/10 bg-[#111827]">
          <CardBody className="p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-[#94a3b8]">Top emitter</p>
            <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#E5E7EB]">{top.name}</p>
            <p className="mt-1 text-sm text-[#86efac]">{top.emissionsTco2} tCO/year</p>
          </CardBody>
        </Card>
        <Card className="border border-white/10 bg-[#111827]">
          <CardBody className="p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-[#94a3b8]">Total tracked buildings</p>
            <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#E5E7EB]">{sorted.length}</p>
          </CardBody>
        </Card>
        <Card className="border border-white/10 bg-[#111827]">
          <CardBody className="p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-[#94a3b8]">Total building emissions</p>
            <p className="mt-2 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#E5E7EB]">{total}</p>
            <p className="mt-1 text-sm text-[#cbd5e1]">tCO/year</p>
          </CardBody>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <Card className="border border-white/10 bg-[#111827]">
          <CardBody className="h-[500px] overflow-hidden p-5">
            <p className="mb-4 text-sm text-[#94a3b8]">Highest emission buildings</p>
            <Bar
              data={{
                labels: sorted.map((item) => item.name),
                datasets: [
                  {
                    label: "tCO2/year",
                    data: sorted.map((item) => item.emissionsTco2),
                    backgroundColor: "rgba(34,197,94,0.78)",
                    borderColor: "rgba(34,197,94,1)",
                    borderWidth: 1,
                    borderRadius: 8,
                    borderSkipped: false,
                  },
                ],
              }}
              options={{
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                animation: { duration: 600, easing: "easeOutQuart" },
                scales: {
                  x: { ticks: { color: "#cbd5e1" }, grid: { color: "rgba(148,163,184,0.2)" } },
                  y: { ticks: { color: "#cbd5e1" }, grid: { display: false } },
                },
                plugins: {
                  legend: { labels: { color: "#cbd5e1" } },
                  tooltip: {
                    backgroundColor: "rgba(2,6,23,0.95)",
                    borderColor: "rgba(34,197,94,0.35)",
                    borderWidth: 1,
                  },
                },
              }}
            />
          </CardBody>
        </Card>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <Card className="h-full border border-white/10 bg-[#111827]">
            <CardBody>
              <p className="mb-4 text-sm text-[#94a3b8]">Building-wise emissions and electricity usage</p>
              <Table aria-label="Building emissions table" removeWrapper>
                <TableHeader>
                  <TableColumn>Building</TableColumn>
                  <TableColumn>Electricity (kWh)</TableColumn>
                  <TableColumn>Estimated Emissions (tCO2/year)</TableColumn>
                </TableHeader>
                <TableBody>
                  {sorted.map((building) => (
                    <TableRow key={building.name}>
                      <TableCell>{building.name}</TableCell>
                      <TableCell>{building.electricityKwh.toLocaleString()}</TableCell>
                      <TableCell>{building.emissionsTco2.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
