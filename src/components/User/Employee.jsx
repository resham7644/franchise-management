import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

export default function Employee() {
    const { user } = useAuth();
    const [employees, setEmployees] = useState([]);
    const [formData, setFormData] = useState({ name: '', role: '', contact: '' });
    const [editId, setEditId] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', role: '', contact: '' });
  
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (req,resp) => {
    try {
        const res = await axios.get(`http://localhost:2004/employee/fetchall/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees', err);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    console.log(user);
    const { name, role, contact } = formData;
    const payload = {
        ...formData,
        uploadedBy: user.id,
      };
      console.log(payload)
    if (!name || !role || !contact) return alert('Please fill all fields');
    try {
      await axios.post('http://localhost:2004/employee/save', payload,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setFormData({ name: '', role: '', contact: '' });
      alert("Employee Added Successfully");
      fetchEmployees();
    } catch (err) {
      console.error('Error adding employee', err);
    }
  };

  const handleEdit = (emp) => {
    setEditId(emp._id);
    setEditForm({ name: emp.name, role: emp.role, contact: emp.contact });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:2004/employee/${id}`, editForm,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setEditId(null);
      fetchEmployees();
    } catch (err) {
      console.error('Error updating employee', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2004/employee/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchEmployees();
    } catch (err) {
      console.error('Error deleting employee', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-5 p-6 bg-white rounded-xl shadow-lg space-y-10">
      <h2 className="text-2xl font-bold text-gray-800">Employee Management</h2>

      {/* Add Form */}
      <form onSubmit={handleAddEmployee} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="text"
          placeholder="Contact"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="sm:col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md mt-2"
        >
          Add Employee
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        {employees.length === 0 ? (
          <p className="text-gray-500 text-center">No employees added yet.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Contact</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp._id} className="border-t border-gray-200">
                  {editId === emp._id ? (
                    <>
                      <td className="py-2 px-4">
                        <input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          value={editForm.role}
                          onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          value={editForm.contact}
                          onChange={(e) => setEditForm({ ...editForm, contact: e.target.value })}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 space-x-2">
                        <button
                          onClick={() => handleUpdate(emp._id)}
                          className="text-green-600 hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditId(null);
                            setEditForm({ name: '', role: '', contact: '' });
                          }}
                          className="text-gray-500 hover:underline"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4">{emp.name}</td>
                      <td className="py-2 px-4">{emp.role}</td>
                      <td className="py-2 px-4">{emp.contact}</td>
                      <td className="py-2 px-4 space-x-2">
                        <button
                          onClick={() => handleEdit(emp)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
