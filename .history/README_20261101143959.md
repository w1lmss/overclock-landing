# OVERCLOCK — Next-Gen Energy Drink Landing Page

Concept landing page for **OVERCLOCK**, a high-performance energy drink line featuring three signature flavors, dark cyberpunk aesthetics, interactive 3D can visualization, and smooth scroll animations.

---

## ⚡ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography:** Unbounded (headings/logo) & Inter (body) via `next/font/google`
- **3D & Canvas:** Three.js, React Three Fiber, Drei *(Stage 2)*
- **Motion & Scroll:** GSAP, ScrollTrigger, Lenis *(Stage 3)*

---

## 🥤 Flavors Lineup

| Flavor | Accent Color | Mood | Formula Specs |
| --- | --- | --- | --- |
| **Lime Rush** | `#A3FF12` (Neon Green) | Fresh, sharp | 160 mg caffeine · 0 g sugar · B-vitamins |
| **Mango Blaze** | `#FF8A00` (Electric Orange) | Warm, explosive | 160 mg caffeine · 0 g sugar · B-vitamins |
| **Berry Storm** | `#B026FF` (Vivid Purple) | Night, mysterious | 160 mg caffeine · 0 g sugar · B-vitamins |

---

## 🚀 Quick Start / Локальный запуск

### 1. Requirements
- Node.js 18+ (LTS recommended)
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── docs/                      # Technical specification (TZ)
├── public/                    # Static assets
├── src/
│   ├── app/
│   │   ├── globals.css        # Tailwind v4 theme, neon glow utilities
│   │   ├── layout.tsx         # Google Fonts (Unbounded, Inter) & metadata
│   │   └── page.tsx           # Main page orchestrating the 5 sections
│   ├── components/
│   │   ├── Navbar.tsx         # Sticky header with active flavor badge
│   │   ├── CanGraphic.tsx     # Stylized vector can presentation
│   │   ├── HeroSection.tsx    # Section 1: Hero with CTA
│   │   ├── FlavorsSection.tsx # Section 2: 3 flavors switcher & specs
│   │   ├── WhySection.tsx     # Section 3: 4 advantages grid
│   │   ├── WhereToBuySection.tsx # Section 4: Store links & email signup
│   │   └── Footer.tsx         # Section 5: Social links & disclaimer
│   └── types/
│       └── flavor.ts          # Flavor data types and definitions
└── README.md
```

---

## 📄 License & Disclaimer

Concept project. Not a real product. Made for portfolio showcase.
