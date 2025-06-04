import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./components/Context/AuthContext";

// Admin Components
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHome from "./components/Admin/AdminHome";
import ApplicantDashboard from "./components/Admin/ApplicantDashboard";
import AdminUserMang from "./components/Admin/AdminUserMang";
import AdminAnalytics from "./components/Admin/AdminAnalytics";

// User Components
import UserLayout from "./components/User/UserLayout";
import UserHome from "./components/User/UserHome";
import DailySales from './components/User/DailySales'
import SalesHistory from "./components/User/SalesHistory";
import Employee from './components/User/Employee'
import Products from './components/User/Products'
import Charts from './components/User/Charts'

// Pages
import IndexPage from "./components/index/IndexPage";
import Application from "./components/Application";
import Settings from './components/Settings/Settings'
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/apply" element={<Application />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="applications" element={<ApplicantDashboard />} />
          <Route path="settings" element={<Settings/>} />
          <Route path="users" element={<AdminUserMang/>} />
          <Route path="analytics" element={<AdminAnalytics/>} />
        </Route>

        {/* User Routes */}
        <Route
          path="/user"
          element={
            <PrivateRoute allowedRoles={["user"]}>
              <UserLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<UserHome />} />
          <Route path="dailysales" element={<DailySales />} />
          <Route path="saleshistory" element={<SalesHistory />} />
          <Route path="employee" element={<Employee />} />
          <Route path="products" element={<Products />} />
          <Route path="charts" element={<Charts />} />
          <Route path="settings" element={<Settings/>} />
        </Route>

        {/* Add a fallback */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
