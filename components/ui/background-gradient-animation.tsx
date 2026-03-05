"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

type BackgroundGradientAnimationProps = {
  children?: ReactNode;
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: CSSProperties["mixBlendMode"];
  containerClassName?: string;
};

export function BackgroundGradientAnimation({
  children,
  gradientBackgroundStart = "rgb(2, 6, 23)",
  gradientBackgroundEnd = "rgb(15, 23, 42)",
  firstColor = "34,197,94",
  secondColor = "16,185,129",
  thirdColor = "59,130,246",
  fourthColor = "34,197,94",
  fifthColor = "2,6,23",
  pointerColor = "34,197,94",
  size = "80%",
  blendingValue = "hard-light",
  containerClassName = "",
}: BackgroundGradientAnimationProps) {
  const orbSize = size;

  const baseOrbClass = "absolute rounded-full blur-3xl";
  const blendStyle = { mixBlendMode: blendingValue };

  return (
    <div className={`relative h-full w-full overflow-hidden ${containerClassName}`}>
      <div
        className="absolute inset-0 bg-gradient-ambient"
        style={{
          background: `linear-gradient(135deg, ${gradientBackgroundStart} 0%, ${gradientBackgroundEnd} 100%)`,
        }}
      />

      <motion.div
        className={`${baseOrbClass} -left-[18%] top-[-20%]`}
        style={{
          width: orbSize,
          height: orbSize,
          background: `radial-gradient(circle, rgba(${firstColor},0.24) 0%, rgba(${firstColor},0.08) 45%, transparent 72%)`,
          ...blendStyle,
        }}
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${baseOrbClass} -right-[22%] bottom-[-24%]`}
        style={{
          width: orbSize,
          height: orbSize,
          background: `radial-gradient(circle, rgba(${secondColor},0.18) 0%, rgba(${secondColor},0.07) 48%, transparent 74%)`,
          ...blendStyle,
        }}
        animate={{ x: [0, -90, 0], y: [0, -50, 0] }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${baseOrbClass} left-[30%] top-[14%]`}
        style={{
          width: "68%",
          height: "68%",
          background: `radial-gradient(circle, rgba(${thirdColor},0.14) 0%, rgba(${thirdColor},0.05) 50%, transparent 76%)`,
          ...blendStyle,
        }}
        animate={{ x: [0, -60, 0], y: [0, 70, 0] }}
        transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${baseOrbClass} left-[52%] top-[-16%]`}
        style={{
          width: "58%",
          height: "58%",
          background: `radial-gradient(circle, rgba(${fourthColor},0.14) 0%, rgba(${fourthColor},0.05) 48%, transparent 76%)`,
          ...blendStyle,
        }}
        animate={{ x: [0, 55, 0], y: [0, 28, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${baseOrbClass} left-[6%] bottom-[-26%]`}
        style={{
          width: "72%",
          height: "72%",
          background: `radial-gradient(circle, rgba(${fifthColor},0.22) 0%, rgba(${fifthColor},0.1) 44%, transparent 74%)`,
          ...blendStyle,
        }}
        animate={{ x: [0, 36, 0], y: [0, -24, 0] }}
        transition={{ duration: 52, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${baseOrbClass} left-[42%] top-[36%]`}
        style={{
          width: "44%",
          height: "44%",
          background: `radial-gradient(circle, rgba(${pointerColor},0.1) 0%, rgba(${pointerColor},0.03) 45%, transparent 72%)`,
          ...blendStyle,
        }}
        animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,6,23,0.28)_0%,rgba(2,6,23,0.62)_72%)]" />
      {children}
    </div>
  );
}
