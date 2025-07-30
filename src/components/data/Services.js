/*  src/data/services.js
    ——  demo content for ServicePage —— */

import boatMakingHero      from "../../assets/boatMaking.webp";
import boatMaking2         from "../../assets/boatMaking2.jpg";
import boatMaking3         from "../../assets/boatMaking3.jpg";
import boatMaking4         from "../../assets/boatMaking4.jpg";

 import boatPaintingHero    from "../../assets/boatPainting.webp";
 import boatPainting3       from "../../assets/boatPainting1.jpg";
 import boatPainting2       from "../../assets/boatPainting2.jpg";
 import boatPainting4       from "../../assets/boatPainting3.jpg";

import customHero          from "../../assets/boatCus.webp";
import custom2             from "../../assets/boatCus1.jpg";
import custom3             from "../../assets/boatCus2.jpg";
import custom4             from "../../assets/boatCus3.jpg";

export const services = {
  /* ───────── BOAT MAKING ───────── */
  "boat-making": {
    title: "Boat Making",
    heroImg: boatMakingHero,
    tagline: "Hand‑built hulls — engineered for adventure",
    intro:
      "Our build team merges traditional craftsmanship with advanced composites to create vessels that slice through waves and stand the test of time.",
    bullets: [
      "Full in‑house naval architecture",
      "ISO‑certified fiberglass & carbon layups",
      "5‑year structural warranty",
    ],
    gallery: [boatMaking2, boatMaking3, boatMaking4],
    process: [
      ["📝", "Design",  "3‑D modelling & CFD analysis"],
      ["🛠️", "Lay‑up", "Vacuum‑infusion hull construction"],
      ["🔍", "QC",      "Ultrasonic thickness testing"],
      ["🚢", "Launch",  "Sea‑trial & customer hand‑over"],
    ],
  },

  /* ───────── BOAT PAINTING ───────── */
  "boat-painting": {
    title: "Boat Painting",
    heroImg: boatPaintingHero,
    tagline: "Mirror‑finish coatings that protect & shine",
    intro:
      "Inside our climate‑controlled spray booth we apply multi‑layer marine systems that resist salt, UV and abrasion — keeping your investment looking new.",
    bullets: [
      "Awlgrip® & Alexseal® paint systems",
      "Computer‑matched colour library",
      "Optional ceramic clear‑coat upgrade",
    ],
    gallery: [boatPainting2, boatPainting3, boatPainting4],
    process: [
      ["🎨", "Prep",    "Media‑blast & fairing to yacht‑grade finish"],
      ["🌡️", "Spray",   "Temperature‑controlled application"],
      ["⏳", "Cure",    "Infra‑red accelerated drying"],
      ["✨", "Polish",  "Mirror‑gloss buff & final QA"],
    ],
  },

  // /* ───────── CUSTOMIZATION / REFIT ───────── */
  customization: {
    title: "Customization",
    heroImg: customHero,
    tagline: "Tailor every detail to your lifestyle",
    intro:
      "From smart dashboards to luxury interiors, our specialists integrate cutting‑edge tech and bespoke craftsmanship to make each vessel uniquely yours.",
    bullets: [
      "Garmin & Raymarine electronics suites",
      "Teak decking • premium upholstery",
      "Hybrid & electric propulsion retrofits",
    ],
    gallery: [custom2, custom3, custom4],
    process: [
      ["🤝", "Consult", "Define style, layout & tech wishlist"],
      ["🧑‍🎨", "Design", "3‑D renders & material swatches"],
      ["🔧", "Install", "Certified technicians & carpenters"],
      ["✅", "Handover", "System training & warranty pack"],
    ],
  },
};
