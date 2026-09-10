import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../api/axios";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category state
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await api.get("/menu-items");

        if (response.data.success) {
          setMenuItems(response.data.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to load menu items"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading menu...</p>
      </div>
    );
  }

  if (menuItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">
          No menu items available.
        </p>
      </div>
    );
  }

  // Filter menu items based on selected category
  const filteredItems =
    category === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === category);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Our Menu
          </h1>

          <p className="text-gray-600 mt-2">
            Explore our delicious food and beverages
          </p>
        </div>

        {/* Category Selection */}
<div className="mb-8">
  <p className="text-lg font-semibold text-gray-800 mb-4 text-center">
    Select Category
  </p>

  <div className="flex flex-wrap justify-center gap-3">
    <button
      onClick={() => setCategory("All")}
      className={`px-5 py-2 rounded-lg font-semibold transition ${
        category === "All"
          ? "bg-red-600 text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-red-50"
      }`}
    >
      All
    </button>

    <button
      onClick={() => setCategory("Starter")}
      className={`px-5 py-2 rounded-lg font-semibold transition ${
        category === "Starter"
          ? "bg-red-600 text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-red-50"
      }`}
    >
      Starter
    </button>

    <button
      onClick={() => setCategory("Main Course")}
      className={`px-5 py-2 rounded-lg font-semibold transition ${
        category === "Main Course"
          ? "bg-red-600 text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-red-50"
      }`}
    >
      Main Course
    </button>

    <button
      onClick={() => setCategory("Dessert")}
      className={`px-5 py-2 rounded-lg font-semibold transition ${
        category === "Dessert"
          ? "bg-red-600 text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-red-50"
      }`}
    >
      Dessert
    </button>

    <button
      onClick={() => setCategory("Beverage")}
      className={`px-5 py-2 rounded-lg font-semibold transition ${
        category === "Beverage"
          ? "bg-red-600 text-white"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-red-50"
      }`}
    >
      Beverage
    </button>
  </div>
</div>

        {/* Filtered Menu Items */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-500">
              No items available in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item._id} item={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;