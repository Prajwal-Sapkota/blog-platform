import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import toast from "react-hot-toast";

export default function UsersManager() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  useEffect(()=>{ fetchUsers(); }, []);

  const changeRole = async (id, role) => {
    await api.put(`/admin/users/${id}/role`, { role });
    toast.success("Role updated");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    if (!confirm("Delete user?")) return;
    await api.delete(`/admin/users/${id}`);
    toast.success("Deleted");
    fetchUsers();
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Users</h1>
      <table className="w-full bg-white rounded shadow">
        <thead className="text-left border-b">
          <tr><th className="p-2">Name</th><th>Email</th><th>Role</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u=>(
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2 flex gap-2">
                <button onClick={()=>changeRole(u.id, u.role==="admin" ? "author" : "admin")} className="px-2 py-1 border rounded">Toggle Role</button>
                <button onClick={()=>deleteUser(u.id)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
