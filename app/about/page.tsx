"use client";

import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#020617] px-6 py-24 text-[#E5E7EB]">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-md">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold tracking-tight">About Carboniq</h1>
        <p className="mt-4 text-white/75">This page is coming soon. We are building it with the same quality as the rest of Carboniq.</p>
        <Link href="/" className="mt-6 inline-block text-[#4ADE80] hover:text-[#22C55E]">Back to Home</Link>
      </div>
    </main>
  );
}
