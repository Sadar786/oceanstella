import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

export default function MainLayout({ children }) {
  const mode = useSelector((state) => state.theme.mode); // get current theme from Redux

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="flex min-h-screen flex-col bg-light dark:bg-[#0b1624] text-dark dark:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingButton />

      </div>
    </div>
  );
}
