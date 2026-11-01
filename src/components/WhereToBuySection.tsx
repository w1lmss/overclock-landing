"use client";

import React, { useState } from "react";
import { Flavor } from "@/types/flavor";

interface WhereToBuyProps {
  currentFlavor: Flavor;
}

export function WhereToBuySection({ currentFlavor }: WhereToBuyProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [storeFeedback, setStoreFeedback] = useState<string | null>(null);

  const fictionalStores = [
    { name: "CYBERMART", city: "Global Delivery", tag: "Fast Shipping" },
    { name: "NEON DROP", city: "Flagship Stores", tag: "In-Store Pickup" },
    { name: "APEX HYPER", city: "24/7 Online", tag: "Exclusive Cases" },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubmitted(true);
  };

  const handleStoreClick = (storeName: string) => {
    setStoreFeedback(`Redirecting to ${storeName} partner portal...`);
    setTimeout(() => {
      setStoreFeedback(null);
    }, 3000);
  };

  return (
    <section
      id="where-to-buy"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-white/5 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: currentFlavor.color }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-accent">
            Distribution Network
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black uppercase font-heading tracking-tight text-white">
            Grab a can
          </h2>
          <p className="mt-4 text-zinc-400 text-sm sm:text-base">
            Find OVERCLOCK at your favorite digital retailer or sign up for drops in your area.
          </p>
        </div>

        {/* 3 Fictional Stores Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {fictionalStores.map((store) => (
            <button
              key={store.name}
              type="button"
              onClick={() => handleStoreClick(store.name)}
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.06] text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 border border-white/10">
                    {store.tag}
                  </span>
                  <svg
                    className="w-4 h-4 text-zinc-500 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-black uppercase font-heading text-white group-hover:text-accent transition-colors">
                  {store.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">{store.city}</p>
              </div>

              <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-accent inline-flex items-center gap-1.5">
                Visit Store
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
          ))}
        </div>

        {/* Store click toast feedback */}
        {storeFeedback && (
          <div className="mb-8 p-3 rounded-xl bg-white/10 border border-white/20 text-center text-xs font-medium text-zinc-300 animate-fade-in">
            {storeFeedback}
          </div>
        )}

        {/* Email Subscription Form Box */}
        <div className="rounded-3xl p-8 sm:p-12 bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-black uppercase font-heading text-white tracking-wide">
              Never Miss A Drop
            </h3>
            <p className="mt-2 text-sm text-zinc-400 mb-8">
              Be the first to know when limited edition flavors and batch restocks go live.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-white/5 border border-accent/40 flex flex-col items-center gap-3 animate-fade-in">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-black"
                  style={{ backgroundColor: currentFlavor.color }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-xl font-bold uppercase font-heading text-white">
                  You&apos;re on the list!
                </p>
                <p className="text-xs text-zinc-400">
                  We&apos;ll notify {email} before the next batch drops.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                  className="mt-2 text-xs text-zinc-400 underline hover:text-white"
                >
                  Register another email
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-5 py-3.5 rounded-full bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-accent neon-glow-btn whitespace-nowrap cursor-pointer"
                >
                  Notify me
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
