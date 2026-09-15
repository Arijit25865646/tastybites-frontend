import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/axios";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Utensils,
} from "lucide-react";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            Create Account
          </h1>

          <p className="text-gray-600 mt-2">
            Join the TastyBites family
          </p>

        </div>


        {/* Register Card */}
        <div className="bg-white rounded-3xl border border-[#E8E1D0] shadow-lg p-7 md:p-9">

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-5">

              <label className="block text-gray-800 font-semibold mb-2">
                Name
              </label>

              <div className="relative">

                <User
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`w-full pl-11 pr-4 py-3.5 bg-[#FFFCF7] border rounded-xl outline-none transition ${
                    error.name
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-[#E8E1D0] focus:border-[#166534] focus:ring-2 focus:ring-green-100"
                  }`}
                />

              </div>

              {error.name && (
                <p className="text-red-500 text-sm mt-1.5">
                  {error.name}
                </p>
              )}

            </div>


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
            <div className="mb-5">

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
                  placeholder="Create a password"
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


            {/* Confirm Password */}
            <div className="mb-7">

              <label className="block text-gray-800 font-semibold mb-2">
                Confirm Password
              </label>

              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className={`w-full pl-11 pr-12 py-3.5 bg-[#FFFCF7] border rounded-xl outline-none transition ${
                    error.confirmPassword
                      ? "border-red-500 focus:ring-2 focus:ring-red-100"
                      : "border-[#E8E1D0] focus:border-[#166534] focus:ring-2 focus:ring-green-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#166534] transition"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

              {error.confirmPassword && (
                <p className="text-red-500 text-sm mt-1.5">
                  {error.confirmPassword}
                </p>
              )}

            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#166534] text-white py-3.5 rounded-xl font-bold hover:bg-[#14532D] transition shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <UserPlus size={19} />

              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>


          {/* Login */}
          <p className="text-center text-gray-600 mt-7">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-[#166534] font-bold hover:text-[#14532D] transition"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Register;