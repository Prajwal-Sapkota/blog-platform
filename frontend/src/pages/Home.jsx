import React, { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const { blogs, loading } = useContext(BlogContext);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || blog.category === category;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);
  const displayedBlogs = filteredBlogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* --- Page Header --- */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
          Welcome to Our Blog
        </h1>
        <p className="text-gray-600 text-lg md:w-2/3 mx-auto">
          Explore our latest articles, tips, and stories across different topics.
        </p>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="flex flex-col md:flex-row md:justify-between mb-8 gap-4 bg-white shadow-md p-4 rounded-xl">
        <input
          type="text"
          placeholder="🔍 Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg w-full md:w-1/2 transition"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-lg w-full md:w-1/4 bg-gray-50 transition"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* --- Blogs Grid --- */}
      {displayedBlogs.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="overflow-hidden">
                <img
                  src={`http://localhost:5000${blog.image}`}
                  alt={blog.title}
                  className="w-full h-56 object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
                  {blog.category}
                </span>
                <h2 className="text-xl font-bold text-gray-800 mt-2 line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mt-3 line-clamp-3">{blog.excerpt}</p>
                <a
                  href={`/blog/${blog.slug}`}
                  className="inline-block mt-4 text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg mt-12">
          No blogs found. Try a different keyword or category.
        </p>
      )}

      {/* --- Pagination --- */}
      <div className="mt-10 flex justify-center">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
