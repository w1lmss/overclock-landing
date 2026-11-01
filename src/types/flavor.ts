export type FlavorId = "lime" | "mango" | "berry";

export interface Flavor {
  id: FlavorId;
  name: string;
  tagline: string;
  specs: string;
  color: string;
  glowColor: string;
  mood: string;
}

export const FLAVORS: Flavor[] = [
  {
    id: "lime",
    name: "Lime Rush",
    tagline: "Sharp citrus kick. Zero sugar.",
    specs: "160 mg caffeine · 0 g sugar · B-vitamins",
    color: "#A3FF12",
    glowColor: "rgba(163, 255, 18, 0.45)",
    mood: "Fresh & Sharp",
  },
  {
    id: "mango",
    name: "Mango Blaze",
    tagline: "Tropical heat that hits fast.",
    specs: "160 mg caffeine · 0 g sugar · B-vitamins",
    color: "#FF8A00",
    glowColor: "rgba(255, 138, 0, 0.45)",
    mood: "Warm & Explosive",
  },
  {
    id: "berry",
    name: "Berry Storm",
    tagline: "Dark berries for late-night sessions.",
    specs: "160 mg caffeine · 0 g sugar · B-vitamins",
    color: "#B026FF",
    glowColor: "rgba(176, 38, 255, 0.45)",
    mood: "Night & Mysterious",
  },
];

