import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ title, excerpt, image, slug }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={`http://localhost:5000${blog.image}`}
          alt={title}
          className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3 hover:text-blue-600 transition-colors duration-300">
          {title}
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">{excerpt}</p>

        <Link
          to={`/blog/${slug}`}
          className="inline-block w-fit text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg font-medium shadow hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
