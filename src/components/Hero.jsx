import React, { useState } from "react";

export default function Hero({ theme }) {
  const isDark = theme === "dark";
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section
      className={
        isDark
          ? "bg-gradient-to-r from-gray-900 to-gray-800"
          : "bg-gradient-to-r from-blue-50 to-blue-100"
      }
    >
      {isLoading && <p>Loading...</p>}
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 py-20 px-4">
        {/* LEFT */}
        <div className="flex-1">
          <h1
            className={`text-4xl md:text-5xl font-extrabold leading-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Thuê xe dễ dàng — Lái là đi
          </h1>

          <p
            className={`mt-4 text-lg max-w-xl ${
              isDark ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Chọn từ hàng trăm xe, nhận xe nhanh chóng và giá minh bạch.
            So sánh, chọn và đặt chỉ trong vài phút.
          </p>

          {/* Search box */}
          <div
            className={
              `mt-8 rounded-lg p-4 shadow-sm ` +
              (isDark ? "bg-gray-700/40" : "bg-white/70")
            }
          >
            <form className="flex flex-col md:flex-row gap-3">
              <input
                className={
                  `flex-1 px-4 py-3 rounded-md border ` +
                  (isDark
                    ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                    : "bg-white border-gray-200 text-gray-700 placeholder-gray-500")
                }
                placeholder="Địa điểm (ví dụ: Hà Nội)"
              />

              <input
                className={
                  `w-full md:w-56 px-4 py-3 rounded-md border ` +
                  (isDark
                    ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                    : "bg-white border-gray-200 text-gray-700 placeholder-gray-500")
                }
                placeholder="Ngày nhận"
              />

              <input
                className={
                  `w-full md:w-56 px-4 py-3 rounded-md border ` +
                  (isDark
                    ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400"
                    : "bg-white border-gray-200 text-gray-700 placeholder-gray-500")
                }
                placeholder="Ngày trả"
              />

              <button
                className={
                  `px-6 py-3 rounded-md font-semibold hover:brightness-95 ` +
                  (isDark
                    ? "bg-yellow-400 text-gray-200"
                    : "bg-yellow-400 text-gray-900")
                }
              >
                Tìm kiếm
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full lg:w-1/2">
          <div
            className={
              `rounded-xl overflow-hidden shadow-xl p-6 ` +
              (isDark ? "bg-gray-700/40" : "bg-white/80")
            }
          >
            <img
              src="https://images.unsplash.com/photo-1630312465536-5c6b1f76dc3f?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="hero car"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
