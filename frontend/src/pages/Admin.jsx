import React, { useContext, useState } from "react";
import { BlogContext } from "../context/BlogContext";

export default function Admin() {
  const { blogs, fetchBlogs } = useContext(BlogContext);
  const [form, setForm] = useState({
    title: "", excerpt: "", content: "", image: "", category: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    setForm({ title: "", excerpt: "", content: "", image: "", category: "" });
    fetchBlogs();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/blogs/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        {["title","excerpt","content","image","category"].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        ))}
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Add Blog</button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Existing Blogs</h2>
      <ul className="space-y-2">
        {blogs.map(b => (
          <li key={b.id} className="flex justify-between border-b py-2">
            <span>{b.title}</span>
            <button onClick={() => handleDelete(b.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
