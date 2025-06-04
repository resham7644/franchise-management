import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid } from 'recharts';
import { Loader2 } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF4C4C'];

function AdminAnalytics() {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, appRes] = await Promise.all([
          axios.get("http://localhost:2004/user/fetchall"),
          axios.get("http://localhost:2004/form/allapplicants")
        ]);
        setUsers(userRes.data);
        setApplications(appRes.data);
      } catch (err) {
        setError("Failed to load analytics. Please check the APIs.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const userData = [
    { name: 'Active Users', value: users.filter(u => u.status === 0).length },
    { name: 'Inactive Users', value: users.filter(u => u.status !== 0).length },
  ];

  const applicationData = [
    { name: 'Accepted', value: applications.filter(a => a.status === 1).length },
    { name: 'Pending', value: applications.filter(a => a.status === 0).length },
    { name: 'Rejected', value: applications.filter(a => a.status === 2).length },
  ];

  return (
    <div className="p-6 bg-gray-100 overflow-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Admin Analytics</h2>

      {loading ? (
        <div className="flex items-center justify-center h-[70vh]">
          <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Users Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">User Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Applications Bar Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Franchise Applications</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {applicationData.map((entry, index) => (
                    <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAnalytics;
