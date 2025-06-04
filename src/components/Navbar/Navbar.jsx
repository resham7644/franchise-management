import { useState } from "react";
import { Bell, ChevronDown } from "lucide-react";
import {useAuth} from '../Context/AuthContext'

const Navbar = () => {
    const {user} = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <h1 className="text-2xl font-bold">Franchsie Flow</h1>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          {/* <button className="relative hover:bg-gray-700 p-2 rounded-full">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 rounded-full">3</span>
          </button> */}

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-lg"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user.profile || "https://via.placeholder.com/40"}
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="User Avatar"
              />
              <span>{user.name  }</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden p-4">
                <p className="text-sm">Name: {user.name}</p>
                <p className="text-sm">Email: {user.email}</p>
                <p className="text-sm">Role: {user.role}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
