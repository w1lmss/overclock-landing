import { ImageResponse } from "next/og";

export const alt = "OVERCLOCK Energy Drink";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0F",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient neon radial glow */}
        <div
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(163,255,18,0.25) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "8px 24px",
            borderRadius: 9999,
            border: "1px solid rgba(255,255,255,0.15)",
            backgroundColor: "rgba(255,255,255,0.05)",
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#A3FF12",
            }}
          />
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 3,
              color: "#E2E8F0",
              textTransform: "uppercase",
            }}
          >
            Energy Formula
          </span>
        </div>

        <h1
          style={{
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: 6,
            color: "#FFFFFF",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          OVERCLOCK
        </h1>

        <p
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: "#A0A5B5",
            marginTop: 20,
            marginBottom: 36,
          }}
        >
          Push past your limits.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 2,
            color: "#A3FF12",
            textTransform: "uppercase",
          }}
        >
          <span>Zero Sugar</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
          <span>160mg Caffeine</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
          <span>B-Vitamins</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

