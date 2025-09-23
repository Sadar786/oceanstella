// src/pages/Contact.jsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RiFacebookFill, RiInstagramFill, RiWhatsappFill } from "react-icons/ri";
import { FiPhone, FiMail, FiClock, FiMapPin } from "react-icons/fi";

const API_BASE = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") || "";
const INQUIRIES = `${API_BASE}/api/v1/inquiries`;

export default function Contact() {
  const [sp] = useSearchParams();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Boat Making", // UI only; will map to subject
    message: "",
    quantity: "",
    consent: false,
    productId: sp.get("productId") || "",
    subject: sp.get("subject") || "", // if someone links with ?subject=...
    // honeypot
    company: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!form.subject && form.service) {
      setForm((f) => ({ ...f, subject: f.service }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length >= 2 &&
      /.+@.+\..+/.test(form.email) &&
      form.message.trim().length >= 5 &&
      form.consent &&
      !submitting
    );
  }, [form, submitting]);

  async function onSubmit(e) {
    e.preventDefault();
    setOkMsg("");
    setErrMsg("");

    // block bots via honeypot
    if (form.company) {
      setErrMsg("Form failed validation. Please try again.");
      return;
    }

    if (!canSubmit) {
      setErrMsg("Please complete required fields correctly.");
      return;
    }

    const payload = {
      productId: form.productId || undefined,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: form.phone.trim(),
      subject: (form.subject || form.service || "").trim(),
      message: form.message.trim(),
      quantity: form.quantity === "" ? undefined : Number(form.quantity),
      source: "website",
    };

    try {
      setSubmitting(true);
      const r = await fetch(INQUIRIES, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j?.ok) throw new Error(j?.error || "Failed to send inquiry");

      setOkMsg("Thanks! Your message has been sent. We'll get back within 24 hours.");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "Boat Making",
        message: "",
        quantity: "",
        consent: false,
        productId: sp.get("productId") || "",
        subject: "",
        company: "",
      });
    } catch (e) {
      setErrMsg(e.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-light dark:bg-[#0F1B2A]">
      {/* HERO */}
      <section className="relative overflow-hidden mb-28">
        {/* ocean gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary via-secondary to-primary opacity-90 dark:opacity-80" />
        {/* soft texture spotlight */}
        <div className="absolute inset-0 [background:radial-gradient(80%_70%_at_50%_0%,rgba(255,255,255,.20),transparent_60%)] dark:[background:radial-gradient(80%_70%_at_50%_0%,rgba(255,255,255,.10),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="mx-auto text-center text-light">
            <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold ring-1 ring-white/30">
              We reply within 24 hours
            </span>
            <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow">
              Let’s Talk About Your Boat
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-light/95">
              Custom builds, mirror-finish painting, or year-round maintenance — we’re here to help.
            </p>

            {/* quick action buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="tel:+971551234567"
                className="rounded-full bg-accent px-5 py-3 font-semibold text-dark hover:bg-white hover:text-primary transition"
              >
                Call Us
              </a>
              <a
                href="mailto:info@oceanstella.ae"
                className="rounded-full border border-white/70 px-5 py-3 font-semibold text-light hover:bg-white/10 transition"
              >
                Email
              </a>
              <a
                href={`https://wa.me/+971551234567?text=${encodeURIComponent(
                  "Hi Ocean Stella — I have a question about your services."
                )}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/70 px-5 py-3 font-semibold text-light hover:bg-white/10 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* wave divider */}
        <svg viewBox="0 0 1440 120" className="relative block w-full h-[70px] fill-light dark:fill-[#0F1B2A]">
          <path d="M0,64L48,58.7C96,53,192,43,288,53.3C384,64,480,96,576,112C672,128,768,128,864,112C960,96,1056,64,1152,53.3C1248,43,1344,53,1392,58.7L1440,64V120H0Z" />
        </svg>
      </section>

      {/* INFO CARDS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8-mt-8 sm:-mt-10">
        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {[
            { Icon: FiPhone, label: "Phone", value: "+971 55 123 4567" },
            { Icon: FiMail, label: "Email", value: "info@oceanstella.ae" },
            { Icon: FiClock, label: "Hours", value: "Sun–Thu · 09:00–18:00" },
          ].map(({ Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl bg-white dark:bg-slate-800 p-5 shadow-md ring-1 ring-black/5 dark:ring-white/10 hover:shadow-lg transition"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-white/10 dark:text-accent">
                <Icon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300">{label}</p>
                <p className="text-base font-semibold text-dark dark:text-light">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MAIN GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT: Map + Address */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md ring-1 ring-black/5 dark:ring-white/10">
              <h2 className="text-2xl font-bold text-dark dark:text-light">Find Us</h2>
              <p className="mt-1 text-slate-600 dark:text-slate-300">
                Visit our yard for a guided tour of current builds and facilities.
              </p>

              <div className="mt-4 flex items-start gap-3 text-slate-700 dark:text-slate-300">
                <span className="mt-1 rounded-lg bg-primary/10 px-2 py-1 text-primary dark:text-accent">
                  <FiMapPin />
                </span>
                <div className="text-sm leading-6">
                  Dock A-12, Marina Industrial Zone, Dubai
                  <br />
                  United Arab Emirates
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-black/5 dark:border-white/10 shadow">
                <iframe
                  title="Ocean Stella Map"
                  loading="lazy"
                  className="h-72 w-full"
                  allowFullScreen
                  src="https://www.openstreetmap.org/export/embed.html?bbox=55.2692%2C25.1875%2C55.2892%2C25.2075&layer=mapnik&marker=25.1975%2C55.2792"
                />
              </div>
            </div>

            {/* Social strip */}
            <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md ring-1 ring-black/5 dark:ring-white/10">
              <h3 className="text-lg font-semibold text-dark dark:text-light">Follow Us</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Get build updates, paint reveals & maintenance tips.
              </p>
              <div className="mt-4 flex gap-4 text-2xl text-primary dark:text-accent">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-80">
                  <RiFacebookFill />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-80">
                  <RiInstagramFill />
                </a>
                <a
                  href={`https://wa.me/+923322649000?text=${encodeURIComponent("Hi, I'm interested in your services.")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  className="hover:opacity-80"
                >
                  <RiWhatsappFill />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Contact Form (wired) */}
          <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 sm:p-8 shadow-md ring-1 ring-black/5 dark:ring-white/10">
            <h2 className="text-2xl font-bold text-dark dark:text-light">Send a Message</h2>
            <p className="mt-1 text-slate-600 dark:text-slate-300">
              Tell us a bit about your project or the service you need.
            </p>

            {/* alerts */}
            {okMsg && (
              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200">
                {okMsg}
              </div>
            )}
            {errMsg && (
              <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-800 dark:text-rose-200">
                {errMsg}
              </div>
            )}

            <form className="mt-6 grid gap-5" onSubmit={onSubmit}>
              {/* honeypot (hidden) */}
              <div className="hidden">
                <label>Company</label>
                <input
                  autoComplete="off"
                  tabIndex={-1}
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                />
              </div>

              {/* name + email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Full Name</label>
                  <input
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-dark placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-900 dark:text-light dark:border-slate-700"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-dark placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-900 dark:text-light dark:border-slate-700"
                    placeholder="you@domain.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* phone + service */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Phone</label>
                  <input
                    type="tel"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-dark placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-900 dark:text-light dark:border-slate-700"
                    placeholder="+971 55 123 4567"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Service</label>
                  <select
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-dark
                               focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-900 dark:text-light dark:border-slate-700"
                    value={form.service}
                    onChange={(e) => setForm((f) => ({ ...f, service: e.target.value, subject: e.target.value }))}
                  >
                    <option>Boat Making</option>
                    <option>Boat Painting</option>
                    <option>Maintenance</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* subject */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Subject (optional)</label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-dark placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-900 dark:text-light dark:border-slate-700"
                  placeholder="e.g., Pricing details?"
                  value={form.subject}
                  onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                />
              </div>

              {/* message */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Message</label>
                <textarea
                  rows={5}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-dark placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-900 dark:text-light dark:border-slate-700"
                  placeholder="Tell us about your project, timeline, budget, etc."
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              {/* quantity (optional) */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Quantity (optional)</label>
                <input
                  type="number"
                  min={1}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-dark placeholder-slate-400
                             focus:outline-none focus:ring-2 focus:ring-primary/40 dark:bg-slate-900 dark:text-light dark:border-slate-700"
                  placeholder="1"
                  value={form.quantity}
                  onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                />
              </div>

              {/* consent */}
              <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/40"
                  checked={form.consent}
                  onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                  required
                />
                I agree to be contacted by Ocean Stella about my inquiry.
              </label>

              {/* submit */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={`rounded-full px-6 py-3 font-semibold transition ${
                    canSubmit
                      ? "bg-accent text-dark hover:bg-primary hover:text-light"
                      : "bg-slate-300 text-slate-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-400"
                  }`}
                >
                  {submitting ? "Sending…" : "Send Message"}
                </button>
                <a
                  href={`https://wa.me/+971551234567?text=${encodeURIComponent(
                    `Hi Ocean Stella — My name is ${form.name || "(your name)"}. ` +
                      `I’m inquiring about ${form.subject || form.service}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-primary px-6 py-3 font-semibold text-primary hover:bg-primary hover:text-light transition"
                >
                  Chat on WhatsApp
                </a>
              </div>

              {/* small reassurance */}
              <p className="text-xs text-slate-500 dark:text-slate-400">
                We respect your privacy. Your information will not be shared.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER SOCIAL BAND */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md ring-1 ring-black/5 dark:ring-white/10 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-300">Prefer social?</p>
          <div className="mt-3 mx-auto flex max-w-xs items-center justify-center gap-6 text-2xl text-primary dark:text-accent">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-80">
              <RiFacebookFill />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-80">
              <RiInstagramFill />
            </a>
            <a href="https://wa.me/+971551234567" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:opacity-80">
              <RiWhatsappFill />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
