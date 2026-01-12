import React from "react";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

export default function NotFoundPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDark ? "bg-[#020617]" : "bg-gradient-to-br from-slate-50 to-sky-50"
      }`}
    >
      {/* --- Animated Blobs Background --- */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-indigo-500/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-blue-400/30 blur-[140px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* --- Glass Card --- */}
      <div
        className={`relative max-w-2xl w-full mx-4 rounded-3xl p-10 backdrop-blur-2xl border shadow-2xl ${
          isDark
            ? "bg-white/5 border-white/10 shadow-indigo-500/10"
            : "bg-white/70 border-white/60 shadow-indigo-200/40"
        }`}
      >
        {/* Glow Ring Decoration */}
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />

        {/* title */}
        <p className="uppercase text-xs tracking-[0.25em] text-indigo-400">
          lost in space
        </p>

        <h1
          className={`mt-2 text-8xl font-extrabold tracking-tight leading-none ${
            isDark
              ? "text-white drop-shadow-[0_0_25px_rgba(99,102,241,0.35)]"
              : "text-slate-900"
          }`}
        >
          404
        </h1>

        <h2
          className={`mt-4 text-3xl font-semibold ${
            isDark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Bạn đã lạc vào không gian trống!
        </h2>

        <p
          className={`mt-3 text-sm ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển 🚀
          <br />
          Đừng lo, chúng ta sẽ đưa bạn quay lại.
        </p>

        {/* CTA buttons */}
        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all active:scale-[0.97]"
          >
            ⬅ Quay về trang chủ
          </Link>

          <Link
            to="/"
            className={`px-6 py-2.5 rounded-xl text-sm font-semibold border ${
              isDark
                ? "border-gray-700 text-gray-300 hover:bg-gray-800/60"
                : "border-gray-300 text-gray-700 hover:bg-gray-100"
            } transition-all`}
          >
            Liên hệ hỗ trợ
          </Link>
        </div>

        {/* Floating planet deco */}
        <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-cyan-300 opacity-80 blur-sm animate-bounce" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 opacity-70 blur-md animate-[bounce_4s_infinite]" />
      </div>
    </div>
  );
}
