import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { RiWhatsappFill, RiFacebookFill, RiInstagramFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

import logo from "../assets/logo.svg";
import PrimaryButton from "./PrimaryButton";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { hash } = useLocation();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  const isDark = mode === "dark";

  const linkTo = (path) => `#${path}`;

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#101827] shadow-sm ring-[1px] ring-slate-900/5">
      {/* Top info bar */}
      <div className="bg-dark text-light">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 text-xs">
          <a href="tel:+923322649000" className="hover:text-accent">
            +92&nbsp;33&nbsp;226&nbsp;49000
          </a>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-accent">
              <RiFacebookFill />
            </a>
            <a href="#" className="hover:text-accent">
              <RiInstagramFill />
            </a>
            <a
              href="https://wa.me/+923322649000"
              className="hover:text-accent"
              target="_blank"
              rel="noreferrer"
            >
              <RiWhatsappFill />
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Ocean Stella" className="h-9 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition ${
                hash === `#${link.href}`
                  ? "text-primary"
                  : "text-dark dark:text-light hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-32 rounded-full border bg-light dark:bg-dark pl-9 pr-3 text-sm text-dark dark:text-light
                         transition-all focus:w-52 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="rounded-full p-2 transition hover:text-primary"
            title="Toggle theme"
          >
            {isDark ? (
              <FiSun className="text-xl text-light" />
            ) : (
              <FiMoon className="text-xl text-dark" />
            )}
          </button>

          {/* CTA */}
          <PrimaryButton
            as="a"
            href="https://wa.me/+923322649000"
            className="bg-accent text-dark hover:bg-primary hover:text-light"
          >
            WhatsApp
          </PrimaryButton>
        </nav>

        {/* Mobile menu button */}
        <button
          className="text-2xl text-primary md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="space-y-2 bg-white dark:bg-[#101827] px-4 pb-4 pt-2 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block rounded-lg px-3 py-2 text-dark dark:text-light hover:bg-light dark:hover:bg-[#1a2533] hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {/* Search on mobile */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full rounded-full border bg-light dark:bg-dark text-dark dark:text-light pl-9 pr-3 text-sm
                         focus:border-primary focus:outline-none"
            />
          </div>

          {/* Theme toggle (mobile) */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="mt-2 flex w-full items-center mb-4 justify-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-dark dark:text-light hover:bg-primary hover:text-light"
          >
            {isDark ? <FiSun /> : <FiMoon />} 
          </button>

          <PrimaryButton
            as="a"
            href="https://wa.me/+923322649000"
            className="mt-2 w-full bg-accent text-dark hover:bg-primary hover:text-light"
          >
            WhatsApp
          </PrimaryButton>
        </nav>
      </div>
    </header>
  );
}
