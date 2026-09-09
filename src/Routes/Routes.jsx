import { Routes, Route } from "react-router-dom";

import UserWrapper from "../layouts/user-panel/UserWrapper";
import AdminWrapper from "../layouts/admin-panel/AdminWrapper";
import AdminProtected from "../components/AdminProtected";

import Home from "../pages/Home";
import Menu from "../pages/Menu";
import MenuDetails from "../pages/MenuDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/admin/Dashboard";
import MenuItems from "../pages/admin/MenuItems";
import CreateMenuItem from "../pages/admin/CreateMenuItem";
import EditMenuItem from "../pages/admin/EditMenuItem";
import Users from "../pages/admin/Users";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= USER ROUTES ================= */}
      <Route element={<UserWrapper />}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<MenuDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>


      {/* ================= ADMIN ROUTES ================= */}
      <Route element={<AdminProtected />}>
        <Route element={<AdminWrapper />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/menu" element={<MenuItems />} />
          <Route path="/admin/menu/create" element={<CreateMenuItem />} />
          <Route path="/admin/menu/edit/:id" element={<EditMenuItem />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>
      </Route>

    </Routes>
  );
};

export default AppRoutes;