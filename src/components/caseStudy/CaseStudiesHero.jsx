// src/components/casecomponents/CaseStudiesHero.jsx
import FadeInOnScroll from "../FadeInOnScroll";
import defaultVideo from "../../assets/boat.mp4";
import defaultImg from "../../assets/newBoat3.jpg";

export default function CaseStudiesHero({
  title = "Case Studies",
  subtitle,
  bgImg: propBgImg,
  bgVideo: propBgVideo
}) {
  // If props are not provided, fall back to default imports
  const mediaVideo = propBgVideo || defaultVideo;
  const mediaImg = propBgImg || defaultImg;

  return (
    <FadeInOnScroll>
      <section className="relative h-[44vh] sm:h-[56vh] md:h-[62vh] overflow-hidden">
        {/* Background media */}
        {mediaVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={mediaVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <div
            className={`absolute inset-0 ${
              mediaImg
                ? "bg-cover bg-center"
                : "bg-gradient-to-br from-dark via-[#0F1B2A] to-[#182638]"
            }`}
            style={mediaImg ? { backgroundImage: `url(${mediaImg})` } : undefined}
          />
        )}

        {/* Soft overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/20 to-dark/10" />
        <div className="absolute inset-0 [background:radial-gradient(60%_60%_at_50%_40%,rgba(255,255,255,0.10),transparent_60%)]" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <div className="mx-auto max-w-3xl">
            <span className="inline-block rounded-full bg-white/15 text-light ring-1 ring-white/25 px-3 py-1 text-[11px] font-semibold tracking-wide">
              Ocean Stella • Real Client Projects
            </span>

            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-light">
              <span className="bg-gradient-to-r from-accent via-light to-accent bg-clip-text text-transparent drop-shadow">
                {title}
              </span>
            </h1>

            {subtitle && (
              <p className="mx-auto mt-3 max-w-2xl text-light/95">{subtitle}</p>
            )}

            {/* Quick filter chips */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {["Boat Making", "Boat Painting", "Maintenance"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-light/10 text-light ring-1 ring-white/20 px-3 py-1 text-xs sm:text-[13px] font-medium backdrop-blur-sm"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <svg
          viewBox="0 0 1440 120"
          className="absolute -bottom-px left-0 right-0 w-full h-[60px] fill-light dark:fill-[#0F1B2A]"
          aria-hidden="true"
        >
          <path d="M0,64L48,58.7C96,53,192,43,288,53.3C384,64,480,96,576,112C672,128,768,128,864,112C960,96,1056,64,1152,53.3C1248,43,1344,53,1392,58.7L1440,64V120H0Z" />
        </svg>
      </section>
    </FadeInOnScroll>
  );
}
