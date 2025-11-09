import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import toast from "react-hot-toast";

export default function CommentsManager() {
  const [comments, setComments] = useState([]);
  useEffect(()=>{ fetchComments(); }, []);
  const fetchComments = async () => {
    const res = await api.get("/admin/comments");
    setComments(res.data);
  };
  const approve = async (id) => { await api.put(`/admin/comments/${id}/approve`); toast.success("Approved"); fetchComments(); };
  const del = async (id) => { await api.delete(`/admin/comments/${id}`); toast.success("Deleted"); fetchComments(); };

  return (
    <div>
      <h1 className="text-2xl mb-4">Comments</h1>
      <ul className="space-y-2">
        {comments.map(c=>(
          <li key={c.id} className="bg-white p-3 rounded shadow">
            <div className="text-sm text-gray-600 mb-2">{c.authorEmail || "Guest"} • {new Date(c.createdAt).toLocaleString()}</div>
            <div className="mb-3">{c.text}</div>
            <div className="flex gap-2">
              <button onClick={()=>approve(c.id)} className="px-2 py-1 border rounded">Approve</button>
              <button onClick={()=>del(c.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
