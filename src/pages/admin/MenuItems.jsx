import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "../../api/axios";

import {
  Utensils,
  Plus,
  Pencil,
  Trash2,
  CheckCircle,
  CircleX,
  LayoutList,
} from "lucide-react";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // =========================================================
  // FETCH MENU ITEMS
  // =========================================================

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const token = Cookies.get("token");

        const response = await api.get("/menu-items", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setMenuItems(response.data.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load menu items"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // =========================================================
  // DELETE MENU ITEM
  // =========================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this menu item?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      const token = Cookies.get("token");

      const response = await api.delete(`/menu-items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Menu item deleted successfully"
        );

        // Remove deleted item from UI
        setMenuItems((prev) =>
          prev.filter((item) => item._id !== id)
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete menu item"
      );
    } finally {
      setDeletingId(null);
    }
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
            Loading menu items...
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-[#FFFCF2] p-6 md:p-8">

      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

          <div>

            <div className="flex items-center gap-2 text-[#166534] mb-2">

              <LayoutList size={20} />

              <p className="font-bold tracking-widest text-sm uppercase">
                Restaurant Menu
              </p>

            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Menu Items
            </h1>

            <p className="text-gray-500 mt-2">
              Manage all dishes available at TastyBites.
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
            MENU SUMMARY
        ===================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

          {/* Total */}

          <div className="bg-white border border-[#E8E1D0] rounded-2xl p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center">

                <Utensils
                  size={22}
                  className="text-[#166534]"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500 font-medium">
                  Total Items
                </p>

                <p className="text-2xl font-extrabold text-gray-900">
                  {menuItems.length}
                </p>

              </div>

            </div>

          </div>


          {/* Available */}

          <div className="bg-white border border-[#E8E1D0] rounded-2xl p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center">

                <CheckCircle
                  size={22}
                  className="text-[#166534]"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500 font-medium">
                  Available
                </p>

                <p className="text-2xl font-extrabold text-[#166534]">
                  {
                    menuItems.filter(
                      (item) => item.availability === true
                    ).length
                  }
                </p>

              </div>

            </div>

          </div>


          {/* Unavailable */}

          <div className="bg-white border border-[#E8E1D0] rounded-2xl p-5 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">

                <CircleX
                  size={22}
                  className="text-red-500"
                />

              </div>

              <div>

                <p className="text-sm text-gray-500 font-medium">
                  Unavailable
                </p>

                <p className="text-2xl font-extrabold text-red-500">
                  {
                    menuItems.filter(
                      (item) => item.availability === false
                    ).length
                  }
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            MENU TABLE
        ===================================================== */}

        <div className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm overflow-hidden">

          {/* Table Header */}

          <div className="px-6 py-5 border-b border-[#E8E1D0]">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] flex items-center justify-center">

                <Utensils
                  size={20}
                  className="text-[#166534]"
                />

              </div>

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  All Menu Items
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  View and manage your restaurant dishes.
                </p>

              </div>

            </div>

          </div>


          {/* ===================================================
              TABLE
          =================================================== */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead>

                <tr className="bg-[#FFFCF2] border-b border-[#E8E1D0]">

                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Image
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Dish
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {menuItems.length === 0 ? (

                  <tr>

                    <td
                      colSpan="6"
                      className="py-16 text-center"
                    >

                      <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto">

                        <Utensils
                          size={28}
                          className="text-[#166534]"
                        />

                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mt-4">
                        No Menu Items Found
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Add your first dish to the TastyBites menu.
                      </p>

                      <Link
                        to="/admin/menu/create"
                        className="inline-flex items-center gap-2 mt-5 bg-[#166534] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#14532D] transition"
                      >
                        <Plus size={18} />
                        Add Menu Item
                      </Link>

                    </td>

                  </tr>

                ) : (

                  menuItems.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b border-[#F0EBDF] last:border-b-0 hover:bg-[#FFFCF2]/70 transition"
                    >

                      {/* =================================================
                          IMAGE
                      ================================================= */}

                      <td className="px-6 py-4">

                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-[#E8E1D0]">

                          {item.image?.url ? (

                            <img
                              src={item.image.url}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />

                          ) : (

                            <div className="w-full h-full flex items-center justify-center">

                              <Utensils
                                size={22}
                                className="text-gray-400"
                              />

                            </div>

                          )}

                        </div>

                      </td>


                      {/* =================================================
                          NAME
                      ================================================= */}

                      <td className="px-6 py-4">

                        <div className="max-w-xs">

                          <p className="font-bold text-gray-900">
                            {item.name}
                          </p>

                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {item.description}
                          </p>

                        </div>

                      </td>


                      {/* =================================================
                          CATEGORY
                      ================================================= */}

                      <td className="px-6 py-4">

                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#F3F7ED] text-[#166534] text-sm font-semibold">
                          {item.category}
                        </span>

                      </td>


                      {/* =================================================
                          PRICE
                      ================================================= */}

                      <td className="px-6 py-4">

                        <span className="font-extrabold text-gray-900">
                          ₹{item.price}
                        </span>

                      </td>


                      {/* =================================================
                          AVAILABILITY
                      ================================================= */}

                      <td className="px-6 py-4">

                        {item.availability ? (

                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ECFDF5] text-[#166534] text-sm font-bold">

                            <CheckCircle size={15} />

                            Available

                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-sm font-bold">

                            <CircleX size={15} />

                            Unavailable

                          </span>

                        )}

                      </td>


                      {/* =================================================
                          ACTIONS
                      ================================================= */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2">

                          {/* Edit */}

                          <Link
                            to={`/admin/menu/edit/${item._id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#ECFDF5] text-[#166534] rounded-lg text-sm font-semibold hover:bg-[#D9EAD3] transition"
                          >

                            <Pencil size={15} />

                            Edit

                          </Link>


                          {/* Delete */}

                          <button
                            onClick={() =>
                              handleDelete(item._id)
                            }
                            disabled={
                              deletingId === item._id
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >

                            <Trash2 size={15} />

                            {deletingId === item._id
                              ? "Deleting..."
                              : "Delete"}

                          </button>

                        </div>

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MenuItems;