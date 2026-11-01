import * as THREE from "three";
import { Flavor } from "@/types/flavor";

/**
 * Procedurally generates a crisp 1024x512 texture for the aluminum can label.
 * This eliminates external image loading delays and ensures 100% offline reliability.
 */
export function createCanTexture(flavor: Flavor): THREE.CanvasTexture {
  if (typeof window === "undefined" || typeof document === "undefined") {
    // Return placeholder during server-side pre-rendering
    const emptyCanvas = { width: 1, height: 1 } as unknown as HTMLCanvasElement;
    return new THREE.CanvasTexture(emptyCanvas);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // 1. Dark Cyber/Carbon Base Background
  const bgGrad = ctx.createLinearGradient(0, 0, 1024, 0);
  bgGrad.addColorStop(0, "#08090D");
  bgGrad.addColorStop(0.2, "#12141C");
  bgGrad.addColorStop(0.5, "#0A0B10");
  bgGrad.addColorStop(0.8, "#141620");
  bgGrad.addColorStop(1, "#08090D");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Subtle horizontal brushed-metal micro-stripes
  ctx.fillStyle = "rgba(255, 255, 255, 0.025)";
  for (let y = 0; y < 512; y += 4) {
    ctx.fillRect(0, y, 1024, 1.5);
  }

  // 2. Bold Angular Dynamic Slashes in Flavor Color
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(180, 0);
  ctx.lineTo(460, 512);
  ctx.lineTo(360, 512);
  ctx.lineTo(80, 0);
  ctx.closePath();
  const slashGrad = ctx.createLinearGradient(80, 0, 460, 512);
  slashGrad.addColorStop(0, flavor.color);
  slashGrad.addColorStop(1, `${flavor.color}20`);
  ctx.fillStyle = slashGrad;
  ctx.fill();

  // Thin parallel accent laser line
  ctx.beginPath();
  ctx.moveTo(500, 0);
  ctx.lineTo(760, 512);
  ctx.lineTo(745, 512);
  ctx.lineTo(485, 0);
  ctx.closePath();
  ctx.fillStyle = flavor.color;
  ctx.fill();

  // Secondary geometric accents
  ctx.beginPath();
  ctx.moveTo(20, 120);
  ctx.lineTo(260, 120);
  ctx.lineTo(240, 130);
  ctx.lineTo(20, 130);
  ctx.closePath();
  ctx.fillStyle = flavor.color;
  ctx.fill();
  ctx.restore();

  // 3. Main Brand Typography "OVERCLOCK"
  ctx.save();
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "900 86px 'Unbounded', sans-serif, system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "6px";
  ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
  ctx.shadowBlur = 12;
  ctx.fillText("OVERCLOCK", 512, 230);
  ctx.restore();

  // 4. Flavor Badge
  ctx.save();
  const badgeWidth = 340;
  const badgeHeight = 46;
  const badgeX = 512 - badgeWidth / 2;
  const badgeY = 300;

  ctx.fillStyle = "#0A0B10";
  ctx.strokeStyle = flavor.color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 23);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = flavor.color;
  ctx.font = "800 24px 'Unbounded', sans-serif, system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "3px";
  ctx.fillText(flavor.name.toUpperCase(), 512, badgeY + badgeHeight / 2);
  ctx.restore();

  // 5. Specs & Highlights
  ctx.save();
  ctx.fillStyle = "#A0A5B5";
  ctx.font = "600 15px 'Inter', sans-serif, system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.letterSpacing = "2px";
  ctx.fillText("ZERO SUGAR  •  160MG CAFFEINE  •  B-VITAMINS", 512, 380);

  // Micro tech text / coordinates
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.font = "500 11px monospace";
  ctx.fillText("SYSTEM PERFORMANCE FUEL // LOT 2026.04 // 473 ML (16 FL OZ)", 512, 420);
  ctx.restore();

  // 6. Back of Can (Left and right seam regions)
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  for (let x = 60; x < 150; x += 5) {
    const barW = (x % 3 === 0) ? 3 : 1.5;
    ctx.fillRect(x, 260, barW, 60);
  }
  ctx.font = "500 9px monospace";
  ctx.fillText("0 84729 48102 7", 105, 335);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = 1;
  ctx.strokeRect(55, 120, 100, 120);
  ctx.font = "700 10px monospace";
  ctx.fillText("FACTS", 62, 134);
  ctx.font = "500 8px monospace";
  ctx.fillText("Cal: 0", 62, 150);
  ctx.fillText("Sugar: 0g", 62, 166);
  ctx.fillText("Caff: 160mg", 62, 182);
  ctx.fillText("B6/B12: 100%", 62, 198);
  ctx.restore();

  // Create Three.js Texture
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}
