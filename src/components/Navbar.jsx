// src/components/Navbar.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiUser,
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
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Boat Making", slug: "boat-making" },
  { name: "Boat Painting", slug: "boat-painting" },
  { name: "Maintenance", slug: "maintenance" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { hash } = useLocation();
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md shadow-md transition-all">
      {/* Top info bar omitted for brevity */}

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
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between md:px-8 bg-white/40 dark:bg-dark backdrop-blur-sm">
        {/* Logo */}
        <Link to="/" className="flex block dark:hidden items-center gap-2">
          <img src={logo2} alt="Ocean Stella" className="h-10 w-auto" />
        </Link>
        <Link to="/" className="flex hidden dark:block items-center gap-2">
          <img src={logo3} alt="Ocean Stella" className="h-10 w-auto" />
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
                  className="block px-4 py-2 text-sm text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                >
                  {svc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Case Studies & Blog */}
          <Link
            to="/case-studies"
            className="text-sm font-medium text-dark dark:text-light hover:text-primary"
          >
            Case Studies
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium text-dark dark:text-light hover:text-primary"
          >
            Blogs
          </Link>

          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:text-primary transition"
            title="Toggle theme"
          >
            {isDark ? (
              <FiSun className="text-xl text-yellow-300" />
            ) : (
              <FiMoon className="text-xl text-slate-700" />
            )}
          </button>

          {/* Auth dropdown */}
          <div className="relative">
            <button
              onClick={() => setAuthOpen(!authOpen)}
              className="p-2 rounded-full hover:text-primary transition text-dark dark:text-light"
            >
              <FiUser className="text-xl" />
            </button>
            {authOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-dark rounded shadow-lg">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                  onClick={() => setAuthOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                  onClick={() => setAuthOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* WhatsApp CTA */}
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

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden transition-max-height duration-300 md:hidden ${
          open ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <nav className="space-y-0 px-4 pt-3 pb-6 bg-white dark:bg-dark shadow-inner rounded-b-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 hover:text-primary rounded-lg transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Services submenu */}
          <div>
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="w-full flex justify-between items-center px-3 py-2 text-sm text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 rounded-lg transition"
            >
              Services{" "}
              <FiChevronDown className={servicesOpen ? "rotate-180" : ""} />
            </button>
            {servicesOpen && (
              <div className="mt-1 space-y-1 pl-4">
                {services.map((svc) => (
                  <Link
                    key={svc.slug}
                    to={`/service/${svc.slug}`}
                    onClick={() => {
                      setOpen(false);
                      setServicesOpen(false);
                    }}
                    className="block px-3 py-2 text-sm text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 rounded-lg transition"
                  >
                    {svc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Case Studies & Blogs */}
          <Link
            to="/case-studies"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 rounded-lg transition"
          >
            Case Studies
          </Link>
          <Link
            to="/blog"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 rounded-lg transition"
          >
            Blogs
          </Link>

         

          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-lg border border-primary text-dark dark:text-light hover:bg-primary hover:text-light transition"
          >
            {isDark ? <FiSun /> : <FiMoon />}{" "}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Auth dropdown */}
          <div className="relative ">
            <button
              onClick={() => setAuthOpen(!authOpen)}
              className="p-2 mb-4 rounded-full hover:text-primary transition text-dark dark:text-light"
            >
              <div className="flex items-center gap-2">

              <FiUser className="text-xl" />
              <p>User</p>
              </div>
            </button>
            {authOpen && (
              <div className="absolute bottom-12 left-4 mt-2 w-40 bg-white dark:bg-dark rounded shadow-lg">
                <Link
                  to="/login"
                  className="block px-4 py-2 mb-4 text-sm text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                  onClick={() => setAuthOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-2 text-sm text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                  onClick={() => setAuthOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          {/* WhatsApp CTA */}
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
