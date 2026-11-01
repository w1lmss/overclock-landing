"use client";

import React from "react";
import { Flavor } from "@/types/flavor";
import { CanGraphic } from "./CanGraphic";

interface WhySectionProps {
  currentFlavor: Flavor;
}

export function WhySection({ currentFlavor }: WhySectionProps) {
  const benefits = [
    {
      id: "01",
      title: "Zero sugar",
      description: "All the boost, none of the crash.",
      badge: "Pure energy",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: "02",
      title: "Natural caffeine",
      description: "160 mg from green coffee beans.",
      badge: "Clean extraction",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "03",
      title: "B-vitamins",
      description: "Fuel for focus.",
      badge: "Cognitive support",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: "04",
      title: "Ice cold taste",
      description: "Best served straight from the fridge.",
      badge: "Sub-zero chill",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="why-overclock"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15 transition-all duration-700"
        style={{ backgroundColor: currentFlavor.color }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
            Engineered For Speed
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase font-heading tracking-tight text-white">
            Why OVERCLOCK
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            No compromises, no crashes. Formulated for athletes, creators, and night-owls.
          </p>
        </div>

        {/* Desktop Showcase with Center Can Graphic & 4 Advantage Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 2 Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
            {benefits.slice(0, 2).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl p-6 sm:p-7 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-accent transition-colors"
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
                    {item.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase font-heading text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Can Showcase */}
          <div className="lg:col-span-4 flex items-center justify-center py-6">
            <div className="relative">
              <CanGraphic flavor={currentFlavor} size="md" />
            </div>
          </div>

          {/* Right 2 Cards */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
            {benefits.slice(2, 4).map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl p-6 sm:p-7 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-accent transition-colors"
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest text-zinc-500">
                    {item.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold uppercase font-heading text-white tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
