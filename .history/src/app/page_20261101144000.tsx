"use client";

import React, { useState } from "react";
import { FLAVORS, Flavor, FlavorId } from "@/types/flavor";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { FlavorsSection } from "@/components/FlavorsSection";
import { WhySection } from "@/components/WhySection";
import { WhereToBuySection } from "@/components/WhereToBuySection";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [currentFlavor, setCurrentFlavor] = useState<Flavor>(FLAVORS[0]);

  const handleSelectFlavor = (flavorId: FlavorId) => {
    const found = FLAVORS.find((f) => f.id === flavorId);
    if (found) {
      setCurrentFlavor(found);
    }
  };

  return (
    <div
      data-flavor={currentFlavor.id}
      style={
        {
          "--accent": currentFlavor.color,
          "--accent-glow": currentFlavor.glowColor,
        } as React.CSSProperties
      }
      className="relative min-h-screen bg-[#0A0A0F] text-white transition-accent overflow-x-hidden"
    >
      {/* Top Navigation */}
      <Navbar currentFlavor={currentFlavor} />

      {/* Main Content with 5 Blocks */}
      <main className="flex flex-col w-full">
        {/* 1. Hero */}
        <HeroSection currentFlavor={currentFlavor} />

        {/* 2. Flavors */}
        <FlavorsSection
          currentFlavor={currentFlavor}
          onSelectFlavor={handleSelectFlavor}
        />

        {/* 3. Why OVERCLOCK */}
        <WhySection currentFlavor={currentFlavor} />

        {/* 4. Where to buy */}
        <WhereToBuySection currentFlavor={currentFlavor} />
      </main>

      {/* 5. Footer */}
      <Footer />
    </div>
  );
}
