import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/axiosConfig";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";
import AuthLayout from "../../layouts/AuthLayout";
import { logConversion } from '../../services/googleAnalytics';

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Vui lòng nhập họ tên.";
    if (!form.email) e.email = "Vui lòng nhập email.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email không hợp lệ.";

    if (!form.password) e.password = "Vui lòng nhập mật khẩu.";
    else if (form.password.length < 6)
      e.password = "Mật khẩu phải có ít nhất 6 ký tự.";

    if (!form.confirmPassword)
      e.confirmPassword = "Vui lòng xác nhận mật khẩu.";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Mật khẩu không khớp.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await axios.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // Gửi sự kiện chuyển đổi khi đăng ký thành công
      logConversion('Registration Success', 1);

      await Swal.fire({
        title: "Đăng ký thành công",
        text: "Bạn có thể đăng nhập ngay",
        icon: "success",
      });

      navigate("/login");
    } catch (err) {
      if (err.response?.status === 409) {
        setErrors({ email: "Email đã tồn tại" });
      } else {
        Swal.fire("Lỗi", "Đã xảy ra lỗi, vui lòng thử lại", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-400 to-yellow-400 opacity-30 blur-lg"></div>

        <div className="relative rounded-3xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl
          border border-gray-200 dark:border-gray-700 shadow-2xl p-8">

          <h2 className="text-3xl font-extrabold text-center 
            bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
            Đăng ký
          </h2>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-2 mb-6">
            Tạo tài khoản để thuê xe ngay
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Họ tên"
              className="w-full rounded-xl px-4 py-3 bg-gray-100 dark:bg-gray-700"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

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

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Xác nhận mật khẩu"
                className="w-full rounded-xl px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-700"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-3.5 cursor-pointer"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-orange-400 to-yellow-400">
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-500">
            Đã có tài khoản?
            <Link to="/login" className="text-orange-500 ml-1 hover:underline">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
