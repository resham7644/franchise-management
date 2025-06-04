import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, PackageCheck, Menu, X, Home, BarChart, History, Settings, LogOut, TrendingUp, Users } from "lucide-react";
import { useAuth } from '../Context/AuthContext';

function UserSidebar() {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 get current route
  const { user, logout } = useAuth();

  // Map paths to tab names
  const pathToTab = {
    "/user": "Home",
    "/user/dailysales": "Daily Sales",
    "/user/saleshistory": "Sales History",
    "/user/employee": "Employees",
    "/user/products": "Products",
    "/user/settings": "Settings",
    "/user/charts": "Charts"
  };

  const currentTab = pathToTab[location.pathname] || "Home"; // 👈 fallback to Home

  const navItems = [
    { name: "Home", icon: Home, path: "/user" },
    { name: "Daily Sales", icon: TrendingUp, path: "/user/dailysales" },
    { name: "Sales History", icon: History, path: "/user/saleshistory" },
    { name: "Employees", icon: Users, path: "/user/employee" },
    { name: "Products", icon: PackageCheck, path: "/user/products" },
    { name: "Charts", icon: BarChart, path: "/user/charts" },
    { name: "Settings", icon: Settings, path: "/user/settings" },
  ];

  function handleLogout() {
    logout();
    navigate("/"); 
  }

  return (
    <div className='fixed w-[18%] h-[88%] inset-0 top-0 bottom-0 bg-gray-900 text-white mt-22 p-2'>
      <div className='flex flex-col h-full justify-between'>
        <nav className="flex-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              className={`flex items-center p-3 mb-3 rounded-lg w-full ${currentTab === item.name ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>

        <div className='mt-auto pb-4'>
          <button className="flex items-center p-3 rounded-lg bg-red-600 hover:bg-red-700 w-full" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserSidebar;
