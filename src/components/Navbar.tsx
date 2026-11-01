"use client";

import React, { useState, useEffect } from "react";
import { Flavor } from "@/types/flavor";

interface NavbarProps {
  currentFlavor: Flavor;
}

export function Navbar({ currentFlavor }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0A0F]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg shadow-black/50"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl sm:text-2xl font-black tracking-wider text-white hover:text-accent transition-colors font-heading"
        >
          OVERCLOCK
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <a
            href="#flavors"
            className="hover:text-white hover:text-accent transition-colors py-1"
          >
            Flavors
          </a>
          <a
            href="#why-overclock"
            className="hover:text-white hover:text-accent transition-colors py-1"
          >
            Why OVERCLOCK
          </a>
          <a
            href="#where-to-buy"
            className="hover:text-white hover:text-accent transition-colors py-1"
          >
            Where to buy
          </a>
        </nav>

        {/* Current Flavor Badge & Quick CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: currentFlavor.color }}
            />
            <span className="font-medium tracking-wide">
              {currentFlavor.name}
            </span>
          </div>

          <a
            href="#where-to-buy"
            className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-accent neon-glow-btn"
          >
            Get Can
          </a>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex flex-col gap-4 text-base font-medium">
          <a
            href="#flavors"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-accent py-1"
          >
            Flavors
          </a>
          <a
            href="#why-overclock"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-accent py-1"
          >
            Why OVERCLOCK
          </a>
          <a
            href="#where-to-buy"
            onClick={() => setMobileMenuOpen(false)}
            className="text-zinc-300 hover:text-accent py-1"
          >
            Where to buy
          </a>
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-zinc-400">Selected flavor:</span>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full border border-white/10"
              style={{ color: currentFlavor.color }}
            >
              {currentFlavor.name}
            </span>
          </div>
        </div>
      )}
    </header>
  );
}

