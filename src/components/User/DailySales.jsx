import { useState, useContext } from 'react';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import ProductDropdown from './ProductDropdown';
import EmployeeDropdown from './EmployeeDropdown';
import { useAuth } from '../Context/AuthContext';

export default function DailySales() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: '',
    product: '',
    employee: '',
    quantity: '',
    totalAmount: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        uploadedBy: user.id,
      };
      await axios.post('http://localhost:2004/sales/upload', payload);
      alert('Sales entry uploaded successfully');
      setFormData({ date: '', product: '', employee: '', quantity: '', totalAmount: '' });
    } catch (error) {
      console.error('Error uploading sales entry:', error);
      alert('Failed to upload sales entry');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[90%] mt-6 mx-auto px-6 py-10 bg-white shadow-xl rounded-2xl space-y-10">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">Upload Sales Entry</h2>
        <p className="mt-1 text-sm text-gray-500">Fill in the details below to submit a sales record.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date of Sale</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <ProductDropdown selected={formData.product} onChange={(value) => setFormData({ ...formData, product: value })} />

        <EmployeeDropdown selected={formData.employee} onChange={(value) => setFormData({ ...formData, employee: value })} />

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantity Sold</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., 10"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="totalAmount" className="block text-sm font-medium text-gray-700">Total Amount (₹)</label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            min="0"
            value={formData.totalAmount}
            onChange={handleChange}
            className="mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="e.g., 1500"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
