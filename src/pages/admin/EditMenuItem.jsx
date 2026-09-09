import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvailability = (e) => {
    setFormData((prev) => ({
      ...prev,
      availability: e.target.checked,
    }));
  };

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg font-semibold text-gray-600">
          Loading menu item...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Menu Item
        </h1>

        <p className="text-gray-600 mt-2">
          Update the information of this menu item.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm mt-8 p-6 md:p-8 max-w-4xl">
        <form onSubmit={handleSubmit}>

          {/* Name */}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Description */}
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
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none resize-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category + Price */}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none bg-white focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Category</option>

                <option value="Starter">Starter</option>

                <option value="Main Course">
                  Main Course
                </option>

                <option value="Dessert">Dessert</option>

                <option value="Beverage">Beverage</option>
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

              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

          </div>

          {/* Image */}
          <div className="mt-6">
            <label
              htmlFor="image"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Update Image
            </label>

            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">
                  Image Preview
                </p>

                <img
                  src={imagePreview}
                  alt={formData.name}
                  className="w-40 h-40 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="mt-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.availability}
                onChange={handleAvailability}
                className="w-5 h-5 accent-red-600"
              />

              <span className="text-sm font-semibold text-gray-700">
                Item is available
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-8">

            <button
              type="submit"
              disabled={updating}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {updating ? "Updating..." : "Update Menu Item"}
            </button>

            <Link
              to="/admin/menu"
              className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Cancel
            </Link>

          </div>

        </form>
      </div>
    </div>
  );
};

export default EditMenuItem;