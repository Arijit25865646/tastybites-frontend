import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  ArrowLeft,
  ImagePlus,
  Plus,
  Utensils,
} from "lucide-react";
import api from "../../api/axios";

const CreateMenuItem = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    availability: true,
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE AVAILABILITY =================
  const handleAvailability = (e) => {
    setFormData((prev) => ({
      ...prev,
      availability: e.target.checked,
    }));
  };

  // ================= HANDLE IMAGE =================
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.category ||
      !formData.price
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!formData.image) {
      toast.error("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const token = Cookies.get("token");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("availability", formData.availability);
      data.append("image", formData.image);

      const response = await api.post("/menu-items", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Menu item created successfully"
        );

        setFormData({
          name: "",
          description: "",
          category: "",
          price: "",
          availability: true,
          image: null,
        });

        setImagePreview(null);

        navigate("/admin/menu");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create menu item"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFCF2]">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}
      <div className="mb-8">

        <button
          onClick={() => navigate("/admin/menu")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#166534] font-semibold transition mb-5"
        >
          <ArrowLeft size={18} />
          Back to Menu Items
        </button>

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
            <Plus
              size={25}
              className="text-[#166534]"
            />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Add Menu Item
            </h1>

            <p className="text-gray-600 mt-1">
              Add a new delicious item to the TastyBites menu.
            </p>
          </div>

        </div>
      </div>


      {/* =====================================================
          FORM CARD
      ===================================================== */}
      <div className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm p-6 md:p-8 max-w-4xl">

        <form onSubmit={handleSubmit}>

          {/* ================= NAME ================= */}
          <div>

            <label
              htmlFor="name"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Menu Item Name
            </label>

            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Chicken Biryani"
              className="w-full px-4 py-3 border border-[#D9D2C2] rounded-xl outline-none bg-[#FFFCF2] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534] transition"
            />

          </div>


          {/* ================= DESCRIPTION ================= */}
          <div className="mt-6">

            <label
              htmlFor="description"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the dish, ingredients and taste..."
              rows="5"
              className="w-full px-4 py-3 border border-[#D9D2C2] rounded-xl outline-none resize-none bg-[#FFFCF2] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534] transition"
            />

          </div>


          {/* =================================================
              CATEGORY + PRICE
          ================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

            {/* Category */}
            <div>

              <label
                htmlFor="category"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-[#D9D2C2] rounded-xl outline-none bg-[#FFFCF2] text-gray-900 focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534] transition"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Starter">
                  Starter
                </option>

                <option value="Main Course">
                  Main Course
                </option>

                <option value="Dessert">
                  Dessert
                </option>

                <option value="Beverage">
                  Beverage
                </option>
              </select>

            </div>


            {/* Price */}
            <div>

              <label
                htmlFor="price"
                className="block text-sm font-bold text-gray-700 mb-2"
              >
                Price
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#166534] font-bold">
                  ₹
                </span>

                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  className="w-full pl-9 pr-4 py-3 border border-[#D9D2C2] rounded-xl outline-none bg-[#FFFCF2] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534] transition"
                />

              </div>

            </div>

          </div>


          {/* =================================================
              IMAGE
          ================================================= */}
          <div className="mt-6">

            <label
              htmlFor="image"
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Food Image
            </label>

            <div className="border-2 border-dashed border-[#D9D2C2] rounded-2xl p-6 bg-[#FFFCF2] hover:border-[#166534]/50 transition">

              <div className="flex flex-col items-center justify-center text-center">

                <div className="w-14 h-14 rounded-full bg-[#ECFDF5] flex items-center justify-center">

                  <ImagePlus
                    size={27}
                    className="text-[#166534]"
                  />

                </div>

                <p className="font-semibold text-gray-800 mt-3">
                  Upload food image
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  JPG, PNG or other image formats
                </p>

                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-5 w-full max-w-sm text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#166534] file:text-white file:font-semibold hover:file:bg-[#14532D] file:cursor-pointer"
                />

              </div>

            </div>


            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-5">

                <p className="text-sm font-semibold text-gray-600 mb-2">
                  Image Preview
                </p>

                <div className="relative w-48 h-48 rounded-2xl overflow-hidden border border-[#E8E1D0] shadow-sm">

                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />

                </div>

              </div>
            )}

          </div>


          {/* =================================================
              AVAILABILITY
          ================================================= */}
          <div className="mt-6 p-4 rounded-xl bg-[#F3F7ED] border border-[#D9EAD3]">

            <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                checked={formData.availability}
                onChange={handleAvailability}
                className="w-5 h-5 accent-[#166534]"
              />

              <div>

                <p className="font-bold text-gray-800">
                  Item is available
                </p>

                <p className="text-sm text-gray-500 mt-0.5">
                  Customers can see and order this item.
                </p>

              </div>

            </label>

          </div>


          {/* =================================================
              BUTTONS
          ================================================= */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">

            {/* Cancel */}
            <button
              type="button"
              onClick={() => navigate("/admin/menu")}
              className="sm:w-auto px-6 py-3 rounded-xl border border-[#166534] text-[#166534] font-semibold hover:bg-[#ECFDF5] transition"
            >
              Cancel
            </button>


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="sm:w-auto inline-flex items-center justify-center gap-2 bg-[#166534] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >

              <Utensils size={18} />

              {loading
                ? "Adding..."
                : "Add Menu Item"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateMenuItem;