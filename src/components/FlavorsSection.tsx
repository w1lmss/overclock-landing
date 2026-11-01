"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flavor, FLAVORS, FlavorId } from "@/types/flavor";
import { CanGraphic } from "./CanGraphic";

interface FlavorsSectionProps {
  currentFlavor: Flavor;
  onSelectFlavor: (flavorId: FlavorId) => void;
}

export function FlavorsSection({
  currentFlavor,
  onSelectFlavor,
}: FlavorsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: prefersReducedMotion ? 0 : 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Tabs reveal
      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          { opacity: 0, y: prefersReducedMotion ? 0 : 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Staggered cards reveal
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: prefersReducedMotion ? 0 : 45 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="flavors"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background radial gradient reflecting active flavor */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: currentFlavor.color }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
            Triple Formula
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase font-heading tracking-tight text-white">
            Choose Your Flavor
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Select a flavor to preview the formula, tune the atmosphere, and charge up.
          </p>
        </div>

        {/* Flavor Switcher Tabs */}
        <div ref={tabsRef} className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
          {FLAVORS.map((flavor) => {
            const isSelected = flavor.id === currentFlavor.id;
            return (
              <button
                key={flavor.id}
                type="button"
                onClick={() => onSelectFlavor(flavor.id)}
                className={`flex items-center gap-3 px-5 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? "bg-white text-black shadow-lg shadow-white/10 scale-105"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
                style={
                  isSelected
                    ? {
                        backgroundColor: flavor.color,
                        boxShadow: `0 0 25px ${flavor.glowColor}`,
                      }
                    : undefined
                }
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ backgroundColor: flavor.color }}
                />
                {flavor.name}
              </button>
            );
          })}
        </div>

        {/* 3 Flavors Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {FLAVORS.map((flavor, index) => {
            const isActive = flavor.id === currentFlavor.id;
            return (
              <div
                key={flavor.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                onClick={() => onSelectFlavor(flavor.id)}
                className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center cursor-pointer transition-all duration-500 border ${
                  isActive
                    ? "bg-white/[0.04] border-white/30 shadow-2xl scale-[1.02]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                }`}
                style={
                  isActive
                    ? {
                        borderColor: flavor.color,
                        boxShadow: `0 0 35px ${flavor.glowColor}`,
                      }
                    : undefined
                }
              >
                {/* Active Indicator Badge */}
                <div className="w-full flex justify-between items-center mb-4">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border"
                    style={{
                      color: flavor.color,
                      borderColor: `${flavor.color}40`,
                      backgroundColor: `${flavor.color}10`,
                    }}
                  >
                    {flavor.mood}
                  </span>
                  {isActive && (
                    <span
                      className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full text-black font-heading"
                      style={{ backgroundColor: flavor.color }}
                    >
                      Active
                    </span>
                  )}
                </div>

                {/* Mini Can Graphic */}
                <div className="py-4 my-2 transition-transform duration-500 group-hover:scale-105">
                  <CanGraphic flavor={flavor} size="sm" />
                </div>

                {/* Flavor Title & Texts from TZ */}
                <h3 className="mt-4 text-xl sm:text-2xl font-black uppercase font-heading text-white tracking-wide">
                  {flavor.name}
                </h3>
                <p className="mt-2 text-sm sm:text-base font-medium text-zinc-300 min-h-[48px] flex items-center justify-center">
                  «{flavor.tagline}»
                </p>

                {/* Specs from TZ */}
                <div className="mt-6 pt-5 border-t border-white/10 w-full">
                  <div
                    className="text-xs font-bold uppercase tracking-wider py-1.5 px-3 rounded-lg bg-black/40 border border-white/5"
                    style={{ color: flavor.color }}
                  >
                    {flavor.specs}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
