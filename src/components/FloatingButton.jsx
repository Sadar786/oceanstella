// src/components/FloatingButton.jsx
import { RiWhatsappFill } from "react-icons/ri";

export default function FloatingButton() {
  return (
    <a
      href="https://wa.me/923322649000"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all"
      aria-label="WhatsApp"
    >
      <RiWhatsappFill className="text-3xl" />
    </a>
  );
}
