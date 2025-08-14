// src/components/ProductsGallery.jsx
import { useSelector } from "react-redux";
import boat1 from "../assets/newboat1.jpg";
import boat2 from "../assets/boatMaking3.jpg";
import boat3 from "../assets/newBoat3.jpg";

const boats = [
  { src: boat1, name: "Stella 32" },
  { src: boat3, name: "Explorer 60" },
  { src: boat2, name: "Mariner 45" },
];

export default function ProductsGallery() {
  const mode = useSelector((state) => state.theme.mode);

  return (
    <section className=" dark:bg-slate-800 dark:border-slate-600 border border-slate-200 bg-white py-16 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 dark:bg-slate-800">
        <h2 className="mb-8 text-center text-3xl font-bold text-dark dark:text-light">
          Featured Models
        </h2>

        <div className="grid gap-6 md:grid-cols-3 ">
          {boats.map((boat) => (
            <div
              key={boat.name}
              className="relative aspect-video  overflow-hidden rounded-xl shadow-sm hover:shadow-md bg-white dark:bg-slate-800 transition"
            >
              <img
                src={boat.src}
                alt={boat.name}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />

              {/* overlay strip */}
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent py-1 text-center text-light text-sm backdrop-blur-sm">
                {boat.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
