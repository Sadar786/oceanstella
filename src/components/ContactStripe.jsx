import { FiMessageCircle } from "react-icons/fi";

export default function ContactStrip() {
  return (              
    <section className="section-wrapper mb-6 flex dark:bg-slate-800 flex-col items-center gap-6 rounded-xl bg-primary/5 md:flex-row md:justify-between">
      <div className="flex gap-2">
      <FiMessageCircle className="text-3xl opacity-90" />

      <h3 className="text-xl font-semibold dark:text-light  text-dark">
        Ready to start your next boat project?
      </h3>
      </div>
      <a
        href="https://wa.me/+923322649000"
        className="rounded-lg bg-accent px-6 py-3 font-semibold text-dark hover:bg-primary hover:text-light"
      >
        Chat on WhatsApp
      </a>
    </section>
  );
}
