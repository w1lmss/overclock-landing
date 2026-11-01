"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Flavor } from "@/types/flavor";
import { Can3D } from "./Can3D";

interface CanSceneProps {
  flavor: Flavor;
  className?: string;
}

export function CanScene({ flavor, className = "" }: CanSceneProps) {
  return (
    <div
      className={`relative flex items-center justify-center select-none w-full h-[400px] sm:h-[480px] md:h-[560px] max-w-[340px] sm:max-w-[440px] md:max-w-[500px] mx-auto ${className}`}
      style={{
        filter: `drop-shadow(0 25px 50px ${flavor.glowColor})`,
        transition: "filter 0.6s ease",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.0], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Ambient studio illumination */}
          <ambientLight intensity={0.8} />

          {/* Key light for metallic top/body highlight */}
          <directionalLight position={[4, 6, 5]} intensity={2.0} color="#FFFFFF" />

          {/* Front fill light */}
          <directionalLight position={[-3, 2, 4]} intensity={1.0} color="#E2E8F0" />

          {/* Dynamic NEON Rim Light from behind, colored by the active flavor! */}
          <directionalLight
            position={[-4, 2, -4]}
            intensity={4.0}
            color={flavor.color}
          />
          <directionalLight
            position={[4, -2, -3]}
            intensity={2.5}
            color={flavor.color}
          />

          {/* Point light accent for extra specular sheen */}
          <pointLight position={[0, -2, 3]} intensity={1.2} color={flavor.color} />

          {/* The 3D Can Object */}
          <Can3D flavor={flavor} />
        </Suspense>
      </Canvas>
    </div>
  );
}
