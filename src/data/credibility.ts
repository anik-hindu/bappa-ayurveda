import amazonLogo from "@/assets/icons/amazon-logo.png";
import ayushLogo from "@/assets/icons/ayush-logo.png";
import dpiitLogo from "@/assets/icons/dpiit-logo.png";
import flipkartLogo from "@/assets/icons/flipkart-logo.png";
import gmpLogo from "@/assets/icons/gmp-logo.png";

import { CredibilityItem, TrustItem } from "@/types/index";

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

export const trustItems: TrustItem[] = [
  { label: "DPIIT Recognized", img: dpiitLogo },
  { label: "AYUSH Licensed", img: ayushLogo },
  { label: "GMP Certified", img: gmpLogo },
  { label: "Available on Amazon", img: amazonLogo },
  { label: "Available on Flipkart", img: flipkartLogo },
];
