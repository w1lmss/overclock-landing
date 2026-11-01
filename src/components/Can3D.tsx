"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Flavor } from "@/types/flavor";
import { createCanTexture } from "@/utils/generateCanTexture";

interface Can3DProps {
  flavor: Flavor;
}

export function Can3D({ flavor }: Can3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bodyMeshRef = useRef<THREE.Mesh>(null);

  // Pre-generate / cache textures for smooth instant swaps
  const currentTexture = useMemo(() => createCanTexture(flavor), [flavor]);
  const [displayedTexture, setDisplayedTexture] = useState<THREE.CanvasTexture>(currentTexture);

  // Flavor transition spin state
  const prevFlavorIdRef = useRef<string>(flavor.id);
  const isSpinningRef = useRef(false);
  const spinProgressRef = useRef(0);
  const spinStartAngleRef = useRef(0);
  const hasSwappedTextureRef = useRef(false);

  // Check if device is mobile (to disable tilt as per TZ)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // When flavor prop changes, initiate quick 360 spin with mid-spin texture swap
  useEffect(() => {
    if (flavor.id !== prevFlavorIdRef.current) {
      prevFlavorIdRef.current = flavor.id;
      isSpinningRef.current = true;
      spinProgressRef.current = 0;
      hasSwappedTextureRef.current = false;
      if (groupRef.current) {
        spinStartAngleRef.current = groupRef.current.rotation.y;
      }
    }
  }, [flavor]);

  // Metallic aluminum material for can top and bottom
  const aluminumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#CBD1DC"),
        roughness: 0.22,
        metalness: 0.92,
      }),
    []
  );

  const darkAluminumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8E96A4"),
        roughness: 0.35,
        metalness: 0.85,
      }),
    []
  );

  // Label body material
  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: displayedTexture,
        roughness: 0.28,
        metalness: 0.2,
      }),
    [displayedTexture]
  );

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // 1. Handling flavor change 360-degree fast spin
    if (isSpinningRef.current) {
      const spinDuration = 0.6; // 0.6 seconds total as per TZ (0.5 - 0.8s)
      spinProgressRef.current += delta / spinDuration;

      if (spinProgressRef.current >= 0.5 && !hasSwappedTextureRef.current) {
        // Halfway through spin: back of can is facing camera -> swap texture
        setDisplayedTexture(currentTexture);
        hasSwappedTextureRef.current = true;
      }

      if (spinProgressRef.current >= 1) {
        // Spin complete
        isSpinningRef.current = false;
        spinProgressRef.current = 1;
        setDisplayedTexture(currentTexture);
      }

      // Smooth ease-out cubic curve
      const t = Math.min(1, spinProgressRef.current);
      const ease = 1 - Math.pow(1 - t, 3);
      groupRef.current.rotation.y = spinStartAngleRef.current + ease * Math.PI * 2;
    } else {
      // 2. Normal continuous slow ambient rotation
      groupRef.current.rotation.y += delta * 0.45;
    }

    // 3. Mouse Tilt (Desktop only; on mobile, tilt is disabled per TZ)
    if (!isMobile) {
      const targetRotX = state.pointer.y * 0.22;
      const targetRotZ = -state.pointer.x * 0.22;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.06
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        targetRotZ,
        0.06
      );
    } else {
      // Mobile: smoothly level out to 0
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, 0, 0.1);
    }

    // Subtle breathing float on Y axis (using performance.now for smooth, warning-free timing)
    const elapsed = typeof performance !== "undefined" ? performance.now() * 0.001 : 0;
    groupRef.current.position.y = Math.sin(elapsed * 1.5) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
      {/* CAN BODY (Main label cylinder) */}
      <mesh
        ref={bodyMeshRef}
        material={bodyMaterial}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[1, 1, 3.1, 64, 1, true]} />
      </mesh>

      {/* TOP SHOULDER / TAPER */}
      <mesh
        material={aluminumMaterial}
        position={[0, 1.7, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.85, 1.0, 0.3, 64]} />
      </mesh>

      {/* TOP RIM (Chime) */}
      <mesh
        material={aluminumMaterial}
        position={[0, 1.88, 0]}
        castShadow
      >
        <cylinderGeometry args={[0.86, 0.86, 0.06, 64]} />
      </mesh>

      {/* TOP INNER SUNKEN LID */}
      <mesh
        material={darkAluminumMaterial}
        position={[0, 1.86, 0]}
        receiveShadow
      >
        <cylinderGeometry args={[0.83, 0.83, 0.02, 64]} />
      </mesh>

      {/* PULL TAB ON TOP */}
      <group position={[0, 1.88, 0.18]}>
        <mesh material={aluminumMaterial}>
          <boxGeometry args={[0.18, 0.02, 0.38]} />
        </mesh>
        <mesh position={[0, 0.015, -0.06]} material={darkAluminumMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
        </mesh>
      </group>

      {/* BOTTOM SHOULDER / TAPER */}
      <mesh
        material={aluminumMaterial}
        position={[0, -1.7, 0]}
        castShadow
      >
        <cylinderGeometry args={[1.0, 0.82, 0.3, 64]} />
      </mesh>

      {/* BOTTOM BASE RIM */}
      <mesh
        material={aluminumMaterial}
        position={[0, -1.88, 0]}
      >
        <cylinderGeometry args={[0.82, 0.82, 0.06, 64]} />
      </mesh>

      {/* BOTTOM SUNKEN DOME */}
      <mesh
        material={darkAluminumMaterial}
        position={[0, -1.86, 0]}
      >
        <cylinderGeometry args={[0.78, 0.78, 0.02, 64]} />
      </mesh>
    </group>
  );
}
