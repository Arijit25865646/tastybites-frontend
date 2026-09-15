import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "../api/axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Utensils,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#FFFCF2] flex items-center justify-center px-6 py-14">

      <div className="w-full max-w-md">

        {/* Branding */}
        <div className="text-center mb-8">

          <div className="w-14 h-14 bg-[#166534] rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <Utensils
              size={28}
              className="text-white"
            />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mt-5">
            Welcome Back
          </h1>

          <p className="text-gray-600 mt-2">
            Login to your TastyBites account
          </p>

        </div>


        {/* Login Card */}
        <div className="bg-white rounded-3xl border border-[#E8E1D0] shadow-lg p-7 md:p-9">

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-5">

              <label className="block text-gray-800 font-semibold mb-2">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-11 pr-4 py-3.5 bg-[#FFFCF7] border rounded-xl outline-none transition ${
                    error.email
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-[#E8E1D0] focus:border-[#166534] focus:ring-2 focus:ring-green-100"
                  }`}
                />

              </div>

              {error.email && (
                <p className="text-red-500 text-sm mt-1.5">
                  {error.email}
                </p>
              )}

            </div>


            {/* Password */}
            <div className="mb-7">

              <label className="block text-gray-800 font-semibold mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-11 pr-12 py-3.5 bg-[#FFFCF7] border rounded-xl outline-none transition ${
                    error.password
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-[#E8E1D0] focus:border-[#166534] focus:ring-2 focus:ring-green-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#166534] transition"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

              {error.password && (
                <p className="text-red-500 text-sm mt-1.5">
                  {error.password}
                </p>
              )}

            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#166534] text-white py-3.5 rounded-xl font-bold hover:bg-[#14532D] transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <LogIn size={19} />

              {loading ? "Logging in..." : "Login"}
            </button>

          </form>


          {/* Register */}
          <p className="text-center text-gray-600 mt-7">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-[#166534] font-bold hover:text-[#14532D] transition"
            >
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;