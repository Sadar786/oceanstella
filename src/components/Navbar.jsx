// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiUser,
  FiGrid,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
} from "react-icons/fi"; // Feather

import {
  RiWhatsappFill,
  RiFacebookFill,
  RiInstagramFill,
  RiPaintBrushFill,
  RiToolsFill,
  RiShip2Fill,
} from "react-icons/ri"; // Remix

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice.js";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import PrimaryButton from "./PrimaryButton";
import { useNavigate } from "react-router-dom";
import { doSignOut } from "../redux/user/userThunks";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Boat Building", slug: "boat-making" },
  { name: "Boat Painting", slug: "boat-painting" },
  { name: "Maintenance", slug: "maintenance" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // mobile submenu
  const [authOpen, setAuthOpen] = useState(false); // auth open or not 
  const [scrolled, setScrolled] = useState(false);  // scrolled or not 
  

  // with HashRouter, pathname is '/route' (the hash is handled internally)
  const { pathname } = useLocation();
  const isActive = (href) => pathname === href;

  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);
  const isDark = mode === "dark";

  const nav = useNavigate();
  const currentUser = useSelector((s) => s.user.currentUser);
  const [loggingOut, setLoggingOut] = useState(false);

  // shrink on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdowns when route changes
  useEffect(() => {
    setOpen(false);
    setAuthOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await dispatch(doSignOut());
      setAuthOpen(false);
      nav("/", { replace: true });
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top info bar */}
      <div className="bg-dark text-light text-xs py-1 px-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <a href="tel:+923322649000" className="hover:text-accent transition">
            +92 33 226 49000
          </a>
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hover:text-accent transition"
              aria-label="Facebook"
            >
              <RiFacebookFill />
            </a>
            <a
              href="#"
              className="hover:text-accent transition"
              aria-label="Instagram"
            >
              <RiInstagramFill />
            </a>
            <a
              href="https://wa.me/+923322649000"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition"
              aria-label="WhatsApp"
            >
              <RiWhatsappFill />
            </a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div
        className={[
          "mx-auto max-w-7xl px-4 md:px-8",
          "flex items-center justify-between",
          "backdrop-blur-xl transition-all",
          isDark ? "bg-[#0F1B2A]/70" : "bg-white/70",
          scrolled ? "py-2 shadow-lg" : "py-3 shadow-md",
          "border-b border-white/10 dark:border-white/5",
        ].join(" ")}
      >
        {/* Logo (auto light/dark) */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo2}
            alt="Ocean Stella"
            className="h-10 w-auto dark:hidden block"
          />
          <img
            src={logo3}
            alt="Ocean Stella"
            className="h-10 w-auto hidden dark:block"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={[
                "relative group px-1 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-primary"
                  : "text-dark dark:text-light hover:text-primary",
              ].join(" ")}
            >
              {link.name}
              {/* underline animation */}
              <span
                className={[
                  "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-primary",
                  "transition-all duration-300",
                  isActive(link.href) ? "w-full" : "group-hover:w-full",
                ].join(" ")}
              />
            </Link>
          ))}

          {/* Services mega-dropdown */}
          <div className="relative group/dropdown">
            <button
              className="flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium text-dark
               dark:text-light hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Services
              <FiChevronDown className="transition-transform group-hover/dropdown:rotate-180" />
            </button>

            {/* Panel */}
            <div
              className={[
                "absolute left-1/2 z-50 mt-3 hidden w-[28rem] -translate-x-1/2 rounded-2xl p-3 shadow-2xl ring-1",
                "backdrop-blur-xl",
                isDark
                  ? "bg-slate-900/90 ring-white/10"
                  : "bg-white/90 ring-black/5",
                "group-hover/dropdown:block group-focus-within/dropdown:block",
              ].join(" ")}
            >
              {/* pointer */}
              <div
                className={[
                  "absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 ring-1",
                  isDark
                    ? "bg-slate-900/90 ring-white/10"
                    : "bg-white/90 ring-black/5",
                ].join(" ")}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Link
                  to="/service/boat-making"
                  className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-primary/10 dark:hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent">
                    <RiShip2Fill />
                  </span>
                  <span>
                    <span className="block font-semibold leading-tight text-dark dark:text-light">
                      Boat Building
                    </span>
                    <span className="block text-xs text-slate-600 dark:text-slate-300">
                      Custom builds, hull design & sea trials
                    </span>
                  </span>
                </Link>

                <Link
                  to="/service/boat-painting"
                  className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-primary/10 dark:hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent">
                    <RiPaintBrushFill />
                  </span>
                  <span>
                    <span className="block font-semibold leading-tight text-dark dark:text-light">
                      Boat Painting
                    </span>
                    <span className="block text-xs text-slate-600 dark:text-slate-300">
                      Awlgrip finishes, graphics & UV protection
                    </span>
                  </span>
                </Link>

                <Link
                  to="/service/maintenance"
                  className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-primary/10 dark:hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-accent">
                    <RiToolsFill />
                  </span>
                  <span>
                    <span className="block font-semibold leading-tight text-dark dark:text-light">
                      Maintenance
                    </span>
                    <span className="block text-xs text-slate-600 dark:text-slate-300">
                      Engines, electrics, fiberglass & seasonal care
                    </span>
                  </span>
                </Link>
              </div>

              <div className="mt-2 border-t border-slate-200/60 dark:border-white/10 pt-2 text-right">
                <Link
                  to="/blog"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View Insights →
                </Link>
              </div>
            </div>
          </div>

          {/* Case Studies & Blog */}
          <Link
            to="/case-studies"
            className={[
              "relative group px-1 text-sm font-medium transition-colors",
              isActive("/case-studies")
                ? "text-primary"
                : "text-dark dark:text-light hover:text-primary",
            ].join(" ")}
          >
            Case Studies
            <span
              className={[
                "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300",
                isActive("/case-studies") ? "w-full" : "group-hover:w-full",
              ].join(" ")}
            />
          </Link>

          <Link
            to="/blog"
            className={[
              "relative group px-1 text-sm font-medium transition-colors",
              isActive("/blog")
                ? "text-primary"
                : "text-dark dark:text-light hover:text-primary",
            ].join(" ")}
          >
            Blogs
            <span
              className={[
                "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-0 bg-primary transition-all duration-300",
                isActive("/blog") ? "w-full" : "group-hover:w-full",
              ].join(" ")}
            />
          </Link>

          {/* Theme toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full hover:text-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            title="Toggle theme"
            aria-label="Toggle theme"
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
              onClick={() => setAuthOpen((v) => !v)}
              className="p-1.5 rounded-full hover:ring-2 hover:ring-primary/40 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              aria-haspopup="true"
              aria-expanded={authOpen}
              aria-label="User menu"
            >
              {currentUser ? (
                currentUser.avatar ? (
                  // Show avatar if available
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name || "User"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  // Otherwise fallback initials
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-semibold">
                    {currentUser.name
                      ? currentUser.name.charAt(0).toUpperCase()
                      : "U"}
                  </span>
                )
              ) : (
                // Default icon if no user
                <FiUser className="text-2xl text-dark dark:text-light" />
              )}
            </button>

            {authOpen && (
              <div className="absolute right-0 mt-3 w-52 rounded-2xl border border-gray-200/40 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg ring-1 ring-black/5 dark:ring-white/10 overflow-hidden animate-fadeIn">
                {currentUser ? (
                  <>
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                      <p className="text-sm font-medium text-dark dark:text-light">
                        {currentUser.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    <Link
                      to="/admin?tab=dashboard"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                      onClick={() => setAuthOpen(false)}
                    >
                      <FiGrid className="text-base" />
                      Dashboard

                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                    >
                      <FiUser className="text-base" />
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                      <FiLogOut className="text-base" />
                      {loggingOut ? "Logging out…" : "Logout"}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                      onClick={() => setAuthOpen(false)}
                    >
                      <FiLogIn className="text-base" />
                      Login
                    </Link>

                    <Link
                      to="/auth/signup"
                      className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 transition"
                      onClick={() => setAuthOpen(false)}
                    >
                      <FiUserPlus className="text-base" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

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
          onClick={() => setOpen((v) => !v)}
          className="text-2xl text-primary md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={[
          "md:hidden overflow-hidden transition-all duration-300",
          open ? "max-h-[650px] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="space-y-1 px-4 pt-3 pb-6 bg-white dark:bg-dark shadow-inner rounded-b-2xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setOpen(false)}
              className={[
                "block px-3 py-2 text-sm rounded-lg transition",
                "hover:bg-light dark:hover:bg-slate-800",
                isActive(link.href)
                  ? "text-primary"
                  : "text-dark dark:text-light",
              ].join(" ")}
            >
              {link.name}
            </Link>
          ))}

          {/* Mobile Services submenu */}
          <div>
            <button
              onClick={() => setServicesOpen((v) => !v)}
              className="w-full flex justify-between items-center px-3 py-2 text-sm text-dark dark:text-light hover:bg-light dark:hover:bg-slate-800 rounded-lg transition"
            >
              Services
              <FiChevronDown
                className={`transition-transform ${
                  servicesOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {servicesOpen && (
              <div className="mt-1 space-y-1 pl-3">
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
            {isDark ? <FiSun /> : <FiMoon />}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Auth quick links */}
          {/* Auth quick links (mobile) */}
          {/* Auth quick links (mobile) */}
          {currentUser ? (
            <div className="space-y-2">
              <Link
                to="/admin?tab=dashboard"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-3 py-2 text-sm rounded-lg border hover:bg-primary/10 dark:hover:bg-primary/20 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-3 py-2 text-sm rounded-lg border hover:bg-primary/10 dark:hover:bg-primary/20 transition"
              >
                Profile
              </Link>
              <button
                onClick={async () => {
                  await handleLogout();
                  setOpen(false);
                }}
                className="w-full text-center px-3 py-2 text-sm rounded-lg border border-red-300 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                {loggingOut ? "Logging out…" : "Logout"}
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                to="/auth/login"
                onClick={() => setOpen(false)}
                className="flex-1 text-center px-3 py-2 text-sm rounded-lg border hover:bg-primary/10 dark:hover:bg-primary/20 transition"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                onClick={() => setOpen(false)}
                className="flex-1 text-center px-3 py-2 text-sm rounded-lg bg-accent text-dark hover:bg-primary hover:text-light transition"
              >
                Sign Up
              </Link>
            </div>
          )}

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
