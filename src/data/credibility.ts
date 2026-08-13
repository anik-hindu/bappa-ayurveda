import amazonLogo from "@/assets/icons/amazon-logo.png";
import ayushLogo from "@/assets/icons/ayush-logo.png";
import dpiitLogo from "@/assets/icons/dpiit-logo.png";
import flipkartLogo from "@/assets/icons/flipkart-logo.png";
import gmpLogo from "@/assets/icons/gmp-logo.png";

import { CredibilityItem } from "@/types/index";

export const credibilityItems: CredibilityItem[] = [
  {
    label: "DPIIT",
    description: "Recognized Startup",
    img: dpiitLogo,
  },
  {
    label: "AYUSH",
    description: "Licensed",
    img: ayushLogo,
  },
  {
    label: "GMP",
    description: "Certified Manufacturing",
    img: gmpLogo,
  },
  {
    label: "Amazon",
    description: "Available",
    img: amazonLogo,
  },
  {
    label: "Flipkart",
    description: "Available",
    img: flipkartLogo,
  },
];
