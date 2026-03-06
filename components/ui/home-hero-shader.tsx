"use client";

import { memo } from "react";

function HomeHeroShader({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/earth.jpg')",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(245,255,220,0.28),transparent_34%),linear-gradient(to_bottom,rgba(2,6,23,0.26),rgba(2,6,23,0.5)_42%,rgba(2,6,23,0.72))]" />
      <div className="pointer-events-none absolute inset-0 bg-[#020617]/18" />
    </div>
  );
}

export default memo(HomeHeroShader);
