import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

export default function ProductDropdown({ value, onChange }) {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    axios.get(`http://localhost:2004/product/fetchall/${user.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
  }, []);


  return (
    <div>
      <label htmlFor="product" className="block text-sm font-medium text-gray-700">
        Product Name
      </label>
      <div className="relative mt-2">
        <select
          id="product"
          name="product"
          value={value}
          onChange={(e)=>onChange(e.target.value)}
          className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select an employee</option>
          {products.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
