import logo from "../assets/logo.svg"; 

export default function Footer() {
  return (
    <footer className="bg-dark text-light ring-1 ring-light/10">

      <div className="section-wrapper grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Column 1 */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Ocean Stella</h3>
          <p className="text-sm opacity-80">
            Crafting quality boats in the UAE.<br />
            © {new Date().getFullYear()} Ocean Stella.
          </p>
          {/* Logo */}
          <div className="flex mx-auto mt-4 ">

                  <a href="/" className="flex items-center gap-2">
                    <img src={logo} alt="Ocean Stella" className="h-8 w-auto rounded-md" />
                    <span className="hidden font-semibold text-primary md:inline">Ocean Stella</span>
                  </a>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="mb-2 font-medium">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li><a href="/services" className="hover:text-accent">Services</a></li>
            <li><a href="/products" className="hover:text-accent">Products</a></li>
            <li><a href="/about"    className="hover:text-accent">About Us</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-3">
          <h4 className="font-medium">Let’s Talk</h4>
          <a
            href="https://wa.me/+923322649000"
            className="rounded-lg bg-accent px-4 py-2 text-center font-semibold text-dark hover:bg-primary hover:text-light"
          >
            WhatsApp
          </a>
          <p className="text-sm opacity-80">info@oceanstella.ae</p>
        </div>
      </div>
    </footer>
  );
}
