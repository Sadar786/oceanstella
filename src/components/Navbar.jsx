import { useState } from "react";
import { FiMenu, FiX, FiSearch } from "react-icons/fi";
import { RiWhatsappFill, RiFacebookFill, RiInstagramFill } from "react-icons/ri";
import logo from "../assets/logo.svg";
import PrimaryButton from "./PrimaryButton";

const navLinks = [
  { name: "Home",      href: "/" },
  { name: "Services",  href: "/services" },
  { name: "Products",  href: "/products" },
  { name: "About",     href: "/about" },
  { name: "Contact",   href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const pathname = typeof window !== "undefined" ? window.location.pathname : "/";

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm ring-[1px] ring-slate-900/5">
      {/* Small top bar */}
      <div className=" bg-dark text-light">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 text-xs">
          <span>+971 55 123 4567</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-accent"><RiFacebookFill /></a>
            <a href="#" className="hover:text-accent"><RiInstagramFill /></a>
            <a href="https://wa.me/+92332249000" className="hover:text-accent"><RiWhatsappFill /></a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Ocean Stella" className="h-9 w-auto" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition 
                          ${pathname === link.href ? "text-primary" : "text-dark hover:text-primary"}`}
            >
              {link.name}
            </a>
          ))}

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-9 w-32 rounded-full border bg-light pl-9 pr-3 text-sm
                         transition-all focus:w-52 focus:border-primary focus:outline-none"
            />
          </div>

          {/* CTA */}
          <PrimaryButton
            as="a"
            href="https://wa.me/971XXXXXXXXX"
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

      {/* Mobile slide‑down */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300
                    ${open ? "max-h-96" : "max-h-0"}`}
      >
        <nav className="space-y-2 bg-white px-4 pb-4 pt-2 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-dark hover:bg-light hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </a>
          ))}

          {/* Search on mobile */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 w-full rounded-full border bg-light pl-9 pr-3 text-sm
                         focus:border-primary focus:outline-none"
            />
          </div>

          <PrimaryButton
            as="a"
            href="https://wa.me/971XXXXXXXXX"
            className="mt-2 w-full bg-accent text-dark hover:bg-primary hover:text-light"
          >
            WhatsApp
          </PrimaryButton>
        </nav>
      </div>
    </header>
  );
}
