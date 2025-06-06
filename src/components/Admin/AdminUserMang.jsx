import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2, Users } from 'lucide-react';

function AdminUserMang() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://franchise-backend-jr02.onrender.com/user/fetchall");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 overflow-auto">
      <div className="text-2xl font-semibold flex items-center mb-6 text-gray-800">
        <Users className="w-6 h-6 mr-2" />
        User Management
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : users.length === 0 ? (
        <div className="text-gray-600 text-center">No users found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Role</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id || index}
                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  <td className="py-3 px-4">{user.name || 'N/A'}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role || 'user'}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 0
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {user.status === 0 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminUserMang;
