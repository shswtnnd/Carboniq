"use client";

import type { ReactNode } from "react";

type GradientStripesBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

export default function GradientStripesBackground({
  children,
  className = "",
}: GradientStripesBackgroundProps) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#020617] ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(150deg,#020617_0%,#0f172a_45%,#1e293b_100%)]" />

      <div className="gradient-stripe-band gradient-stripe-band--one" />
      <div className="gradient-stripe-band gradient-stripe-band--two" />
      <div className="gradient-stripe-band gradient-stripe-band--three" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,6,23,0.22)_0%,rgba(2,6,23,0.68)_72%)]" />
      <div className="noise-overlay pointer-events-none absolute inset-0" />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
