"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import HashScrollLink from "@/components/HashScrollLink";

type NavbarProps = {
  transparent?: boolean;
};

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollThreshold = 4;

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 8);

      if (!transparent) {
        setVisible(true);
        lastScrollY.current = currentY;
        return;
      }

      if (currentY <= 8) {
        setVisible(true);
      } else {
        const delta = currentY - lastScrollY.current;
        if (delta > scrollThreshold) {
          setVisible(false);
        } else if (delta < -scrollThreshold) {
          setVisible(true);
        }
      }

      lastScrollY.current = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const navSurface =
    transparent && !scrolled
      ? "bg-[#020617]/55"
      : "bg-[#020617]/85";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-out ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          transparent
            ? "bg-[#020617]/55 border-b border-white/10 backdrop-blur-md"
            : `${navSurface} border-b border-white/10 backdrop-blur-md`
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8 py-5">
          <Link
            href="/"
            className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold tracking-tight text-white"
          >
            Carbon<span className="text-[#22C55E]">iq</span>
          </Link>

          <div className="hidden items-center gap-12 text-base font-semibold text-white/85 md:flex">
            <Link
              href="/"
              className="group relative font-[family-name:var(--font-space-grotesk)] transition-colors hover:text-white"
            >
              Home
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#22C55E] transition-all duration-300 group-hover:w-full" />
            </Link>
            <HashScrollLink
              href="/#features"
              className="group relative font-[family-name:var(--font-space-grotesk)] transition-colors hover:text-white"
            >
              Features
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#22C55E] transition-all duration-300 group-hover:w-full" />
            </HashScrollLink>
            <HashScrollLink
              href="/#pricing"
              className="group relative font-[family-name:var(--font-space-grotesk)] transition-colors hover:text-white"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#22C55E] transition-all duration-300 group-hover:w-full" />
            </HashScrollLink>
          </div>

          <Button
            as={Link}
            href="/contact"
            radius="full"
            variant="bordered"
            className="rounded-full border border-[#22C55E] bg-[#052e1f]/20 px-7 py-2.5 text-base font-bold text-[#86efac] transition-all duration-300 hover:-translate-y-[1px] hover:bg-[#22C55E] hover:text-black"
          >
            Contact Us
          </Button>
        </div>
      </nav>
      {!transparent && <div className="h-20" aria-hidden="true" />}
    </>
  );
}
