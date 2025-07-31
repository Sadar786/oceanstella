// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiSun,
  FiMoon,
  FiChevronDown,
} from "react-icons/fi";
import {
  RiWhatsappFill,
  RiFacebookFill,
  RiInstagramFill,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";

import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import PrimaryButton from "./PrimaryButton";

const navLinks = [
  { name: "Home", href: "/" },
  // we’ll handle “Services” manually below
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Boat Making", slug: "boat-making" },
  { name: "Boat Painting", slug: "boat-painting" },
  { name: "Customization", slug: "customization" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { hash } = useLocation();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md shadow-md transition-all duration-300">
      {/* Top info bar */}
      <div className="bg-dark text-light text-xs py-1 px-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <a href="tel:+923322649000" className="hover:text-accent transition">
            +92 33 226 49000
          </a>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-accent transition">
              <RiFacebookFill />
            </a>
            <a href="#" className="hover:text-accent transition">
              <RiInstagramFill />
            </a>
            <a
              href="https://wa.me/+923322649000"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition"
            >
              <RiWhatsappFill />
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="mx-auto max-w-7xl px-4 py-3 backdrop-blur-sm bg-white/40 dark:bg-dark flex items-center justify-between md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center dark:text-light gap-2">
          <img
            src={logo2}
            alt="Ocean Stella"
            className="block dark:hidden h-10 w-auto"
          />
          <img
            src={logo3}
            alt="Ocean Stella"
            className="hidden dark:block h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-medium transition-colors ${
                hash === `#${link.href}`
                  ? "text-primary"
                  : "text-dark dark:text-light hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Services dropdown */}
          <div className="relative group">
            <button className="flex items-center text-sm font-medium text-dark dark:text-light hover:text-primary transition-colors">
              Services <FiChevronDown className="ml-1" />
            </button>
            <div className="absolute left-0 top-full mt-2 hidden w-48 rounded bg-white dark:bg-dark shadow-lg group-hover:block">
              {services.map((svc) => (
                <Link
                  key={svc.slug}
                  to={`/service/${svc.slug}`}
                  className="block px-4 py-2 text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors"
                >
                  {svc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-32 rounded-full border border-slate-300 bg-light dark:bg-slate-800 dark:border-slate-600 pl-9 pr-3 text-sm text-dark dark:text-light transition-all focus:w-48 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full transition hover:text-primary"
            title="Toggle theme"
          >
            {isDark ? (
              <FiSun className="text-xl text-yellow-300" />
            ) : (
              <FiMoon className="text-xl text-slate-700" />
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

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-primary md:hidden"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`transition-max-height overflow-hidden duration-300 md:hidden ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <nav className="space-y-3 px-4 pt-3 pb-6 bg-white dark:bg-[#0f172a] shadow-inner rounded-b-2xl">
          <Link
            to="/"
            className="block rounded-lg px-3 py-2 text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          {/* Mobile Services submenu */}
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 hover:text-primary transition"
            >
              <span>Services</span>
              <FiChevronDown
                className={`transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {servicesOpen && (
              <div className="mt-1 space-y-1 pl-4">
                {services.map((svc) => (
                  <Link
                    key={svc.slug}
                    to={`/service/${svc.slug}`}
                    className="block rounded-lg px-3 py-2 text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 hover:text-primary transition"
                    onClick={() => {
                      setOpen(false);
                      setServicesOpen(false);
                    }}
                  >
                    {svc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/products"
            className="block rounded-lg px-3 py-2 text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Products
          </Link>
          <Link
            to="/about"
            className="block rounded-lg px-3 py-2 text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 hover:text-primary"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block rounded-lg px-3 py-2 text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full rounded-full border bg-light dark:bg-dark text-dark dark:text-light pl-9 pr-3 text-sm focus:border-primary focus:outline-none"
            />
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="w-full flex items-center justify-center gap-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-dark dark:text-light hover:bg-primary hover:text-light transition"
          >
            {isDark ? <FiSun /> : <FiMoon />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>

          {/* CTA */}
          <PrimaryButton
            as="a"
            href="https://wa.me/+923322649000"
            className="w-full mt-2 bg-accent text-dark hover:bg-primary hover:text-light"
          >
            WhatsApp
          </PrimaryButton>
        </nav>
      </div>
    </header>
  );
}
