// src/components/ProductsGallery.jsx
import boat1 from "../assets/boat1.jpg";
import boat2 from "../assets/boat2.jpg";
import boat3 from "../assets/boat3.jpg";

const boats = [
  { src: boat1, name: "Stella 32" },
  { src: boat3, name: "Explorer 60" },
  { src: boat2, name: "Mariner 45" },
];

export default function ProductsGallery() {
  return (
    <section className="bg-light py-16">
      <div className="mx-auto max-w-6xl px-4">
                       
        <h2 className="mb-8 text-center text-3xl font-bold text-dark">
          Featured Models
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {boats.map((boat) => (
            <div
              key={boat.name}
              className="relative aspect-video overflow-hidden rounded-xl shadow-sm hover:shadow-md "
            >
              <img
                src={boat.src}
                alt={boat.name}
                
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />

              {/* overlay strip */}
             <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t bg-cyan-800
                 py-1 text-center text-light text-sm backdrop-blur-sm ">
  {boat.name}
</span>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
