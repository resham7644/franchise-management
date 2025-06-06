import { useEffect, useState } from "react";
import { Calendar, Download, Search, ChevronDown } from "lucide-react";
import axios from "axios";
import * as XLSX from "xlsx";
import { useAuth } from '../Context/AuthContext';

const SalesHistory = () => {
  const { user } = useAuth();
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const res = await axios.get(`https://franchise-backend-jr02.onrender.com/sales/fetchall/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      setSalesData(res.data);
    } catch (err) {
      console.error("Failed to fetch sales:", err);
    }
  };

  const filteredSales = salesData.filter((sale) => {
      const saleDate = new Date(sale.date);
      const isAfterStart = !startDate || saleDate >= new Date(startDate);
      const isBeforeEnd = !endDate || saleDate <= new Date(endDate);
      const matchesSearch =
        !searchQuery ||
        (sale.product?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sale.employee?.name || '').toLowerCase().includes(searchQuery.toLowerCase());

      return isAfterStart && isBeforeEnd && matchesSearch;
    })
    .sort((a, b) => {
      const amountA = a.totalAmount;
      const amountB = b.totalAmount;
      return sortOrder === "asc" ? amountA - amountB : amountB - amountA;
    });

  const totalAmount = filteredSales.reduce((sum, sale) => sum + sale.totalAmount, 0);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredSales.map((sale) => ({
        Date: new Date(sale.date).toLocaleDateString(),
        Product: sale.product.name,
        Employee: sale.employee ? sale.employee.name : 'Deleted Employee',
        Quantity: sale.quantity ? sale.product.name : 'Deleted Product',
        Amount: sale.totalAmount,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SalesHistory");
    XLSX.writeFile(workbook, "SalesHistory.xlsx");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Sales History</h1>

        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded-md text-sm"
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded-md text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border rounded-md p-2 text-sm"
            >
              <option value="desc">Amount Descending</option>
              <option value="asc">Amount Ascending</option>
            </select>
            
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-md p-2 pl-9 w-full text-sm"
              placeholder="Search product or employee"
            />
            <Search className="absolute left-2 top-2.5 text-gray-400 w-4 h-4" />
          </div>

          <button
            onClick={handleExport}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md flex items-center text-sm"
          >
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-700">
            Showing <span className="font-bold">{filteredSales.length}</span> sales with
            total amount: <span className="font-bold text-green-600">{totalAmount.toLocaleString()}</span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="py-3 px-4 font-semibold">Date</th>
                <th className="py-3 px-4 font-semibold">Product</th>
                <th className="py-3 px-4 font-semibold">Employee</th>
                <th className="py-3 px-4 font-semibold">Quantity</th>
                <th className="py-3 px-4 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredSales.map((sale) => (
                <tr key={sale._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{new Date(sale.date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{sale.product ? sale.product.name : 'Deleted Product'}</td>
                  <td className="py-3 px-4">{sale.employee ? sale.employee.name : 'Deleted Employee'}</td>
                  <td className="py-3 px-4">{sale.quantity}</td>
                  <td className="py-3 px-4">{sale.totalAmount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSales.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No sales found matching your filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
