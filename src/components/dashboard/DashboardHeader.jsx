import React, { useEffect, useState, useRef } from "react";
import ThemeToggle from "../ThemeToggle";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "../../services/axiosConfig";
import { FaSignOutAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import useTheme from "../../hooks/useTheme";

export default function DashboardHeader({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
  }, []);
  const handleLogout = async () => {
    try {
      // Gửi request đến server để xóa cookie
      await axios.post("/auth/logout", {}, { withCredentials: true });

      // Xóa dữ liệu ở localStorage
      localStorage.removeItem("user");

      // Chuyển hướng và reset state
      navigate(`/`);
      window.location.reload();
      setIsLogin(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header
      className={`border-b border-slate-200/10 dark:border-white/5 sticky top-0 z-40 ${
        theme === "dark" ? "bg-gray-900" : "bg-white"
      }`}
    >
        {/* <div className="flex items-center justify-between mb-6"></div> */}
      <div className="container mx-auto flex items-center justify-between gap-4 py-4 px-4">
        <div className="flex items-center gap-4">
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="hidden md:flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-gray-800 px-3 py-1 rounded-full shadow-sm hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  Xin chào, {user?.name || user?.email}
                  <FiChevronDown
                    className={`ml-1 transition-transform duration-200 ${
                      open ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-slate-200 dark:border-gray-700 z-50 overflow-hidden">
                    {user?.role === "RENTER" ? (
                      <>
                        <Link
                          to="/bookings"
                          className="block px-4 py-2 text-sm"
                        >
                          Đơn thuê xe
                        </Link>
                        <Link
                          to="/apply-owner"
                          className="block px-4 py-2 text-sm"
                        >
                          Đăng ký làm người cho thuê
                        </Link>
                      </>
                    ) : user?.role === "OWNER" ? (
                      <>
                        <Link
                          to="/owner/dashboard"
                          className="block px-4 py-2 text-sm"
                        >
                          Bảng điều khiển chủ xe
                        </Link>
                        <Link
                          to="/bookings"
                          className="block px-4 py-2 text-sm"
                        >
                          Đơn thuê xe
                        </Link>
                      </>
                    ) : null}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 transition-colors duration-200"
                    >
                      <FaSignOutAlt />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className=" sm:flex gap-2 items-center">
                <Link
                  to="/login"
                  className="text-sm rounded-md text-gray-700 dark:text-gray-200 hover:underline px-5"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="text-sm rounded-md bg-blue-500 hover:bg-blue-600 text-white px-5 py-1 "
                >
                  Đăng ký
                </Link>
              </div>
            </>
          )}

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
}
