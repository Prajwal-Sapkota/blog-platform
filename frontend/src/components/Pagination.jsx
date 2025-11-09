import React from "react";

export default function Pagination({ totalPages, currentPage, setCurrentPage }) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'}`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
