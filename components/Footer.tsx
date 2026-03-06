"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  product: [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Dashboard", href: "/auth?next=/dashboard" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  social: [
    { label: "X / Twitter", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#020617] px-6 pb-20 pt-[120px]">
      <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.12),transparent_45%)]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <p className="pointer-events-none mb-12 text-center font-[family-name:var(--font-space-grotesk)] text-[clamp(72px,15vw,176px)] font-bold tracking-[-0.03em] text-white/10 blur-[1px]">
          Carboniq
        </p>

        <motion.div
          className="mx-auto grid max-w-[980px] items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg md:grid-cols-[1.4fr_1fr] md:p-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div>
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-white md:text-4xl">
              Want to measure your campus carbon footprint?
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Carboniq helps institutions track emissions, understand environmental impact,
              and move toward sustainable operations.
            </p>
          </div>

          <div className="flex justify-start md:justify-end">
            <Link
              href="/auth?next=/dashboard"
              className="group inline-flex items-center gap-3 rounded-full border border-[#22C55E]/50 bg-[#0b1a12]/55 px-5 py-3 text-[#86efac] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#22C55E] hover:bg-[#22C55E]/18"
            >
              <span className="rounded-full bg-[#22C55E]/18 p-2 text-[#4ADE80] transition-colors group-hover:bg-[#22C55E]/28">
                <ArrowRight size={16} />
              </span>
              <span className="text-sm font-semibold md:text-base">Get Started with Carboniq</span>
            </Link>
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:text-left">
          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold uppercase tracking-[0.16em] text-white/90">
              Product
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/75 transition-colors hover:text-[#4ADE80]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold uppercase tracking-[0.16em] text-white/90">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/75 transition-colors hover:text-[#4ADE80]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold uppercase tracking-[0.16em] text-white/90">
              Social
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.social.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/75 transition-colors hover:text-[#4ADE80]"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-center text-sm text-white/60">
          <p>© 2026 Carboniq</p>
          <p className="mt-1">Carbon Intelligence for Campuses</p>
          <p className="mt-1">Made with ♥ at CGU, Odisha</p>
        </div>
      </div>
    </footer>
  );
}
