"use client";

import { Card, CardBody } from "@heroui/react";

type MetricCard = {
  label: string;
  value: string;
  trend: string;
};

type DashboardCardsProps = {
  metrics: MetricCard[];
};

export default function DashboardCards({ metrics }: DashboardCardsProps) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="border border-white/10 bg-[#111827]">
          <CardBody className="space-y-2">
            <p className="text-sm text-[#94a3b8]">{metric.label}</p>
            <p className="text-2xl font-semibold text-[#E5E7EB]">{metric.value}</p>
            <p className="text-xs text-[#4ADE80]">{metric.trend}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
