import shukravitaImage from "@/assets/images/shukravita_product.png";

export const shukravita = {
  name: "SHUKRAVITA",
  eyebrow: "Ayurvedic Men's Vitality Support",
  description:
    "A 13-herb Ayurvedic formulation inspired by classical Vajikarana and Rasayana traditions, crafted to support daily energy, stamina, and vitality.",

  image: shukravitaImage,
  imageAlt: "SHUKRAVITA Ayurvedic men's vitality supplement by Bappa Ayurveda",

  highlights: [
    "13 classical Ayurvedic herbs",
    "AYUSH licensed",
    "GMP certified",
    "Vegetarian formulation",
  ],

  details: "60 tablets · 30-day supply",

  cta: {
    primary: "https://amzn.in/d/0irbMWo1",
    secondary: "https://dl.flipkart.com/s/SBDbjNuuuN",
  },
} as const;
