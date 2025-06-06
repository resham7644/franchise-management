import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const AdminHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [metrics, setMetrics] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    registeredUsers: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const fetchAdminMetrics = async () => {
      try {
        const token = localStorage.getItem("token");

        const [applicationsRes, usersRes] = await Promise.all([
          axios.get("https://franchise-backend-jr02.onrender.com/form/allapplicants", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://franchise-backend-jr02.onrender.com/user/fetchall", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const applications = applicationsRes.data || [];
        const users = usersRes.data || [];

        const pendingApplications = applications.filter(app => app.status != 3).length;

        const recent = applications
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .slice(0, 5)
          .map(app => {
            return {
              id: app._id,
              type: app.status,
              name: app.franchiseName,
              updatedAt: app.updatedAt,
            };
          });

        setMetrics({
          totalApplications: applications.length,
          pendingApplications,
          registeredUsers: users.length-1,
        });

        setRecentActivity(recent);
      } catch (error) {
        console.error("Error fetching admin metrics:", error);
      }
    };

    fetchAdminMetrics();
  }, []);

  return (
    <div className="p-6 bg-gray-100 ">
      {/* Welcome */}
      <div className="mb-6 flex items-center justify-between bg-white p-6 rounded shadow">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome, Admin 👋</h1>
          <p className="text-gray-500 text-sm">Here’s your dashboard overview.</p>
        </div>
        <button
          className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold"
          onClick={() => navigate("/admin/settings")}
        >
          ⚙️ Admin Settings
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded shadow flex flex-col ">
          <span className="text-gray-500">Total Applications</span>
          <span className="text-xl font-bold text-purple-600">{metrics.totalApplications}</span>
        </div>
        <div className="bg-white p-5 rounded shadow flex flex-col">
          <span className="text-gray-500">Pending Applications</span>
          <span className="text-xl font-bold text-blue-600">{metrics.pendingApplications}</span>
        </div>
        <div className="bg-white p-5 rounded shadow flex flex-col">
          <span className="text-gray-500">Registered Users</span>
          <span className="text-xl font-bold text-green-600">{metrics.registeredUsers}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4  h-36">
          <button
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-6 px-4 rounded shadow text-center"
            onClick={() => navigate("/admin/applications")}
          >
            📝 Applications
            <p className="text-xs mt-1 text-gray-500">View and manage all applications</p>
          </button>

          <button
            className="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-6 px-4 rounded shadow text-center"
            onClick={() => navigate("/admin/users")}
          >
            👥 User Management
            <p className="text-xs mt-1 text-gray-500">Manage registered users</p>
          </button>

          <button
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium py-6 px-4 rounded shadow text-center"
            onClick={() => navigate("/admin/analytics")}
          >
            📊 Analytics
            <p className="text-xs mt-1 text-gray-500">View detailed reports</p>
          </button>

          <button
            className="bg-pink-100 hover:bg-pink-200 text-pink-700 font-medium py-6 px-4 rounded shadow text-center"
            onClick={() => navigate("/admin/settings")}
          >
            ⚙️ Settings
            <p className="text-xs mt-1 text-gray-500">Change admin preferences</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
