import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  Users as UsersIcon,
  Trash2,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import api from "../../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // ================= FETCH USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = Cookies.get("token");

        const response = await api.get("/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // ================= DELETE USER =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);

      const token = Cookies.get("token");

      const response = await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success(
          response.data.message ||
            "User deleted successfully"
        );

        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== id)
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#D9EAD3] border-t-[#166534] rounded-full animate-spin mx-auto" />

          <p className="text-gray-600 font-semibold mt-4">
            Loading users...
          </p>
        </div>
      </div>
    );
  }

  // ================= USER COUNT =================
  const adminCount = users.filter(
    (user) => user.role === "admin"
  ).length;

  const normalUserCount = users.filter(
    (user) => user.role !== "admin"
  ).length;

  return (
    <div className="min-h-full">

      {/* ================= PAGE HEADER ================= */}
      <div className="mb-8">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
            <UsersIcon
              size={25}
              className="text-[#166534]"
            />
          </div>

          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Users
            </h1>

            <p className="text-gray-600 mt-1">
              Manage registered users of TastyBites.
            </p>
          </div>

        </div>

      </div>


      {/* ================= USER STATISTICS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">

        {/* Total Users */}
        <div className="bg-white border border-[#E8E1D0] rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Users
              </p>

              <p className="text-3xl font-extrabold text-gray-900 mt-1">
                {users.length}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
              <UsersIcon
                size={22}
                className="text-[#166534]"
              />
            </div>

          </div>

        </div>


        {/* Regular Users */}
        <div className="bg-white border border-[#E8E1D0] rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Registered Users
              </p>

              <p className="text-3xl font-extrabold text-gray-900 mt-1">
                {normalUserCount}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
              <UserRound
                size={22}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>


        {/* Admins */}
        <div className="bg-white border border-[#E8E1D0] rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-gray-500">
                Administrators
              </p>

              <p className="text-3xl font-extrabold text-gray-900 mt-1">
                {adminCount}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center">
              <ShieldCheck
                size={22}
                className="text-purple-600"
              />
            </div>

          </div>

        </div>

      </div>


      {/* ================= USERS TABLE ================= */}
      <div className="bg-white border border-[#E8E1D0] rounded-2xl shadow-sm overflow-hidden">

        {/* Table Header */}
        <div className="px-6 py-5 border-b border-[#E8E1D0]">

          <h2 className="text-xl font-bold text-gray-900">
            Registered Users
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            View and manage TastyBites user accounts.
          </p>

        </div>


        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>
              <tr className="bg-[#FFFCF2] text-left">

                <th className="px-6 py-4 text-sm font-bold text-gray-600">
                  Name
                </th>

                <th className="px-6 py-4 text-sm font-bold text-gray-600">
                  Email
                </th>

                <th className="px-6 py-4 text-sm font-bold text-gray-600">
                  Role
                </th>

                <th className="px-6 py-4 text-sm font-bold text-gray-600">
                  Registration Date
                </th>

                <th className="px-6 py-4 text-sm font-bold text-gray-600">
                  Action
                </th>

              </tr>
            </thead>


            <tbody>

              {users.length === 0 ? (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center py-16"
                  >

                    <div className="w-16 h-16 bg-[#ECFDF5] rounded-full flex items-center justify-center mx-auto">

                      <UsersIcon
                        size={30}
                        className="text-[#166534]"
                      />

                    </div>

                    <p className="text-gray-900 font-bold mt-4">
                      No users found
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      There are currently no registered users.
                    </p>

                  </td>

                </tr>

              ) : (

                users.map((user) => (

                  <tr
                    key={user._id}
                    className="border-t border-[#E8E1D0] hover:bg-[#FFFCF2] transition"
                  >

                    {/* Name */}
                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center font-bold">

                          {user.name?.charAt(0).toUpperCase()}

                        </div>

                        <span className="font-semibold text-gray-900">
                          {user.name}
                        </span>

                      </div>

                    </td>


                    {/* Email */}
                    <td className="px-6 py-5 text-gray-600">
                      {user.email}
                    </td>


                    {/* Role */}
                    <td className="px-6 py-5">

                      {user.role === "admin" ? (

                        <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-semibold">

                          <ShieldCheck size={15} />

                          Admin

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#166534] px-3 py-1.5 rounded-full text-sm font-semibold">

                          <UserRound size={15} />

                          User

                        </span>

                      )}

                    </td>


                    {/* Registration Date */}
                    <td className="px-6 py-5 text-gray-600">

                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}

                    </td>


                    {/* Delete */}
                    <td className="px-6 py-5">

                      <button
                        onClick={() =>
                          handleDelete(user._id)
                        }
                        disabled={
                          deletingId === user._id
                        }
                        className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >

                        <Trash2 size={16} />

                        {deletingId === user._id
                          ? "Deleting..."
                          : "Delete"}

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default Users;