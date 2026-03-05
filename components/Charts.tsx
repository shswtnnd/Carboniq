"use client";

import { Card, CardBody } from "@heroui/react";
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
  Title,
  Tooltip,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import type { InstitutionData } from "@/data/demoData";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
);

type ChartsProps = {
  data: InstitutionData;
};

const axisColor = "rgba(148, 163, 184, 0.35)";
const tickColor = "#cbd5e1";

export default function Charts({ data }: ChartsProps) {
  const pieData = {
    labels: data.sources.map((source) => source.name),
    datasets: [
      {
        data: data.sources.map((source) => source.value),
        backgroundColor: ["#22C55E", "#4ADE80", "#16A34A", "#86EFAC"],
        borderColor: "#0f172a",
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: data.buildings.map((building) => building.name),
    datasets: [
      {
        label: "tCO2e",
        data: data.buildings.map((building) => building.value),
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderRadius: 10,
      },
    ],
  };

  const lineData = {
    labels: data.monthlyTrend.map((month) => month.month),
    datasets: [
      {
        label: "tCO2e",
        data: data.monthlyTrend.map((month) => month.total),
        borderColor: "#4ADE80",
        backgroundColor: "rgba(74, 222, 128, 0.18)",
        fill: true,
        tension: 0.36,
        pointRadius: 2,
        pointBackgroundColor: "#86EFAC",
      },
    ],
  };

  const sharedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: tickColor,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: tickColor },
        grid: { color: axisColor },
      },
      y: {
        ticks: { color: tickColor },
        grid: { color: axisColor },
      },
    },
  };

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <Card className="border border-white/10 bg-[#111827]">
        <CardBody className="h-80">
          <p className="mb-4 text-sm text-[#94a3b8]">Emissions by source</p>
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
        </CardBody>
      </Card>

      <Card className="border border-white/10 bg-[#111827]">
        <CardBody className="h-80">
          <p className="mb-4 text-sm text-[#94a3b8]">Emissions by building</p>
          <Bar data={barData} options={sharedOptions} />
        </CardBody>
      </Card>

      <Card className="border border-white/10 bg-[#111827] xl:col-span-2">
        <CardBody className="h-96">
          <p className="mb-4 text-sm text-[#94a3b8]">Monthly emissions trend</p>
          <Line data={lineData} options={sharedOptions} />
        </CardBody>
      </Card>
    </div>
  );
}
