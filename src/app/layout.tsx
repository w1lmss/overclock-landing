import type { Metadata, Viewport } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OVERCLOCK — Push past your limits",
  description:
    "Next-generation energy drink with zero sugar, natural caffeine, and B-vitamins. Fuel for focus and high performance.",
  keywords: ["energy drink", "overclock", "zero sugar", "natural caffeine", "gaming", "performance"],
  authors: [{ name: "OVERCLOCK Energy" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${inter.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#0A0A0F] text-white font-sans antialiased selection:bg-[var(--accent)] selection:text-black">
        {children}
      </body>
    </html>
  );
}
