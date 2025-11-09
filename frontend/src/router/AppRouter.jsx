import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import BlogDetails from "../pages/BlogsDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Admin Pages
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import AdminPosts from "./admin/pages/PostsManager";
import AdminPostEditor from "./admin/pages/PostEditor";
import UsersManager from "./admin/pages/UserManager";
import AdminComments from "./admin/pages/CommentsManager";
import AdminCategories from "./admin/pages/CategoriesManager";
import AdminActivity from "./admin/pages/ActivityLog";
import Register from "./admin/pages/Register";
import Login from "./admin/pages/Login";

import PrivateRoute from "./PrivateRoute";

export default function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<Dashboard />} /> 
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/new" element={<AdminPostEditor />} />
          <Route path="posts/edit/:id" element={<AdminPostEditor />} />
          <Route path="users" element={<UsersManager />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="activity" element={<AdminActivity />} />
        </Route>

        {/* Admin Auth Routes (Public) */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}
