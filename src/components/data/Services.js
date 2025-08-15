// src/components/data/Services.js

import boatMakingHero      from "../../assets/boatMaking.webp";
import boatMaking2         from "../../assets/NewBoat1.jpg";
import boatMaking3         from "../../assets/boatMaking3.jpg";
import boatMaking4         from "../../assets/boatMaking4.jpg";

import boatPaintingHero    from "../../assets/boatPainting.webp";
import boatPainting2       from "../../assets/NewBoat5.jpg";
import boatPainting3       from "../../assets/boatPainting1.jpg";
import boatPainting4       from "../../assets/boatPainting3.jpg";

import maintenanceHero     from "../../assets/boatCus.webp";      // reuse demo asset
import maintenance2        from "../../assets/NewBoat7.jpg";
import maintenance3        from "../../assets/boatCus2.jpg";
import maintenance4        from "../../assets/boatCus3.jpg";

export const services = {
  /* ───────── BOAT MAKING ───────── */
  "boat-making": {
    title: "Boat Building",
    heroImg: boatMakingHero,
    tagline: "Hand-built hulls — engineered for adventure",
    intro:
      "Our build team merges traditional craftsmanship with advanced composites to create vessels that slice through waves and stand the test of time.",
    bullets: [
      "Full in-house naval architecture",
      "ISO-certified fiberglass & carbon layups",
      "5-year structural warranty",
    ],
    gallery: [boatMaking2, boatMaking3, boatMaking4],
    process: [
      ["📝", "Design",  "3-D modelling & CFD analysis"],
      ["🛠️", "Lay-up",  "Vacuum-infusion hull construction"],
      ["🔍", "QC",      "Ultrasonic thickness testing"],
      ["🚢", "Launch",  "Sea-trial & customer hand-over"],
    ],
    specs: [
      {
        title: "A. Hull & Structure",
        rows: [
          ["Material",      "Fiberglass, Aluminum, Carbon-fiber"],
          ["Length",        "20′ – 80′ (customizable)"],
          ["Beam",          "Per client requirements"],
          ["Draft",         "Shallow to deep-water configurations"],
          ["Load Capacity", "Up to 10,000 kg"],
        ],
      },
      {
        title: "B. Power & Propulsion",
        rows: [
          ["Outboard Engines", "Mercury, Yamaha, Suzuki (20–400 HP)"],
          ["Inboard Diesel",   "Volvo Penta, Yanmar (200–1,200 HP)"],
          ["Hybrid & Electric","Custom battery-powered or hybrid retrofits"],
        ],
      },
      {
        title: "C. Electronics Packages",
        cards: [
          { name: "Basic",   desc: "GPS + Depth Finder" },
          { name: "Premium", desc: "Chartplotter, Autopilot, Radar" },
          { name: "Luxury",  desc: "Integrated entertainment & networking suite" },
        ],
      },
    ],
    projects: [
      {
        img: boatMaking2,
        title: "Explorer X-200 Build",
        description:
          "30′ offshore fishing hull with reinforced keel and custom T-top.",
        date: "March 2025",
        serviceType: "Custom Manufacturing",
        cost: "$120,000",
      },
      {
        img: boatMaking3,
        title: "SunSeeker Day Cruiser",
        description:
          "45′ luxury cruiser outfitted with AC, galley and stabilized hull.",
        date: "January 2025",
        serviceType: "Custom Manufacturing",
        cost: "$250,000",
      },
      {
        img: boatMaking4,
        title: "Harbor Patrol Vessel",
        description:
          "20′ rapid-response boat with high-output diesel engine and radar-ready dash.",
        date: "December 2024",
        serviceType: "Custom Manufacturing",
        cost: "$95,000",
      },
    ],
  },

  /* ───────── BOAT PAINTING ───────── */
  "boat-painting": {
    title: "Boat Painting",
    heroImg: boatPaintingHero,
    tagline: "Mirror-finish coatings that protect & shine",
    intro:
      "Inside our climate-controlled spray booth we apply multi-layer marine systems that resist salt, UV and abrasion — keeping your investment looking new.",
    bullets: [
      "Awlgrip® & Alexseal® paint systems",
      "Computer-matched colour library",
      "Optional ceramic clear-coat upgrade",
    ],
    gallery: [boatPainting2, boatPainting3, boatPainting4],
    process: [
      ["🎨", "Prep",  "Media-blast & fairing to yacht-grade finish"],
      ["🌡️", "Spray", "Temperature-controlled application"],
      ["⏳", "Cure",  "Infra-red accelerated drying"],
      ["✨", "Polish","Mirror-gloss buff & final QA"],
    ],
    specs: [
      {
        title: "A. Paint Systems & Coatings",
        rows: [
          ["Awlgrip®",           "UV-resistant, high gloss, 8-year warranty"],
          ["Alexseal®",          "Thin-film, fast cure, abrasion resistant"],
          ["Ceramic Clear-Coat", "Scratch-resistant, hydrophobic finish"],
        ],
      },
      {
        title: "B. Colour & Finish Options",
        rows: [
          ["Custom Colours",    "Computer-matched library"],
          ["Finish Types",      "Metallic, Matte, Satin"],
          ["Specialty Effects", "Pearlescent, Candy coat"],
        ],
      },
      {
        title: "C. Process Parameters",
        rows: [
          ["Booth Temperature",   "15 – 25 °C"],
          ["Number of Coats",     "Primer → Base → Clear"],
          ["Dry & Cure Schedule", "24 h ambient, 4 h IR cure"],
        ],
      },
    ],
    projects: [
      {
        img: boatPainting2,
        title: "Sunburst Hull Refinish",
        description:
          "28′ yacht refinished with Awlgrip® and ceramic clear-coat.",
        date: "April 2025",
        serviceType: "Boat Painting",
        cost: "$18,000",
      },
      {
        img: boatPainting3,
        title: "Racing Hull Upgrade",
        description:
          "21′ speedboat given custom metallic candy coat and UV seal.",
        date: "February 2025",
        serviceType: "Boat Painting",
        cost: "$14,500",
      },
      {
        img: boatPainting4,
        title: "Classic Cruiser Restoration",
        description:
          "Vintage 34′ cruiser restored to original color scheme with modern clear-coat.",
        date: "November 2024",
        serviceType: "Boat Painting",
        cost: "$22,000",
      },
    ],
  },

  /* ───────── BOAT MAINTENANCE ───────── */
  maintenance: {
    title: "Boat Maintenance",
    heroImg: maintenanceHero,
    tagline: "Ensure peak performance and longevity",
    intro:
      "Our maintenance team provides comprehensive servicing including engine tune-ups, hull cleaning, and system diagnostics to keep your boat running smoothly year-round.",
    bullets: [
      "Engine inspections & tune-ups",
      "Hull cleaning & anti-fouling",
      "Electrical & navigational systems check",
    ],
    gallery: [maintenance2, maintenance3, maintenance4],
    process: [
      ["🔧", "Inspection",  "Complete mechanical & structural audit"],
      ["🧼", "Cleaning",    "Hull wash & anti-fouling application"],
      ["⚙️", "Servicing",   "Engine, drivetrain, and systems maintenance"],
      ["✅", "Testing",     "Sea-trial & operational verification"],
    ],
    specs: [
      {
        title: "A. Routine Maintenance",
        rows: [
          ["Frequency",      "Quarterly, Bi-annual, or Annual plans"],
          ["Hull Cleaning",  "Soft wash, pressure wash, anti-fouling"],
          ["Engine Service", "Oil change, filter replacement, diagnostics"],
        ],
      },
      {
        title: "B. Repair & Refurbishment",
        rows: [
          ["Fiberglass Repair",      "Gelcoat refinishing, crack repair"],
          ["Gelcoat & Paint Touch-Up","Spot treatment and full coats"],
          ["Wood & Deck Repair",     "Teak replanking, varnish"],
        ],
      },
      {
        title: "C. System Upgrades",
        rows: [
          ["Electrical Systems",  "Battery, wiring, lighting checks"],
          ["Navigation Upgrades","Chartplotter, GPS, radar calibration"],
          ["Safety Equipment",   "Life jackets, flares, bilge pumps"],
        ],
      },
    ],
    projects: [
      {
        img: maintenance2,
        title: "Endurance Engine Overhaul",
        description: "Complete engine teardown and rebuild with OEM parts.",
        date: "June 2025",
        serviceType: "Engine Service",
        cost: "$8,500",
      },
      {
        img: maintenance3,
        title: "Annual Hull Maintenance",
        description: "Full hull cleaning and anti-fouling application.",
        date: "May 2025",
        serviceType: "Hull Cleaning",
        cost: "$3,200",
      },
      {
        img: maintenance4,
        title: "Navigation System Calibration",
        description: "GPS and radar systems upgrade and calibration.",
        date: "April 2025",
        serviceType: "System Upgrade",
        cost: "$1,750",
      },
    ],
  },
};
