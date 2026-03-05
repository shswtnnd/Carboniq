"use client";

import { useEffect, useState } from "react";

const messages = [
  "Analyzing campus infrastructure...",
  "Calculating emissions...",
  "Generating sustainability insights...",
];

export default function CguLoadingGate() {
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const duration = window.setTimeout(() => setLoading(false), 1500);
    const ticker = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 500);

    return () => {
      window.clearTimeout(duration);
      window.clearInterval(ticker);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#020617]/96 backdrop-blur-sm">
      <div className="text-center">
        <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-2 border-[#22C55E]/30 border-t-[#22C55E]" />
        <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-[#E5E7EB] md:text-2xl">
          {messages[index]}
        </p>
      </div>
    </div>
  );
}
