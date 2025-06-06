import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

export default function Products() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: '', code: '', price: '' });
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', code: '', price: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`https://franchise-backend-jr02.onrender.com/product/fetchall/${user.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products', err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      uploadedBy: user.id,
    };
    if (!formData.name || !formData.code || !formData.price) return alert('Please fill all fields');
    try {
      await axios.post('https://franchise-backend-jr02.onrender.com/product/save', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFormData({ name: '', code: '', price: '' });
      alert('Product Added Successfully');
      fetchProducts();
    } catch (err) {
      console.error('Error adding product', err);
    }
  };

  const handleEdit = (prod) => {
    setEditId(prod._id);
    setEditForm({ name: prod.name, code: prod.code, price: prod.price });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://franchise-backend-jr02.onrender.com/product/${id}`, editForm, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error('Error updating product', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://franchise-backend-jr02.onrender.com/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-5 p-6 bg-white rounded-xl shadow-lg space-y-10">
      <h2 className="text-2xl font-bold text-gray-800">Product Management</h2>

      {/* Add Form */}
      <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="text"
          placeholder="Product Code"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="sm:col-span-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md mt-2"
        >
          Add Product
        </button>
      </form>

      {/* Table */}
      <div className="overflow-x-auto">
        {products.length === 0 ? (
          <p className="text-gray-500 text-center">No products added yet.</p>
        ) : (
          <table className="w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Code</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id} className="border-t border-gray-200">
                  {editId === prod._id ? (
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
                          value={editForm.code}
                          onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          value={editForm.price}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                          className="border rounded px-2 py-1 w-full"
                        />
                      </td>
                      <td className="py-2 px-4 space-x-2">
                        <button
                          onClick={() => handleUpdate(prod._id)}
                          className="text-green-600 hover:underline"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditId(null);
                            setEditForm({ name: '', code: '', price: '' });
                          }}
                          className="text-gray-500 hover:underline"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4">{prod.name}</td>
                      <td className="py-2 px-4">{prod.code}</td>
                      <td className="py-2 px-4">{prod.price}</td>
                      <td className="py-2 px-4 space-x-2">
                        <button
                          onClick={() => handleEdit(prod)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(prod._id)}
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