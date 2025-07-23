export default function ContactStrip() {
  return (              
    <section className="section-wrapper mb-6 flex mb-3 flex-col items-center gap-6 rounded-xl bg-primary/5 md:flex-row md:justify-between">
      <h3 className="text-xl font-semibold text-dark">
        Ready to start your next boat project?
      </h3>
      <a
        href="https://wa.me/+923322649000"
        className="rounded-lg bg-accent px-6 py-3 font-semibold text-dark hover:bg-primary hover:text-light"
      >
        Chat on WhatsApp
      </a>
    </section>
  );
}
