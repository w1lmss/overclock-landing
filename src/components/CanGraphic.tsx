"use client";

import React from "react";
import { Flavor } from "@/types/flavor";

interface CanGraphicProps {
  flavor: Flavor;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function CanGraphic({ flavor, className = "", size = "lg" }: CanGraphicProps) {
  const dimensions = {
    sm: "w-40 h-[300px]",
    md: "w-52 h-[380px]",
    lg: "w-64 sm:w-72 md:w-80 h-[460px] sm:h-[520px] md:h-[580px]",
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${dimensions} ${className}`}
    >
      <svg
        viewBox="0 0 240 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          {/* Metallic can gradients */}
          <linearGradient id="metal-cap" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4A4F57" />
            <stop offset="20%" stopColor="#C4C9D2" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#8A92A0" />
            <stop offset="100%" stopColor="#2E3238" />
          </linearGradient>

          <linearGradient id="metal-rim" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2D3035" />
            <stop offset="30%" stopColor="#8A939E" />
            <stop offset="50%" stopColor="#DFE4EC" />
            <stop offset="70%" stopColor="#6C737E" />
            <stop offset="100%" stopColor="#1E2024" />
          </linearGradient>

          <linearGradient id="can-body-lighting" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#050508" stopOpacity="0.85" />
            <stop offset="22%" stopColor="#FFFFFF" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.02" />
            <stop offset="85%" stopColor="#000000" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#020204" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="accent-streak" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={flavor.color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={flavor.color} stopOpacity="0.2" />
          </linearGradient>

          {/* Can body shadow */}
          <filter id="glow-badge" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Can Upper Bevel & Top Rim */}
        <g id="can-lid">
          <ellipse cx="120" cy="30" rx="95" ry="16" fill="url(#metal-cap)" />
          <ellipse cx="120" cy="27" rx="82" ry="12" fill="#1C1E22" />
          {/* Pull tab */}
          <path
            d="M 112 24 C 112 21, 128 21, 128 24 C 128 29, 124 31, 120 31 C 116 31, 112 29, 112 24 Z"
            fill="url(#metal-cap)"
            stroke="#15171A"
            strokeWidth="1"
          />
          <ellipse cx="120" cy="25" rx="3" ry="1.5" fill="#0C0E10" />
        </g>

        {/* Upper metal neck */}
        <path
          d="M 28 32 C 28 45, 20 62, 16 85 L 224 85 C 220 62, 212 45, 212 32 Z"
          fill="url(#metal-rim)"
        />

        {/* Can Main Cylinder Body */}
        <rect
          x="16"
          y="85"
          width="208"
          height="400"
          rx="6"
          fill="#0D0E14"
        />

        {/* Decorative graphic patterns on can */}
        <g opacity="0.95">
          {/* Angular brand diagonal slash */}
          <polygon
            points="16,140 224,200 224,320 16,260"
            fill="url(#accent-streak)"
            opacity="0.3"
          />
          <polygon
            points="16,250 224,310 224,350 16,290"
            fill={flavor.color}
            opacity="0.85"
          />
          {/* Geometric cyber lines */}
          <line x1="16" y1="110" x2="224" y2="160" stroke={flavor.color} strokeWidth="2" opacity="0.6" />
          <line x1="16" y1="120" x2="224" y2="170" stroke={flavor.color} strokeWidth="1" opacity="0.3" />
          <line x1="16" y1="410" x2="224" y2="445" stroke={flavor.color} strokeWidth="1.5" opacity="0.5" />
        </g>

        {/* Vertical OVERCLOCK Typography */}
        <g transform="translate(126, 280) rotate(-90)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="42"
            fontWeight="900"
            letterSpacing="6"
            style={{ fontFamily: "var(--font-unbounded)" }}
          >
            OVERCLOCK
          </text>
        </g>

        {/* Flavor name badge */}
        <g transform="translate(120, 395)">
          <rect
            x="-85"
            y="-16"
            width="170"
            height="32"
            rx="16"
            fill="#090A0E"
            stroke={flavor.color}
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fill={flavor.color}
            fontSize="13"
            fontWeight="700"
            letterSpacing="2"
            style={{ fontFamily: "var(--font-unbounded)" }}
          >
            {flavor.name.toUpperCase()}
          </text>
        </g>

        {/* Secondary spec indicator */}
        <g transform="translate(120, 440)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="#8E93A0"
            fontSize="9"
            fontWeight="600"
            letterSpacing="1.5"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            ZERO SUGAR • 160MG CAFFEINE
          </text>
        </g>

        {/* Cylindrical lighting overlay for 3D curved sheen */}
        <rect
          x="16"
          y="85"
          width="208"
          height="400"
          rx="6"
          fill="url(#can-body-lighting)"
          pointerEvents="none"
        />

        {/* Lower metal base rim */}
        <path
          d="M 16 485 L 224 485 C 220 505, 212 522, 196 528 L 44 528 C 28 522, 20 505, 16 485 Z"
          fill="url(#metal-rim)"
        />
        <ellipse cx="120" cy="528" rx="76" ry="10" fill="url(#metal-cap)" />
      </svg>
    </div>
  );
}

