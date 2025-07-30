// src/components/DriftingBoatsBG.jsx
import { Fragment } from "react";

const BOAT_COUNT = 50;          // how many sprites
const SPRITES = [...Array(BOAT_COUNT).keys()];   // [0,1,2,…]

export default function DriftingBoatsBG() {
  return (
    <>
      {/* container is position‑relative parent (will be absolute filled) */}
      {SPRITES.map((i) => {
        // stagger animation: each boat starts a bit later & uses random speed
        const duration = 25 + (i % 6) * 5;   // 25s → 50s
        const delay    = -(i * 4);           // negative = already sailing
        const size     = 14 + (i % 4) * 4;   // 14‑26 px height
        const top      = `${(i / BOAT_COUNT) * 100}%`; // spread vertically

        return (
          <Fragment key={i}>
            <svg
              className="absolute left-full -translate-x-full text-cyan-300 opacity-70 drop-shadow-lg"
              style={{
                top,
                width: size,
                height: size,
                animation: `sail ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
              }}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* simple boat/triangle shape */}
              <path d="M4 15l8-6 8 6-3 5H7l-3-5z" />
            </svg>
          </Fragment>
        );
      })}

      {/* keyframes injected once */}
      <style>{`
        @keyframes sail {
          0%   { transform: translateX(0);   }
          100% { transform: translateX(-150vw); }
        }
      `}</style>
    </>
  );
}
