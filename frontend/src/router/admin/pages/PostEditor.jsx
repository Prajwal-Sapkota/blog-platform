import React, { useState, useEffect, useRef } from "react";
import api from "../../../utils/api"; // axios instance
import toast from "react-hot-toast";

export default function PostEditor() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  // Handle file select
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("category", category);
    if (fileInputRef.current.files[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }
    try {
      const res = await api.post("/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Blog created successfully!");
      console.log(res.data);

      // Reset form
      setTitle("");
      setExcerpt("");
      setContent("");
      setImage(null);
      setCategory("");
      fileInputRef.current.value = null;
    } catch (err) {
      console.error(err);
      toast.error("Failed to create blog.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-5 text-gray-800">📝 Create Blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short Excerpt"
          className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          required
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog content here..."
          className="border border-gray-300 p-2 h-40 rounded focus:ring-2 focus:ring-blue-500"
          required
        />

        <div>
          <label className="block mb-1 text-gray-600 font-medium">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded w-full"
          />
          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-full h-48 object-cover rounded mt-3 border"
            />
          )}
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}
