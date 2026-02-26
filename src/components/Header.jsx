import React, { useEffect, useState, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { Link, useNavigate, NavLink } from "react-router-dom";
import axios from "../services/axiosConfig";
import { FaSignOutAlt } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import useTheme from "../hooks/useTheme";
import { logEvent } from '../services/googleAnalytics';

export default function Header({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoading(false);
  }, []);
  const handleLogout = async () => {
    try {
      // Gửi request đến server để xóa cookie
      await axios.post("/auth/logout", {}, { withCredentials: true });

      // Xóa dữ liệu ở localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Chuyển hướng và reset state
      navigate(`/`);
      window.location.reload();
      setIsLogin(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  const handleButtonClick = () => {
    logEvent('Header', 'Click', 'User clicked header button');
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
      <div className="container mx-auto flex items-center justify-between gap-4 py-4 px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-md flex items-center justify-center font-bold ${
                theme === "dark"
                  ? "bg-gradient-to-r from-gray-700 to-gray-900 text-blue-200"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 text-gray-50 dark:text-gray-950"
              }`}
            >
              LG
            </div>
            <div className="hidden sm:block">
              <div
                className={`text-lg font-bold ${
                  theme === "dark" ? "text-orange-200" : "text-orange-600"
                }`}
              >
                LocalGo
              </div>
              <div
                className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Thuê xe ô tô nhanh chóng
              </div>
            </div>
          </Link>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm xe..."
              className={`w-full pl-4 pr-10 py-2 rounded-lg border ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } focus:outline-none focus:ring-2 focus:ring-orange-500`}
            />
            <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <nav className="hidden md:flex gap-6 text-sm text-slate-600 dark:text-slate-300">
                <Link to="/rental" className="hover:underline">
                  Xe
                </Link>
              </nav>
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
                          to="/my-bookings"
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
                          Đơn cho thuê xe
                        </Link>
                        <Link
                          to="/owner/cars/new"
                          className="block px-4 py-2 text-sm"
                        >
                          Thêm xe
                        </Link>
                        <Link
                          to="/my-bookings"
                          className="block px-4 py-2 text-sm"
                        >
                          Đơn đã thuê
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
      {isLoading && <p>Loading...</p>}
    </header>
  );
}
