import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "../api/axios";

const MenuDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    // Check if user is logged in
    if (!token) {
      toast.error("Please login to view menu details");
      navigate("/login");
      return;
    }

    const fetchMenuItem = async () => {
      try {
        const response = await api.get(`/menu-items/${id}`);

        if (response.data.success) {
          setMenuItem(response.data.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load menu item"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!menuItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-xl font-semibold text-gray-700">
          Menu item not found
        </p>

        <Link
          to="/menu"
          className="mt-4 bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-2">

          {/* Image */}
          <div className="h-96">
            <img
              src={menuItem.image?.url}
              alt={menuItem.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col justify-center">

            <p className="text-red-600 font-semibold mb-2">
              {menuItem.category}
            </p>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {menuItem.name}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {menuItem.description}
            </p>

            <div className="flex items-center justify-between mb-6">
              <span className="text-3xl font-bold text-red-600">
                ₹{menuItem.price}
              </span>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  menuItem.availability
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {menuItem.availability ? "Available" : "Unavailable"}
              </span>
            </div>

            <Link
              to="/menu"
              className="w-full text-center bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Back to Menu
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;