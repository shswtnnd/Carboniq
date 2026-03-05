"use client";

import type { ReactNode } from "react";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

type MinimalAmbientBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

const ENABLE_MINIMAL_AMBIENT = true;

export default function MinimalAmbientBackground({
  children,
  className = "",
}: MinimalAmbientBackgroundProps) {
  if (!ENABLE_MINIMAL_AMBIENT) {
    return <>{children}</>;
  }

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgb(2, 6, 23)"
      gradientBackgroundEnd="rgb(15, 23, 42)"
      firstColor="34,197,94"
      secondColor="14,165,233"
      thirdColor="30,41,59"
      fourthColor="34,197,94"
      fifthColor="2,6,23"
      pointerColor="34,197,94"
      size="70%"
      blendingValue="hard-light"
      containerClassName={`absolute inset-0 opacity-65 pointer-events-none ${className}`}
    >
      {children}
    </BackgroundGradientAnimation>
  );
}
