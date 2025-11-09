import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { FaUsers, FaShoppingCart, FaDollarSign } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return; // safety

    axios
      .get("https://blog-platform-3-qvh1.onrender.com/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStats(res.data);

        // Example chart data
        const monthly = res.data.monthlyStats || [];
        setChartData(monthly.map((item) => ({
          name: item.month,
          value: item.value,
        })));
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/admin/login";
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Logout Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <FaUsers className="text-blue-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500">Users</p>
            <p className="text-2xl font-bold">{stats.users}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <FaShoppingCart className="text-green-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500">Orders</p>
            <p className="text-2xl font-bold">{stats.orders}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <div className="bg-yellow-100 p-3 rounded-full">
            <FaDollarSign className="text-yellow-600 w-6 h-6" />
          </div>
          <div>
            <p className="text-gray-500">Revenue</p>
            <p className="text-2xl font-bold">${stats.revenue}</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
