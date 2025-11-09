import React, { useState } from "react";

export default function Comments({ blogId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const fetchComments = async () => {
    const res = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
    const data = await res.json();
    setComments(data.Comments || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    await fetch(`http://localhost:5000/api/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, text })
    });
    setText("");
    fetchComments();
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-bold mb-4">Comments</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Post</button>
      </form>

      <ul className="space-y-2">
        {comments.map(c => <li key={c.id} className="border-b pb-2">{c.text}</li>)}
      </ul>
    </div>
  );
}
