"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function EarthScene() {
  return (
    <motion.div
      className="absolute inset-0 z-0 h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        animate={{ x: [0, -8, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="/earth-hero.jpg"
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-[50%_60%] brightness-[0.78] saturate-[0.88]"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-black/38" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_58%_44%,rgba(148,163,184,0.16)_0%,rgba(148,163,184,0.06)_24%,transparent_52%)] blur-[3px]" />
    </motion.div>
  );
}
