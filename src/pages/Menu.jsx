import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../api/axios";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Menu;