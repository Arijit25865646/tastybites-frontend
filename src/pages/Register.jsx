import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const data = response.data;

      if (data.success) {
        toast.success(data.message);

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-orange-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Account
          </h1>

          <p className="text-gray-600 mt-2">
            Register for your TastyBites account
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 ${
                error.name ? "border-red-500" : "border-gray-300"
              }`}
            />

            {error.name && (
              <p className="text-red-500 text-sm mt-1">
                {error.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 ${
                error.email ? "border-red-500" : "border-gray-300"
              }`}
            />

            {error.email && (
              <p className="text-red-500 text-sm mt-1">
                {error.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 ${
                error.password ? "border-red-500" : "border-gray-300"
              }`}
            />

            {error.password && (
              <p className="text-red-500 text-sm mt-1">
                {error.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={`w-full px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-red-500 ${
                error.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />

            {error.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {error.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-600 font-semibold hover:text-red-700"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;