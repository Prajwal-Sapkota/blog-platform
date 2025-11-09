import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import AdminDashboard from "./pages/Dashboard";
import AdminPosts from "./pages/PostsManager";
import UsersManager from "./pages/UserManager";
import CategoriesManager from "./pages/CategoriesManager";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar could go here */}
      <div className="flex-1 p-4 bg-gray-100">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          
        </Routes>
        <Outlet /> {/* optional for nested routing */}
      </div>
    </div>
  );
}
