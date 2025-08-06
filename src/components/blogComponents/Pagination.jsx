// src/components/Pagination.jsx
import { useNavigate, useLocation } from "react-router-dom";

export default function Pagination({ currentPage, totalPages }) {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const goTo = (page) => {
    const params = new URLSearchParams(search);
    params.set("page", page);
    navigate(`${pathname}?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center my-8 space-x-2">
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow disabled:opacity-50"
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goTo(page)}
          className={`px-3 py-1 rounded-full shadow ${
            page === currentPage
              ? "bg-primary text-light"
              : "bg-white dark:bg-slate-800"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}
