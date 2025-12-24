// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiFacebookFill,
  RiInstagramFill,
  RiWhatsappFill,
  RiYoutubeFill,
  RiArrowRightUpLine,
} from "react-icons/ri";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import logo from "../assets/logo.svg";

const year = new Date().getFullYear();

const links = {
  quick: [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/case-studies", label: "Case Studies" },
    { to: "/blog", label: "Blog" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ],
  services: [
    { to: "/products?type=build", label: "Boat Building" },
    { to: "/products?type=paint", label: "Boat Painting" },
    { to: "/products?type=maintenance", label: "Maintenance" },
    { to: "/products?type=custom", label: "Custom Builds" },
  ],
  legal: [
    { to: "/privacy", label: "Privacy" },
    { to: "/terms", label: "Terms" },
    { to: "/cookies", label: "Cookies" },
  ],
};

const socials = [
  { href: "https://facebook.com/", label: "Facebook", Icon: RiFacebookFill },
  { href: "https://instagram.com/", label: "Instagram", Icon: RiInstagramFill },
  { href: "https://www.youtube.com/", label: "YouTube", Icon: RiYoutubeFill },
  {
    href: "https://wa.me/+971551234567",
    label: "WhatsApp",
    Icon: RiWhatsappFill,
  },
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

export default function Footer() {
  return (
    <footer className="relative  bg-dark text-light">
      {/* ocean gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/15 via-secondary/10 to-transparent" />
      {/* subtle spotlight texture */}
      <div className="absolute inset-0 [background:radial-gradient(80%_70%_at_50%_0%,rgba(255,255,255,.06),transparent_60%)]" />

      <div className="relative section-wrapper">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-10 lg:grid-cols-4"
        >
          {/* Brand / pitch */}
          <motion.div variants={fade}>
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt="Ocean Stella"
                className="h-9 w-auto rounded-md ring-1 ring-white/10"
              />
              <span className="font-semibold tracking-wide text-accent">
                Ocean Stella
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-300/90 max-w-xs">
              Hand‑built vessels, mirror‑finish coatings, and dependable
              maintenance — engineered for adventure and built to last in the
              UAE.
            </p>

            {/* contact mini */}
            <ul className="mt-5 space-y-2 text-sm text-slate-200/90">
              <li className="flex items-center gap-2">
                <FiPhone className="opacity-70" />{" "}
                <a href="tel:+971551234567" className="hover:underline">
                  +971 55 123 4567
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="opacity-70" />{" "}
                <a
                  href="mailto:info@oceanstella.ae"
                  className="hover:underline"
                >
                  info@oceanstella.ae
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="opacity-70" /> Dock A‑12, Marina Industrial
                Zone, Dubai
              </li>
              <li className="flex items-center gap-2">
                <FiClock className="opacity-70" /> Sun–Thu · 09:00–18:00
              </li>
            </ul>

            {/* socials */}
            <div className="mt-5 flex gap-3 text-xl text-light/90">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={fade}>
            <h4 className="mb-3 font-semibold text-slate-100">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-300/90">
              {links.quick.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-2 hover:text-accent"
                  >
                    <span className="h-px w-4 bg-white/20 group-hover:bg-accent/60" />{" "}
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={fade}>
            <h4 className="mb-3 font-semibold text-slate-100">Services</h4>
            <ul className="space-y-2 text-sm text-slate-300/90">
              {links.services.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center justify-between gap-2 hover:text-accent"
                  >
                    <span>{l.label}</span>
                    <RiArrowRightUpLine className="opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter / CTA */}
          <motion.div variants={fade}>
            <h4 className="mb-3 font-semibold text-slate-100">
              Get Yard Updates
            </h4>
            <p className="text-sm text-slate-300/90">
              Paint reveals, sea trials, maintenance tips — monthly, no spam.
            </p>
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed! (Wire to your backend later)");
              }}
            >
              <input
                type="email"
                required
                placeholder="you@domain.com"
                className="flex-1 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm text-light placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
              <button className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-dark hover:bg-white">
                Subscribe
              </button>
            </form>

            <div className="mt-4 grid grid-cols-3 gap-3 text-[10px] text-slate-300/70">
              <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-center">
                ISO 12215
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-center">
                5‑yr Warranty
              </div>
              <div className="rounded-lg border border-white/10 bg-white/5 px-2 py-2 text-center">
                Dubai‑Built
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* bottom bar */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-300/80">
            © {year} Ocean Stella. All rights reserved.
          </p>
         <p className="text-xs text-slate-300/70 flex items-center gap-1">
  Crafted with{" "}
  <span className="text-red-400 animate-pulse">❤</span>
  by{" "}
  <a
    href="https://wa.me/923322649000?text=Hi%20Sadar,%20I%20found%20your%20work%20through%20your%20website."
    target="_blank"
    rel="noopener noreferrer"
    className="relative group font-semibold bg-gradient-to-r from-accent to-sky-400 bg-clip-text text-transparent hover:underline hover:underline-offset-4 transition"
  >
    Sadar

    {/* Tooltip */}
    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] text-slate-200 opacity-0 shadow-lg transition group-hover:opacity-100">
     Click to Chat on WhatsApp
    </span>
  </a>
</p>

          <ul className="flex flex-wrap items-center gap-4 text-xs text-slate-300/80">
            {links.legal.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
