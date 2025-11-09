import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../components/Comment";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log(err));
  }, [slug]);

  if (!blog)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500 text-lg animate-pulse">
          Loading blog...
        </div>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center leading-snug">
        {blog.title}
      </h1>

      {/* Meta Info */}
      <div className="text-center text-gray-500 mb-8">
        <span className="text-sm">
          Published on {new Date(blog.createdAt).toLocaleDateString()}
        </span>
        {blog.author && (
          <span className="mx-2">•</span>
        )}
        {blog.author && (
          <span className="font-medium text-gray-700">{blog.author}</span>
        )}
      </div>

      {/* Image */}
      <div className="overflow-hidden rounded-2xl shadow-md mb-8">
        <img
          src={`http://localhost:5000${blog.image}`}
          alt={blog.title}
          className="w-full h-[450px] object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <p className="whitespace-pre-line">{blog.content}</p>
      </article>

      {/* Divider */}
      <div className="my-10 border-t border-gray-200"></div>

      {/* Comments Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Comments
        </h2>
        <div className="bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100">
          <Comments blogId={blog.id} />
        </div>
      </section>
    </div>
  );
}
