"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flavor } from "@/types/flavor";
import { CanGraphic } from "./CanGraphic";

interface WhySectionProps {
  currentFlavor: Flavor;
}

export function WhySection({ currentFlavor }: WhySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.innerWidth >= 1024;

    if (prefersReducedMotion || !isDesktop) {
      // Mobile / Reduced Motion: clean progressive reveal per card without locking scroll
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
      return;
    }

    // Desktop: Pinned container with Scrubbed 4-step sequence
    const ctx = gsap.context(() => {
      const pinTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: pinContainerRef.current,
        start: "top top",
        end: "+=2000",
        scrub: 0.8,
        onUpdate: (self) => {
          // Progress 0 to 1 -> step 0, 1, 2, 3
          const step = Math.min(3, Math.floor(self.progress * 4));
          setActiveStep(step);
        },
      });

      // Animate cards staggered appearance
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          {
            opacity: index === 0 ? 1 : 0.25,
            scale: index === 0 ? 1.02 : 0.96,
          },
          {
            opacity: 1,
            scale: 1.02,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: `top+=${index * 450} top`,
              end: `top+=${(index + 1) * 450} top`,
              scrub: true,
            },
          }
        );
      });

      return () => {
        pinTrigger.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-overclock"
      className="relative min-h-screen border-t border-white/5 overflow-hidden"
    >
      {/* Background glow: performant CSS radial gradient without blur filter */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        style={{
          background: `radial-gradient(circle, ${currentFlavor.color} 0%, transparent 70%)`,
        }}
      />

      {/* Pinned Viewport Container */}
      <div
        ref={pinContainerRef}
        className="w-full min-h-screen flex flex-col justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8"
      >
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
              Core Formula
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase font-heading tracking-tight text-white">
              Why OVERCLOCK
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base">
              Four core advantages engineered into every drop.
            </p>

            {/* Step Progress Indicators */}
            <div className="hidden lg:flex items-center justify-center gap-3 mt-6">
              {benefits.map((b, i) => (
                <div
                  key={b.id}
                  className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                    i === activeStep
                      ? "w-10 bg-accent"
                      : "w-3 bg-white/20"
                  }`}
                  style={i === activeStep ? { backgroundColor: currentFlavor.color } : undefined}
                />
              ))}
            </div>
          </div>

          {/* 3-Column Layout: Left Cards | Center Can | Right Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left 2 Cards (01, 02) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {benefits.slice(0, 2).map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    className={`rounded-2xl p-6 sm:p-7 border transition-[border-color,opacity,transform] duration-250 ${
                      isActive
                        ? "bg-white/[0.06] border-white/40 scale-[1.02]"
                        : "bg-white/[0.02] border-white/10 opacity-60 lg:opacity-30"
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: currentFlavor.color,
                          }
                        : undefined
                    }
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
                );
              })}
            </div>

            {/* Center Can Showcase (Using performant vector can graphic to preserve single WebGL canvas rule) */}
            <div className="lg:col-span-4 flex items-center justify-center my-4 lg:my-0">
              <div className="relative w-full max-w-[320px] sm:max-w-[380px] flex justify-center">
                <CanGraphic flavor={currentFlavor} size="md" />
              </div>
            </div>

            {/* Right 2 Cards (03, 04) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {benefits.slice(2, 4).map((item, idx) => {
                const realIdx = idx + 2;
                const isActive = activeStep === realIdx;
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      cardsRef.current[realIdx] = el;
                    }}
                    className={`rounded-2xl p-6 sm:p-7 border transition-[border-color,opacity,transform] duration-250 ${
                      isActive
                        ? "bg-white/[0.06] border-white/40 scale-[1.02]"
                        : "bg-white/[0.02] border-white/10 opacity-60 lg:opacity-30"
                    }`}
                    style={
                      isActive
                        ? {
                            borderColor: currentFlavor.color,
                          }
                        : undefined
                    }
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
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
