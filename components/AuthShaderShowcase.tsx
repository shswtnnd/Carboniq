"use client";

import {
  Shader,
  Ascii,
  Blob,
  Bulge,
  CRTScreen,
  Checkerboard,
  ChromaFlow,
  CursorTrail,
  Group,
  Ripples,
  SolidColor,
  TiltShift,
} from "shaders/react";

type AuthShaderShowcaseProps = {
  heading: string;
  body: string;
  className?: string;
};

export default function AuthShaderShowcase({
  heading,
  body,
  className = "",
}: AuthShaderShowcaseProps) {
  return (
    <section
      className={`relative h-full min-h-[560px] overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220] ${className}`}
    >
      <Shader>
        <SolidColor color="#17171a" />
        <Group>
          <Checkerboard cells={22} colorB="#383e42" />
          <Ripples
            blendMode="overlay"
            frequency={23.8}
            opacity={0.32}
            speed={1.9}
            thickness={0.3}
          />
          <Blob
            id="idmh47oyx205ue8s7u1"
            colorA="#5cf525"
            colorB="#1e6ce9"
            deformation={0.37}
            highlightColor="#fff71a"
            highlightIntensity={0.45}
            highlightX={0.06}
            highlightY={-0.1}
            softness={0.63}
            speed={2}
            visible={true}
          />
          <Ripples
            blendMode="overlay"
            frequency={6.2}
            maskSource="idmh47oyx205ue8s7u1"
            opacity={0.4}
            softness={0.57}
            speed={-0.5}
            thickness={0.39}
          />
          <ChromaFlow
            baseColor="#eef21d"
            downColor="#f0e1e1"
            intensity={1.5}
            leftColor="#e1e1f0"
            maskSource="idmh47oyx205ue8s7u1"
            momentum={10}
            rightColor="#ededd5"
            upColor="#c1e0c1"
          />
          <CursorTrail />
          <Ascii cellSize={60} characters="" />
          <Bulge
            edges="mirror"
            falloff={1}
            radius={2.6}
            strength={-0.29}
            transform={{
              edges: "mirror",
              rotation: 35,
            }}
          />
        </Group>
        <TiltShift angle={90} falloff={0.26} intensity={10} width={0.29} />
        <CRTScreen
          brightness={2}
          colorShift={0.8}
          contrast={1.01}
          pixelSize={60}
          scanlineFrequency={210}
          scanlineIntensity={0.91}
        />
      </Shader>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.2),transparent_40%),linear-gradient(to_top,rgba(2,6,23,0.9),rgba(2,6,23,0.2)_45%,rgba(2,6,23,0.15))]" />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#d9f99d]">Carboniq for Colleges</p>
        <h2 className="mt-3 max-w-lg font-[family-name:var(--font-instrument-serif)] text-4xl leading-tight text-white">
          {heading}
        </h2>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-white/85">{body}</p>
      </div>
    </section>
  );
}
