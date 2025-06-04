import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, Home, ClipboardList, Users, BarChart, Settings } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { name: "Home", icon: Home, path: "/admin" },
    { name: "Applications", icon: ClipboardList, path: "/admin/applications" },
    { name: "User Management", icon: Users, path: "/admin/users" },
    { name: "Analytics", icon: BarChart, path: "/admin/analytics" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed w-[18%] h-[88%] inset-0 top-0 bottom-0 bg-gray-900 text-white mt-22 p-2">
      <div className="flex flex-col h-full justify-between">
        <nav className="flex-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center p-3 mb-3 rounded-lg w-full ${
                isActive(item.path) ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto pb-4">
          <button
            className="flex items-center p-3 rounded-lg bg-red-600 hover:bg-red-700 w-full"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
