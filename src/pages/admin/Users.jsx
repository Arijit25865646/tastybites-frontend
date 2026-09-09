import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import api from "../../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch Users
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

  // Delete User
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

        // Remove user from UI
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

  // Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg font-semibold text-gray-600">
          Loading users...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Users
        </h1>

        <p className="text-gray-600 mt-2">
          Manage registered users of TastyBites.
        </p>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm mt-8 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Name
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Registration Date
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-gray-100"
                >
                  {/* Name */}
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    {user.role === "admin" ? (
                      <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        Admin
                      </span>
                    ) : (
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        User
                      </span>
                    )}
                  </td>

                  {/* Registration Date */}
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  {/* Delete */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(user._id)}
                      disabled={deletingId === user._id}
                      className="px-3 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === user._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No users found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;