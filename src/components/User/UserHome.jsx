import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    totalQuantity: 0,
    lastSaleDate: "-",
  });
  const [recentSales, setRecentSales] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true); // loading state

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get(`http://localhost:2004/sales/fetchall/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const sales = res.data || [];

        let totalSales = 0;
        let totalQuantity = 0;
        let lastSaleDate = "-";

        sales.forEach(s => {
          totalSales += s.totalAmount;
          totalQuantity += s.quantity;
        });

        if (sales.length > 0) {
          const sorted = [...sales].sort((a, b) => new Date(b.date) - new Date(a.date));
          lastSaleDate = new Date(sorted[0].date).toLocaleDateString();
          setRecentSales(sorted.slice(0, 5));
        }

        setMetrics({ totalSales, totalQuantity, lastSaleDate });

        const chartLabels = sales.map(s => new Date(s.date).toLocaleDateString());
        const chartAmounts = sales.map(s => s.totalAmount);

        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "Total Sales",
              data: chartAmounts,
              backgroundColor: "#4F46E5"
            }
          ]
        });
      } catch (err) {
        console.error("Failed to load metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, [user.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome */}
      <div className="mb-6 flex items-center justify-between bg-white p-6 rounded shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back, {user.name} 👋</h1>
          <p className="text-gray-500 text-sm">Here’s your dashboard overview.</p>
        </div>
        <button
          className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
          onClick={() => navigate("/user/settings")}
        >
          ⚙️ Edit Profile
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded shadow flex flex-col">
          <span className="text-gray-500">Total Sales</span>
          <span className="text-xl font-bold text-green-600">₹{metrics.totalSales}</span>
        </div>
        <div className="bg-white p-5 rounded shadow flex flex-col">
          <span className="text-gray-500">Total Products Sold</span>
          <span className="text-xl font-bold text-blue-600">{metrics.totalQuantity}</span>
        </div>
        <div className="bg-white p-5 rounded shadow flex flex-col">
          <span className="text-gray-500">Last Sale</span>
          <span className="text-xl font-bold text-gray-800">{metrics.lastSaleDate}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-6 px-4 rounded shadow text-center"
            onClick={() => navigate("/user/dailysales")}
          >
            ➕ Upload Sale
            <p className="text-xs mt-1 text-gray-500">Log a new daily transaction</p>
          </button>

          <button
            className="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-6 px-4 rounded shadow text-center"
            onClick={() => navigate("/user/saleshistory")}
          >
            📋 Sales History
            <p className="text-xs mt-1 text-gray-500">Review all previous sales</p>
          </button>

          <button
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium py-6 px-4 rounded shadow text-center"
            onClick={() => navigate("/user/products")}
          >
            📦 Products
            <p className="text-xs mt-1 text-gray-500">Manage available product list</p>
          </button>

          <button
            className="bg-pink-100 hover:bg-pink-200 text-pink-700 font-medium py-6 px-4 rounded shadow text-center"
            onClick={() => navigate("/user/employee")}
          >
            🧑‍💼 Employees
            <p className="text-xs mt-1 text-gray-500">Add or manage your staff</p>
          </button>
        </div>
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Overview</h2>
        {chartData && (
          <Bar
            data={chartData}
            options={{ responsive: true, plugins: { legend: { display: false } } }}
          />
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
        <ul className="divide-y divide-gray-100">
          {recentSales.map((s, i) => (
            <li key={i} className="py-2 text-sm text-gray-600">
              <strong>{new Date(s.date).toLocaleDateString()}</strong> — Sold <strong>{s.quantity}</strong>x "{s.product?.name}" — ₹{s.totalAmount}
            </li>
          ))}
          {recentSales.length === 0 && <li className="text-gray-400">No recent sales available.</li>}
        </ul>
      </div>
    </div>
  );
};

export default UserHome;
