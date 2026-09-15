import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "../../api/axios";

import {
  Utensils,
  Users,
  CheckCircle,
  CircleX,
  Plus,
  ArrowRight,
  LayoutDashboard,
} from "lucide-react";

const Dashboard = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // FETCH DASHBOARD DATA
  // =========================================================

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

  // =========================================================
  // STATISTICS
  // =========================================================

  const totalMenuItems = menuItems.length;

  const availableItems = menuItems.filter(
    (item) => item.availability === true
  ).length;

  const unavailableItems = menuItems.filter(
    (item) => item.availability === false
  ).length;

  const totalUsers = users.length;

  // =========================================================
  // CATEGORY COUNT
  // =========================================================

  const categories = [
    "Starter",
    "Main Course",
    "Dessert",
    "Beverage",
  ];

  const getCategoryCount = (category) => {
    return menuItems.filter(
      (item) => item.category === category
    ).length;
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#FFFCF2] flex items-center justify-center">

        <div className="text-center">

          <div className="w-12 h-12 border-4 border-[#D9EAD3] border-t-[#166534] rounded-full animate-spin mx-auto" />

          <p className="text-lg font-semibold text-gray-700 mt-4">
            Loading dashboard...
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // DASHBOARD
  // =========================================================

  return (
    <div className="min-h-screen bg-[#FFFCF2] p-6 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>

            <div className="flex items-center gap-2 text-[#166534] mb-2">

              <LayoutDashboard size={20} />

              <p className="font-bold tracking-widest text-sm uppercase">
                TastyBites Admin
              </p>

            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Dashboard
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your restaurant from one place.
            </p>

          </div>


          {/* Add Menu Item */}

          <Link
            to="/admin/menu/create"
            className="inline-flex items-center justify-center gap-2 bg-[#166534] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition shadow-md"
          >
            <Plus size={19} />

            Add Menu Item
          </Link>

        </div>


        {/* =====================================================
            STATISTICS
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Total Menu Items */}

          <div className="bg-white border border-[#E8E1D0] rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center">

                <Utensils
                  size={24}
                  className="text-[#166534]"
                />

              </div>

              <span className="text-xs font-semibold text-gray-400 uppercase">
                Menu
              </span>

            </div>

            <p className="text-gray-500 text-sm font-medium mt-5">
              Total Menu Items
            </p>

            <h2 className="text-3xl font-extrabold text-gray-900 mt-1">
              {totalMenuItems}
            </h2>

          </div>


          {/* Available Items */}

          <div className="bg-white border border-[#E8E1D0] rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center">

                <CheckCircle
                  size={24}
                  className="text-[#166534]"
                />

              </div>

              <span className="text-xs font-semibold text-gray-400 uppercase">
                Available
              </span>

            </div>

            <p className="text-gray-500 text-sm font-medium mt-5">
              Available Dishes
            </p>

            <h2 className="text-3xl font-extrabold text-[#166534] mt-1">
              {availableItems}
            </h2>

          </div>


          {/* Unavailable Items */}

          <div className="bg-white border border-[#E8E1D0] rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">

                <CircleX
                  size={24}
                  className="text-red-500"
                />

              </div>

              <span className="text-xs font-semibold text-gray-400 uppercase">
                Unavailable
              </span>

            </div>

            <p className="text-gray-500 text-sm font-medium mt-5">
              Unavailable Dishes
            </p>

            <h2 className="text-3xl font-extrabold text-red-500 mt-1">
              {unavailableItems}
            </h2>

          </div>


          {/* Total Users */}

          <div className="bg-white border border-[#E8E1D0] rounded-2xl p-6 shadow-sm hover:shadow-md transition">

            <div className="flex items-center justify-between">

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">

                <Users
                  size={24}
                  className="text-blue-600"
                />

              </div>

              <span className="text-xs font-semibold text-gray-400 uppercase">
                Users
              </span>

            </div>

            <p className="text-gray-500 text-sm font-medium mt-5">
              Total Users
            </p>

            <h2 className="text-3xl font-extrabold text-blue-600 mt-1">
              {totalUsers}
            </h2>

          </div>

        </div>


        {/* =====================================================
            LOWER SECTION
        ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


          {/* =================================================
              MENU CATEGORIES
          ================================================= */}

          <div className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Menu Categories
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Overview of your dishes by category.
                </p>

              </div>

              <Utensils
                size={22}
                className="text-[#166534]"
              />

            </div>


            <div className="space-y-4">

              {categories.map((category) => {

                const count = getCategoryCount(category);

                return (
                  <div
                    key={category}
                    className="flex items-center justify-between p-4 rounded-xl bg-[#FFFCF2] border border-[#E8E1D0]"
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-[#ECFDF5] flex items-center justify-center">

                        <Utensils
                          size={17}
                          className="text-[#166534]"
                        />

                      </div>

                      <span className="font-semibold text-gray-800">
                        {category}
                      </span>

                    </div>


                    <span className="px-3 py-1 rounded-full bg-[#166534] text-white text-sm font-bold">
                      {count}
                    </span>

                  </div>
                );

              })}

            </div>

          </div>


          {/* =================================================
              RECENT USERS
          ================================================= */}

          <div className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  Recent Users
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Recently registered users.
                </p>

              </div>

              <Users
                size={22}
                className="text-blue-600"
              />

            </div>


            {users.length === 0 ? (

              <div className="py-10 text-center">

                <Users
                  size={32}
                  className="text-gray-300 mx-auto"
                />

                <p className="text-gray-500 mt-3">
                  No users found.
                </p>

              </div>

            ) : (

              <div className="space-y-3">

                {users.slice(0, 5).map((user) => (

                  <div
                    key={user._id || user.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#FFFCF2] transition"
                  >

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center font-bold uppercase">
                        {user.name?.charAt(0) || "U"}
                      </div>

                      <div>

                        <p className="font-semibold text-gray-900">
                          {user.name}
                        </p>

                        <p className="text-sm text-gray-500">
                          {user.email}
                        </p>

                      </div>

                    </div>


                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        user.role === "admin"
                          ? "bg-[#ECFDF5] text-[#166534]"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.role || "user"}
                    </span>

                  </div>

                ))}

              </div>

            )}


            {/* View Users */}

            {users.length > 0 && (
              <Link
                to="/admin/users"
                className="flex items-center justify-center gap-2 mt-5 pt-5 border-t border-[#E8E1D0] text-[#166534] font-semibold hover:text-[#14532D] transition"
              >
                View All Users

                <ArrowRight size={17} />
              </Link>
            )}

          </div>

        </div>


        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <div className="mt-8">

          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Actions
          </h2>


          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {/* Manage Menu */}

            <Link
              to="/admin/menu"
              className="group bg-white border border-[#E8E1D0] rounded-2xl p-6 hover:border-[#166534]/30 hover:shadow-lg transition"
            >

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center group-hover:bg-[#166534] transition">

                  <Utensils
                    size={23}
                    className="text-[#166534] group-hover:text-white transition"
                  />

                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-300 group-hover:text-[#166534] transition"
                />

              </div>

              <h3 className="text-lg font-bold text-gray-900 mt-5">
                Manage Menu
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Add, edit or remove dishes from your menu.
              </p>

            </Link>


            {/* Manage Users */}

            <Link
              to="/admin/users"
              className="group bg-white border border-[#E8E1D0] rounded-2xl p-6 hover:border-blue-200 hover:shadow-lg transition"
            >

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">

                  <Users
                    size={23}
                    className="text-blue-600"
                  />

                </div>

                <ArrowRight
                  size={20}
                  className="text-gray-300 group-hover:text-blue-600 transition"
                />

              </div>

              <h3 className="text-lg font-bold text-gray-900 mt-5">
                Manage Users
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                View and manage registered TastyBites users.
              </p>

            </Link>


            {/* Add Menu Item */}

            <Link
              to="/admin/menu/create"
              className="group bg-[#166534] rounded-2xl p-6 hover:bg-[#14532D] hover:shadow-lg transition"
            >

              <div className="flex items-center justify-between">

                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">

                  <Plus
                    size={23}
                    className="text-white"
                  />

                </div>

                <ArrowRight
                  size={20}
                  className="text-white/60 group-hover:text-white transition"
                />

              </div>

              <h3 className="text-lg font-bold text-white mt-5">
                Add New Dish
              </h3>

              <p className="text-sm text-white/70 mt-2">
                Add a new delicious item to the restaurant menu.
              </p>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;