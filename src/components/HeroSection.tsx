"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Flavor } from "@/types/flavor";

const CanScene = dynamic(
  () => import("./CanScene").then((mod) => mod.CanScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] sm:h-[480px] md:h-[560px] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-accent animate-spin" />
      </div>
    ),
  }
);

interface HeroSectionProps {
  currentFlavor: Flavor;
}

export function HeroSection({ currentFlavor }: HeroSectionProps) {
  const scrollToFlavors = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("flavors");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] md:w-[700px] h-[350px] sm:h-[500px] md:h-[700px] rounded-full blur-[130px] pointer-events-none opacity-25 transition-all duration-700"
        style={{ backgroundColor: currentFlavor.color }}
      />

      {/* Subtle grid pattern overlay for high-tech aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* Overclock Category Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold tracking-wider text-zinc-300 uppercase mb-4 backdrop-blur-sm">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: currentFlavor.color }}
          />
          Next-Gen Energy Formula
        </div>

        {/* Big Bold Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white uppercase font-heading select-none">
          OVERCLOCK
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl font-light text-zinc-300 max-w-xl mx-auto tracking-wide">
          Push past your limits.
        </p>

        {/* 3D CAN (Stage 2: Real Three.js Canvas with R3F) */}
        <div className="my-4 sm:my-6 relative flex items-center justify-center w-full">
          <CanScene flavor={currentFlavor} />
        </div>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#flavors"
            onClick={scrollToFlavors}
            className="px-8 py-4 rounded-full text-base sm:text-lg font-bold uppercase tracking-wider text-black bg-accent neon-glow-btn flex items-center gap-3 cursor-pointer"
          >
            Find your flavor
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-y-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
