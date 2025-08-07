// src/data/models.js

import sport2   from "../../assets/boat3.jpg";
import sport1   from "../../assets/boat4.jpg";
import cruise1  from "../../assets/boat2.jpg";
import cruise2  from "../../assets/boat1.jpg";
import fishing1 from "../../assets/boat5.jpg";
import fishing2 from "../../assets/boat6.jpg";

export const models = [
  {
    slug: "stella-32-sport",
    name: "Stella 32 Sport",
    cat: "Sport",
    length: "32 ft",
    beam: "9.8 ft",
    price: "$120,000",
    images: [sport1, sport2],
    brochure: "/brochures/stella-32-sport.pdf",
    specs: {
      "Max Speed": "40 knots",
      "Seating Capacity": "8",
      "Engine": "Twin 250 HP Mercury",
      "Fuel Capacity": "300 gal",
      "Draft": "2.5 ft",
      "Displacement": "8,500 lbs",
    },
  },
  {
    slug: "stella-38-sport",
    name: "Stella 38 Sport",
    cat: "Sport",
    length: "38 ft",
    beam: "11.1 ft",
    price: "$135,000",
    images: [sport2, sport1],
    brochure: "/brochures/stella-38-sport.pdf",
    specs: {
      "Max Speed": "42 knots",
      "Seating Capacity": "10",
      "Engine": "Twin 300 HP Yamaha",
      "Fuel Capacity": "350 gal",
      "Draft": "2.8 ft",
      "Displacement": "9,200 lbs",
    },
  },
  {
    slug: "mariner-45-cruise",
    name: "Mariner 45 Cruise",
    cat: "Cruise",
    length: "45 ft",
    beam: "13.5 ft",
    price: "$210,000",
    images: [cruise1, cruise2],
    brochure: "/brochures/mariner-45-cruise.pdf",
    specs: {
      "Top Speed": "30 knots",
      "Staterooms": "2",
      "Engine": "Twin 400 HP Volvo Penta",
      "Fuel Capacity": "500 gal",
      "Draft": "3.2 ft",
      "Displacement": "15,000 lbs",
    },
  },
  {
    slug: "mariner-52-cruise",
    name: "Mariner 52 Cruise",
    cat: "Cruise",
    length: "52 ft",
    beam: "15.8 ft",
    price: "$285,000",
    images: [cruise2, cruise1],
    brochure: "/brochures/mariner-52-cruise.pdf",
    specs: {
      "Top Speed": "32 knots",
      "Staterooms": "3",
      "Engine": "Twin 500 HP Yanmar",
      "Fuel Capacity": "650 gal",
      "Draft": "3.5 ft",
      "Displacement": "18,500 lbs",
    },
  },
  {
    slug: "explorer-40-fish",
    name: "Explorer 40 Fish",
    cat: "Fishing",
    length: "40 ft",
    beam: "12.2 ft",
    price: "$160,000",
    images: [fishing1, fishing2],
    brochure: "/brochures/explorer-40-fish.pdf",
    specs: {
      "Cruise Speed": "28 knots",
      "Cockpit Area": "150 sq ft",
      "Engine": "Twin 350 HP Suzuki",
      "Fuel Capacity": "400 gal",
      "Draft": "2.9 ft",
      "Displacement": "12,000 lbs",
    },
  },
  {
    slug: "explorer-48-fish",
    name: "Explorer 48 Fish",
    cat: "Fishing",
    length: "48 ft",
    beam: "14.0 ft",
    price: "$190,000",
    images: [fishing2, fishing1],
    brochure: "/brochures/explorer-48-fish.pdf",
    specs: {
      "Cruise Speed": "30 knots",
      "Cockpit Area": "200 sq ft",
      "Engine": "Twin 400 HP Mercury",
      "Fuel Capacity": "500 gal",
      "Draft": "3.1 ft",
      "Displacement": "14,000 lbs",
    },
  },
];
