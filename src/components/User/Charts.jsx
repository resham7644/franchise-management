import React, { useEffect, useState } from "react";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useAuth } from '../Context/AuthContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Charts = () => {
  const { user } = useAuth();
  const [salesData, setSalesData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [productFilter, setProductFilter] = useState("all");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get(`http://localhost:2004/sales/fetchall/${user.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setSalesData(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Failed to fetch sales:", err);
      }
    };

    if (user?.id) fetchSales();
  }, [user]);

  useEffect(() => {
    let data = salesData;

    if (productFilter !== "all") {
      data = data.filter(sale => sale.product?.name === productFilter);
    }
    if (employeeFilter !== "all") {
      data = data.filter(sale => sale.employee?.name === employeeFilter);
    }
    if (startDate) {
      data = data.filter(sale => new Date(sale.date) >= new Date(startDate));
    }
    if (endDate) {
      data = data.filter(sale => new Date(sale.date) <= new Date(endDate));
    }

    setFiltered(data);
  }, [productFilter, employeeFilter, startDate, endDate, salesData]);

  const uniqueProducts = [...new Set(salesData.map(s => s.product?.name))];
  const uniqueEmployees = [...new Set(salesData.map(s => s.employee?.name))];

  const chartLabels = filtered.map(s => new Date(s.date).toLocaleDateString());
  const chartAmounts = filtered.map(s => s.totalAmount);
  const chartQuantities = filtered.map(s => s.quantity);

  const dataConfig = {
    labels: chartLabels,
    datasets: [
      {
        label: "Total Amount",
        data: chartAmounts,
        backgroundColor: "#60A5FA", // blue-400
        borderColor: "#3B82F6",     // blue-500
        borderWidth: 2,
        fill: true,
        tension: 0.4
      },
      {
        label: "Quantity",
        data: chartQuantities,
        backgroundColor: "#A78BFA", // purple-400
        borderColor: "#8B5CF6",     // purple-500
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: false }
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow mb-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Overview</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border border-gray-300 p-2 rounded text-sm text-gray-700"
          value={productFilter}
          onChange={(e) => setProductFilter(e.target.value)}
        >
          <option value="all">All Products</option>
          {uniqueProducts.map((prod, i) => (
            <option key={i} value={prod}>{prod}</option>
          ))}
        </select>

        <select
          className="border border-gray-300 p-2 rounded text-sm text-gray-700"
          value={employeeFilter}
          onChange={(e) => setEmployeeFilter(e.target.value)}
        >
          <option value="all">All Employees</option>
          {uniqueEmployees.map((emp, i) => (
            <option key={i} value={emp}>{emp}</option>
          ))}
        </select>

        <input
          type="date"
          className="border border-gray-300 p-2 rounded text-sm text-gray-700"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-300 p-2 rounded text-sm text-gray-700"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <select
          className="border border-gray-300 p-2 rounded text-sm text-gray-700"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="doughnut">Doughnut Chart</option>
        </select>
      </div>

      {/* Chart */}
      <div className="w-full h-[300px]">
        {chartType === "bar" && <Bar data={dataConfig} options={options} />}
        {chartType === "line" && <Line data={dataConfig} options={options} />}
        {chartType === "doughnut" && <Doughnut data={dataConfig} options={options} />}
      </div>
    </div>
  );
};

export default Charts;
