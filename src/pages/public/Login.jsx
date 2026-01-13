import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axios from "../../services/axiosConfig";
import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../layouts/AuthLayout";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Vui lòng nhập email.";
    if (!form.password) e.password = "Vui lòng nhập mật khẩu.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    try {
      const res = await axios.post("/auth/login", form);
      const user = res.data.data.user;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem('token', `Bearer ${res.data.data.token}`);
      setUser(user);
      navigate("/", { replace: true });
    } catch {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <AuthLayout>
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400 to-cyan-400 opacity-30 blur-lg"></div>

        <div className="relative rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl
          border border-gray-200 dark:border-gray-700 shadow-2xl p-8">

          <h2 className="text-3xl font-extrabold text-center 
            bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Đăng nhập
          </h2>

          <form onSubmit={handleLogin} className="space-y-4 mt-6">
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full rounded-xl px-4 py-3 bg-gray-100 dark:bg-gray-700"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Mật khẩu"
                className="w-full rounded-xl px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-700"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button className="w-full py-3 rounded-xl text-white font-semibold
              bg-gradient-to-r from-blue-500 to-cyan-500">
              Đăng nhập
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="text-sm text-gray-400">hoặc</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl">
            <FcGoogle size={22} />
            Đăng nhập với Google
          </button>

          <p className="mt-6 text-sm text-center text-gray-500">
            Chưa có tài khoản?
            <Link to="/register" className="text-blue-500 ml-1 hover:underline">
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
