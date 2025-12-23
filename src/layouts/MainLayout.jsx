import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";

export default function MainLayout() {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <div className={mode === "dark" ? "dark" : ""}>
      <div className="flex min-h-screen flex-col bg-light dark:bg-[#0b1624] text-dark dark:text-white">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <FloatingButton />
      </div>
    </div>
  );
}
