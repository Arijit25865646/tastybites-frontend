import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "../../api/axios";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

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

  // Delete Menu Item
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg font-semibold text-gray-600">
          Loading menu items...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Menu Items
          </h1>

          <p className="text-gray-600 mt-2">
            Manage all menu items in TastyBites.
          </p>
        </div>

        <Link
          to="/admin/menu/create"
          className="bg-red-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          + Add Menu Item
        </Link>
      </div>

      {/* Menu Items Table */}
      <div className="bg-white rounded-xl shadow-sm mt-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Image
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Name
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Category
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Price
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Availability
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {menuItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500"
                  >
                    No menu items found.
                  </td>
                </tr>
              ) : (
                menuItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-gray-100"
                  >
                    {/* Image */}
                    <td className="px-6 py-4">
                      <img
                        src={item.image?.url}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500 mt-1 max-w-xs truncate">
                        {item.description}
                      </p>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-gray-600">
                      {item.category}
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      ₹{item.price}
                    </td>

                    {/* Availability */}
                    <td className="px-6 py-4">
                      {item.availability ? (
                        <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          Available
                        </span>
                      ) : (
                        <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                          Unavailable
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">

                        <Link
                          to={`/admin/menu/edit/${item._id}`}
                          className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={deletingId === item._id}
                          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
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
  );
};

export default MenuItems;