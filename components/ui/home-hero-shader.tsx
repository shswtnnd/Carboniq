"use client";

import { memo } from "react";
import {
  Shader,
  CRTScreen,
  FloatingParticles,
  FlowField,
  Godrays,
  SolidColor,
  StudioBackground,
} from "shaders/react";

function HomeHeroShader({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Shader className="absolute inset-0 h-full w-full">
        <SolidColor color="#06150c" />
        <StudioBackground
          color="#0b1c12"
          brightness={20}
          keyColor="#dcffb3"
          keyIntensity={36}
          keySoftness={72}
          fillColor="#2a7e52"
          fillIntensity={16}
          fillSoftness={84}
          fillAngle={68}
          backColor="#0f4c2e"
          backIntensity={22}
          backSoftness={82}
          center={{ x: 0.5, y: 0.12 }}
          lightTarget={92}
          wallCurvature={18}
          vignette={14}
          ambientIntensity={42}
          ambientSpeed={1.2}
          seed={9}
        />
        <Godrays
          blendMode="screen"
          center={{ x: 0.52, y: 0.01 }}
          density={0.24}
          intensity={0.52}
          spotty={0.82}
          speed={0.22}
          rayColor="#e6ffc5"
          backgroundColor="transparent"
          opacity={0.34}
        />
        <FlowField blendMode="overlay" strength={0.07} detail={1.8} speed={0.3} edges="mirror" opacity={0.24} />
        <FloatingParticles
          blendMode="screen"
          randomness={0.3}
          speed={0.12}
          angle={98}
          particleSize={0.9}
          particleSoftness={0.62}
          twinkle={0.42}
          count={3}
          particleColor="#caff9d"
          speedVariance={0.28}
          angleVariance={24}
          particleDensity={2.1}
          opacity={0.26}
        />
        <CRTScreen
          brightness={1.08}
          colorShift={0.1}
          contrast={1.06}
          pixelSize={68}
          scanlineFrequency={200}
          scanlineIntensity={0.36}
        />
      </Shader>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(236,255,198,0.2),transparent_33%),linear-gradient(to_bottom,rgba(2,6,23,0.34),rgba(2,6,23,0.54))]" />
    </div>
  );
}

export default memo(HomeHeroShader);
