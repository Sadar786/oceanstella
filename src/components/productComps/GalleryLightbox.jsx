import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function GalleryLightbox({
  open,
  setOpen,
  images = [],
  index = 0,
  setIndex,
  title = "",
}) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % Math.max(1, images.length));
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + Math.max(1, images.length)) % Math.max(1, images.length));
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, images.length, setOpen, setIndex]);

  if (!open) return null;

  const current = images[index] || "";

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      onClick={(e) => {
        if (e.target === overlayRef.current) setOpen(false);
      }}
    >
      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-3 text-white">
        <div className="truncate text-sm opacity-80">{title}</div>
        <div className="flex items-center gap-3">
          <span className="text-xs opacity-80">
            {index + 1}/{images.length}
          </span>
          <button
            className="rounded-full bg-white/10 px-3 py-1 text-xs hover:bg-white/20"
            onClick={() => setOpen(false)}
          >
            Close (Esc)
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="max-h-[80vh] max-w-[92vw]">
        <img
          src={current}
          alt={title}
          className="max-h-[80vh] max-w-[92vw] rounded-lg object-contain shadow-lg"
        />
      </div>

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20"
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
    </div>,
    document.body
  );
}
