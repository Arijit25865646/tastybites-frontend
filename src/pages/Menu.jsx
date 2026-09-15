import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../api/axios";
import MenuCard from "../components/MenuCard";
import {
  Utensils,
  Soup,
  CakeSlice,
  Coffee,
  LayoutGrid,
  Search,
  X,
} from "lucide-react";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Category state
  const [category, setCategory] = useState("All");

  // Search state
  const [search, setSearch] = useState("");

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
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-[#D9EAD3] border-t-[#166534] rounded-full animate-spin mx-auto" />

          <p className="text-lg font-semibold text-gray-700 mt-4">
            Loading menu...
          </p>

        </div>
      </div>
    );
  }

  if (menuItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFFCF2] flex items-center justify-center">

        <div className="text-center">

          <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto">
            <Utensils
              size={30}
              className="text-[#166534]"
            />
          </div>

          <p className="text-lg text-gray-500 mt-4">
            No menu items available.
          </p>

        </div>

      </div>
    );
  }

  const categories = [
    {
      name: "All",
      icon: LayoutGrid,
    },
    {
      name: "Starter",
      icon: Soup,
    },
    {
      name: "Main Course",
      icon: Utensils,
    },
    {
      name: "Dessert",
      icon: CakeSlice,
    },
    {
      name: "Beverage",
      icon: Coffee,
    },
  ];

  // Filter menu items based on category and search
  const filteredItems = menuItems.filter((item) => {

    const matchesCategory =
      category === "All" || item.category === category;

    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      !searchText ||
      item.name.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  // Clear search
  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#FFFCF2] px-6 py-12">

      <div className="max-w-7xl mx-auto">

        {/* ================= PAGE HEADER ================= */}
        <div className="text-center mb-10">

          <p className="text-[#166534] font-bold tracking-widest text-sm uppercase">
            TastyBites
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2">
            Our Menu
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
            Explore our delicious selection of dishes and beverages,
            prepared with fresh ingredients and plenty of love.
          </p>

        </div>


        {/* ================= SEARCH ================= */}
        <div className="max-w-2xl mx-auto mb-10">

          <div className="relative">

            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a dish..."
              className="w-full pl-12 pr-12 py-3.5 bg-white border border-[#E8E1D0] rounded-xl outline-none text-gray-800 placeholder:text-gray-400 focus:border-[#166534] focus:ring-2 focus:ring-green-100 transition"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#166534] transition"
              >
                <X size={20} />
              </button>
            )}

          </div>

        </div>


        {/* ================= CATEGORY SELECTION ================= */}
        <div className="mb-12">

          <div className="flex items-center justify-center gap-2 mb-5">

            <Utensils
              size={19}
              className="text-[#166534]"
            />

            <p className="text-lg font-bold text-gray-800">
              Select Category
            </p>

          </div>


          <div className="flex flex-wrap justify-center gap-3">

            {categories.map((item) => {

              const Icon = item.icon;

              const isActive = category === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => setCategory(item.name)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#166534] text-white shadow-md shadow-green-900/10"
                      : "bg-white text-gray-700 border border-[#E8E1D0] hover:border-[#166534] hover:text-[#166534] hover:bg-[#F5FAF2]"
                  }`}
                >
                  <Icon size={18} />

                  {item.name}
                </button>
              );
            })}

          </div>

        </div>


        {/* ================= RESULT INFO ================= */}
        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-xl font-bold text-gray-900">

              {search
                ? `Search Results`
                : category === "All"
                ? "All Dishes"
                : category}

            </h2>

            <p className="text-sm text-gray-500 mt-1">

              {filteredItems.length}{" "}

              {filteredItems.length === 1
                ? "item"
                : "items"}{" "}

              available

            </p>

          </div>

        </div>


        {/* ================= MENU ITEMS ================= */}
        {filteredItems.length === 0 ? (

          <div className="bg-white border border-[#E8E1D0] rounded-2xl py-16 text-center">

            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto">

              <Search
                size={28}
                className="text-[#166534]"
              />

            </div>

            <p className="text-lg font-semibold text-gray-700 mt-5">
              No dishes found
            </p>

            <p className="text-gray-500 mt-2">
              Try a different search or category.
            </p>

            {(search || category !== "All") && (
              <button
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-5 inline-flex items-center gap-2 bg-[#166534] text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-[#14532D] transition"
              >
                <X size={17} />
                Clear Filters
              </button>
            )}

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

            {filteredItems.map((item) => (
              <MenuCard
                key={item._id}
                item={item}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Menu;