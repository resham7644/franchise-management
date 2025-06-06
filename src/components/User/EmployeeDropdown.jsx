import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const EmployeeDropdown = ({ selected, onChange }) => {
  const [employees, setEmployees] = useState([]);
   const { user } = useAuth();

  useEffect(() => {
    axios.get(`https://franchise-backend-jr02.onrender.com/employee/fetchall/${user.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => setEmployees(res.data))
      .catch(err => console.error("Error fetching employees", err));
  }, []);

  return (
    <div>
      <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
        Employee
      </label>
      <div className="relative mt-2">
        <select
          id="employee"
          name="employee"
          value={selected}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select an employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
};

export default EmployeeDropdown;
