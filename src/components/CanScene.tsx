"use client";

import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Flavor } from "@/types/flavor";
import { Can3D } from "./Can3D";

interface CanSceneProps {
  flavor: Flavor;
  className?: string;
}

export function CanScene({ flavor, className = "" }: CanSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause rendering when block leaves screen or browser tab is hidden (Item 3 per customer fixes)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && !document.hidden);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none w-full h-[400px] sm:h-[480px] md:h-[560px] max-w-[340px] sm:max-w-[440px] md:max-w-[500px] mx-auto ${className}`}
    >
      <Canvas
        frameloop={isVisible ? "always" : "never"}
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
          <ambientLight intensity={0.9} />

          {/* Key light for metallic top/body highlight */}
          <directionalLight position={[4, 6, 5]} intensity={2.0} color="#FFFFFF" />

          {/* Front fill light */}
          <directionalLight position={[-3, 2, 4]} intensity={1.0} color="#E2E8F0" />

          {/* Dynamic NEON Rim Light from behind, colored by the active flavor */}
          <directionalLight
            position={[-4, 2, -4]}
            intensity={3.8}
            color={flavor.color}
          />
          <directionalLight
            position={[4, -2, -3]}
            intensity={2.2}
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
