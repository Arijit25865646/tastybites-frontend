import { Routes, Route } from "react-router-dom";

import UserWrapper from "../layouts/user-panel/UserWrapper";
import AdminWrapper from "../layouts/admin-panel/AdminWrapper";
import AdminProtected from "../components/AdminProtected";

// ================= USER PAGES =================

import Home from "../pages/Home";
import Menu from "../pages/Menu";
import MenuDetails from "../pages/MenuDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import OrderSuccess from "../pages/OrderSuccess";
import Orders from "../pages/Orders";

// ================= ADMIN PAGES =================

import Dashboard from "../pages/admin/Dashboard";
import MenuItems from "../pages/admin/MenuItems";
import CreateMenuItem from "../pages/admin/CreateMenuItem";
import EditMenuItem from "../pages/admin/EditMenuItem";
import Users from "../pages/admin/Users";
import AdminOrders from "../pages/admin/Orders";

const AppRoutes = () => {
  return (
    <Routes>
      {/* =====================================================
          USER ROUTES
      ===================================================== */}

      <Route element={<UserWrapper />}>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Menu */}
        <Route path="/menu" element={<Menu />} />

        {/* Menu Details */}
        <Route path="/menu/:id" element={<MenuDetails />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />

        {/* Wishlist */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Checkout */}
        <Route path="/checkout" element={<Checkout />} />

        {/* Order Success */}
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* My Orders */}
        <Route path="/orders" element={<Orders />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />
      </Route>

      {/* =====================================================
          ADMIN ROUTES
      ===================================================== */}

      <Route element={<AdminProtected />}>
        <Route element={<AdminWrapper />}>
          {/* Dashboard */}
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* Menu Items */}
          <Route path="/admin/menu" element={<MenuItems />} />

          {/* Create Menu Item */}
          <Route path="/admin/menu/create" element={<CreateMenuItem />} />

          {/* Edit Menu Item */}
          <Route path="/admin/menu/edit/:id" element={<EditMenuItem />} />

          {/* Orders */}
          <Route path="/admin/orders" element={<AdminOrders />} />

          {/* Users */}
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
