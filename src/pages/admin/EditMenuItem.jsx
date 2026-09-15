import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import api from "../../api/axios";

const EditMenuItem = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ================= FETCH MENU ITEM =================
  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const response = await api.get(`/menu-items/${id}`);

        if (response.data.success) {
          const item = response.data.data;

          setFormData({
            name: item.name,
            description: item.description,
            category: item.category,
            price: item.price,
            availability: item.availability,
            image: null,
          });

          setImagePreview(item.image?.url || null);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load menu item"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [id]);

  // ================= HANDLE INPUT =================
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

  // ================= UPDATE MENU ITEM =================
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

    try {
      setUpdating(true);

      const token = Cookies.get("token");

      const data = new FormData();

      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("availability", formData.availability);

      // Only send image if a new image was selected
      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await api.put(`/menu-items/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "Menu item updated successfully"
        );

        navigate("/admin/menu");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update menu item"
      );
    } finally {
      setUpdating(false);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D9EAD3] border-t-[#166534] rounded-full animate-spin mx-auto" />

          <p className="text-lg font-semibold text-gray-600 mt-4">
            Loading menu item...
          </p>
        </div>
      </div>
    );
  }

  // ================= PAGE =================
  return (
    <div className="min-h-screen bg-[#FFFCF2]">

      <div className="max-w-5xl mx-auto">

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-8">

          <Link
            to="/admin/menu"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#166534] font-semibold transition mb-5"
          >
            <ArrowLeft size={18} />
            Back to Menu Items
          </Link>

          <p className="text-[#166534] font-bold tracking-widest text-sm uppercase">
            TastyBites Admin
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            Edit Menu Item
          </h1>

          <p className="text-gray-600 mt-2">
            Update the information of this menu item.
          </p>

        </div>


        {/* ================= FORM CARD ================= */}
        <div className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm p-6 md:p-8">

          <form onSubmit={handleSubmit}>

            {/* ================= NAME ================= */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Name
              </label>

              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter menu item name"
                className="w-full px-4 py-3 border border-[#E8E1D0] rounded-xl outline-none bg-[#FFFCF2] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534] transition"
              />
            </div>


            {/* ================= DESCRIPTION ================= */}
            <div className="mt-6">

              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter menu item description"
                rows="5"
                className="w-full px-4 py-3 border border-[#E8E1D0] rounded-xl outline-none resize-none bg-[#FFFCF2] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534] transition"
              />

            </div>


            {/* ================= CATEGORY + PRICE ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

              {/* Category */}
              <div>

                <label
                  htmlFor="category"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-[#E8E1D0] rounded-xl outline-none bg-[#FFFCF2] text-gray-900 focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534] transition"
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
                  className="block text-sm font-semibold text-gray-700 mb-2"
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
                    className="w-full pl-9 pr-4 py-3 border border-[#E8E1D0] rounded-xl outline-none bg-[#FFFCF2] text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-[#166534]/20 focus:border-[#166534] transition"
                  />

                </div>

              </div>

            </div>


            {/* ================= IMAGE ================= */}
            <div className="mt-6">

              <label
                htmlFor="image"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Update Image
              </label>

              <div className="border-2 border-dashed border-[#E8E1D0] rounded-xl p-5 bg-[#FFFCF2]">

                <div className="flex flex-col md:flex-row md:items-center gap-5">

                  {/* Preview */}
                  {imagePreview ? (
                    <div className="shrink-0">

                      <img
                        src={imagePreview}
                        alt={formData.name}
                        className="w-32 h-32 object-cover rounded-xl border border-[#E8E1D0] shadow-sm"
                      />

                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-xl bg-[#ECFDF5] flex items-center justify-center shrink-0">

                      <ImageIcon
                        size={35}
                        className="text-[#166534]"
                      />

                    </div>
                  )}


                  {/* File Input */}
                  <div className="flex-1">

                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-3 border border-[#E8E1D0] rounded-xl bg-white text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#166534] file:text-white file:font-semibold hover:file:bg-[#14532D] file:cursor-pointer"
                    />

                    <p className="text-xs text-gray-500 mt-2">
                      Select a new image only if you want to replace the current image.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* ================= AVAILABILITY ================= */}
            <div className="mt-6">

              <div className="bg-[#F3F7ED] border border-[#D9EAD3] rounded-xl px-5 py-4">

                <label className="flex items-center gap-3 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={formData.availability}
                    onChange={handleAvailability}
                    className="w-5 h-5 accent-[#166534] cursor-pointer"
                  />

                  <div>

                    <p className="text-sm font-bold text-gray-800">
                      Item is available
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Customers can order this item when it is available.
                    </p>

                  </div>

                </label>

              </div>

            </div>


            {/* ================= BUTTONS ================= */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 pt-6 border-t border-[#E8E1D0]">

              {/* Update */}
              <button
                type="submit"
                disabled={updating}
                className="inline-flex items-center justify-center gap-2 bg-[#166534] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#14532D] transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >

                <Save size={18} />

                {updating
                  ? "Updating..."
                  : "Update Menu Item"}

              </button>


              {/* Cancel */}
              <Link
                to="/admin/menu"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#F3F4F6] text-gray-700 font-semibold hover:bg-gray-200 transition"
              >
                Cancel
              </Link>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditMenuItem;