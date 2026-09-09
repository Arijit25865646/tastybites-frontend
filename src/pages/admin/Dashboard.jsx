import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "../../api/axios";

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = Cookies.get("token");

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [menuResponse, usersResponse] = await Promise.all([
          api.get("/menu-items", config),
          api.get("/users", config),
        ]);

        if (menuResponse.data.success) {
          setMenuItems(menuResponse.data.data);
        }

        if (usersResponse.data.success) {
          setUsers(usersResponse.data.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const totalMenuItems = menuItems.length;

  const availableItems = menuItems.filter(
    (item) => item.availability === true
  ).length;

  const unavailableItems = menuItems.filter(
    (item) => item.availability === false
  ).length;

  const totalUsers = users.length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Welcome to the TastyBites admin dashboard.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Menu Items */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm font-medium">
            Total Menu Items
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            {totalMenuItems}
          </h2>
        </div>

        {/* Available Items */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm font-medium">
            Available Items
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {availableItems}
          </h2>
        </div>

        {/* Unavailable Items */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm font-medium">
            Unavailable Items
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {unavailableItems}
          </h2>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <p className="text-gray-500 text-sm font-medium">
            Total Users
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {totalUsers}
          </h2>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;