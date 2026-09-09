import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      const data = response.data;

      if (data.success) {
        // Store authentication information
        Cookies.set("token", data.token);
        Cookies.set("role", data.user.role);
        Cookies.set("user", JSON.stringify(data.user));

        toast.success(data.message);

        // Redirect according to user's role
        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
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
            Welcome Back
          </h1>

          <p className="text-gray-600 mt-2">
            Login to your TastyBites account
          </p>
        </div>

        <form onSubmit={handleSubmit}>

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
          <div className="mb-6">
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

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-red-600 font-semibold hover:text-red-700"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;