"use client";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Card, CardBody } from "@heroui/react";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
);

type CguChartsProps = {
  pieLabels: string[];
  pieValues: number[];
  barLabels: string[];
  barValues: number[];
  lineLabels: string[];
  lineValues: number[];
};

const axisColor = "rgba(148, 163, 184, 0.35)";
const tickColor = "#cbd5e1";

export default function CguCharts({
  pieLabels,
  pieValues,
  barLabels,
  barValues,
  lineLabels,
  lineValues,
}: CguChartsProps) {
  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieValues,
        backgroundColor: ["#22C55E", "#4ADE80", "#16A34A", "#86EFAC"],
        borderColor: "#0f172a",
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: "tCO2/year",
        data: barValues,
        backgroundColor: "rgba(34, 197, 94, 0.82)",
        borderRadius: 10,
      },
    ],
  };

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "tCO2/month",
        data: lineValues,
        borderColor: "#4ADE80",
        backgroundColor: "rgba(74, 222, 128, 0.16)",
        fill: true,
        pointRadius: 2,
        tension: 0.35,
      },
    ],
  };

  const axisOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: tickColor } },
    },
    scales: {
      x: { ticks: { color: tickColor }, grid: { color: axisColor } },
      y: { ticks: { color: tickColor }, grid: { color: axisColor } },
    },
  };

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Card className="overflow-hidden border border-white/10 bg-[#111827]">
        <CardBody className="h-80 overflow-hidden">
          <p className="mb-4 text-sm text-[#94a3b8]">Emissions by source</p>
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
        </CardBody>
      </Card>

      <Card className="overflow-hidden border border-white/10 bg-[#111827]">
        <CardBody className="h-80 overflow-hidden">
          <p className="mb-4 text-sm text-[#94a3b8]">Building electricity impact</p>
          <Bar data={barData} options={axisOptions} />
        </CardBody>
      </Card>

      <Card className="overflow-hidden border border-white/10 bg-[#111827] xl:col-span-2">
        <CardBody className="h-96 overflow-hidden">
          <p className="mb-4 text-sm text-[#94a3b8]">Monthly emissions trend</p>
          <Line data={lineData} options={axisOptions} />
        </CardBody>
      </Card>
    </div>
  );
}
