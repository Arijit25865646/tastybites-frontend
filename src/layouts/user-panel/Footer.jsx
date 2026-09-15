import { Link } from "react-router-dom";
import {
  Utensils,
  House,
  Menu as MenuIcon,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#123B2A] text-white">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* ================= BRAND ================= */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >

              <div className="w-12 h-12 bg-[#F5EFD9] rounded-xl flex items-center justify-center">
                <Utensils
                  size={24}
                  className="text-[#166534]"
                />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold tracking-wide">
                  TASTY<span className="text-[#D9EAD3]">BITES</span>
                </h2>

                <p className="text-xs text-[#C9D8CC] tracking-[0.2em] uppercase">
                  Delicious & Fresh
                </p>
              </div>

            </Link>

            <p className="text-[#D5DED7] mt-6 leading-relaxed max-w-md">
              Delicious meals prepared with fresh ingredients
              and served with love. Experience great food,
              warm hospitality, and unforgettable flavors at
              TastyBites.
            </p>

          </div>


          {/* ================= QUICK LINKS ================= */}
          <div>

            <h3 className="text-lg font-bold mb-5 text-[#F5EFD9]">
              Quick Links
            </h3>

            <div className="space-y-3">

              <Link
                to="/"
                className="flex items-center gap-3 text-[#D5DED7] hover:text-[#F5EFD9] transition"
              >
                <House size={17} />
                Home
              </Link>

              <Link
                to="/menu"
                className="flex items-center gap-3 text-[#D5DED7] hover:text-[#F5EFD9] transition"
              >
                <MenuIcon size={17} />
                Menu
              </Link>

              <Link
                to="/login"
                className="flex items-center gap-3 text-[#D5DED7] hover:text-[#F5EFD9] transition"
              >
                <Utensils size={17} />
                Login
              </Link>

              <Link
                to="/register"
                className="flex items-center gap-3 text-[#D5DED7] hover:text-[#F5EFD9] transition"
              >
                <Utensils size={17} />
                Register
              </Link>

            </div>

          </div>


          {/* ================= CONTACT ================= */}
          <div>

            <h3 className="text-lg font-bold mb-5 text-[#F5EFD9]">
              Contact Us
            </h3>

            <div className="space-y-4">

              {/* Address */}
              <div className="flex items-start gap-3 text-[#D5DED7]">

                <MapPin
                  size={18}
                  className="text-[#D9EAD3] mt-1 shrink-0"
                />

                <span>
                  Kolkata, West Bengal
                </span>

              </div>


              {/* Phone */}
              <div className="flex items-center gap-3 text-[#D5DED7]">

                <Phone
                  size={18}
                  className="text-[#D9EAD3] shrink-0"
                />

                <span>
                  +91 98765 43210
                </span>

              </div>


              {/* Email */}
              <div className="flex items-start gap-3 text-[#D5DED7]">

                <Mail
                  size={18}
                  className="text-[#D9EAD3] mt-1 shrink-0"
                />

                <span className="break-all">
                  contact@tastybites.com
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-[#2B5744]">

        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-[#AFC2B5] text-sm text-center sm:text-left">
            © 2026 TastyBites. All rights reserved.
          </p>

          <p className="text-[#AFC2B5] text-sm flex items-center gap-1">

            Made with

            <Heart
              size={14}
              className="text-[#F5EFD9] fill-[#F5EFD9]"
            />

            for food lovers

          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;