import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const AdminProtected = () => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const isAdmin = Boolean(token) && role === "admin";

  return isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminProtected;