import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiShoppingCart, FiSettings } from "react-icons/fi";
// import { useAuth } from "../../context/AuthContext";

export default function DashboardSidebar({user}) {
  // const {user} = useAuth();
  const menu = [
    { name: "Tổng quan", path: "/dashboard", icon: <FiHome /> },
    user?.role === "ADMIN" && { name: "Người dùng", path: "/dashboard/users", icon: <FiUsers /> },
    user?.role === "ADMIN" && { name: "Đơn hàng", path: "/dashboard/orders", icon: <FiShoppingCart /> },
    user?.role === "OWNER" && { name: "Xe của tôi", path: "/owners/owner-cars", icon: <FiShoppingCart /> },
    { name: "Cài đặt", path: "/dashboard/settings", icon: <FiSettings /> },
  ];

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 fixed top-0 left-0 p-6 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8">LocalGo</h2>
      <nav className="flex flex-col gap-3">
        {menu.filter(Boolean).map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                isActive ? "bg-blue-500 text-white dark:bg-blue-600" : ""
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
