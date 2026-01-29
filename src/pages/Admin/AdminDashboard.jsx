import React, { useEffect, useState } from "react";
import { FaCar, FaUsers, FaClipboardList } from "react-icons/fa";
import axios from "../../services/axiosConfig";

/* ===================== CONSTANTS ===================== */

const STATUS_STYLE = {
  ACTIVE: "bg-green-100 text-green-700",
  PENDING_CONFIRMATION: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-red-100 text-red-700",
  PENDING_PAYMENT: "bg-purple-100 text-purple-700",
};

const BOOKING_STATUSES = [
  { label: "Tất cả", value: "ALL" },
  { label: "Chờ thanh toán", value: "PENDING_PAYMENT" },
  { label: "Chờ xác nhận", value: "PENDING_CONFIRMATION" },
  { label: "Đang thuê", value: "ACTIVE" },
  { label: "Hoàn thành", value: "COMPLETED" },
  { label: "Đã hủy", value: "CANCELLED" },
];

/* ===================== COMPONENT ===================== */

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("ALL");

  /* ===== Fetch bookings ===== */
  useEffect(() => {
    setLoading(true);

    const request =
      status === "ALL"
        ? axios.get("/booking/admin")
        : axios.get("/booking/status", {
            params: { status },
          });

    request
      .then((res) => {
        if (res.data.success) {
          setBookings(res.data.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [status]);

  /* ===== Handle payment completed ===== */
  const handlePaid = (bookingId) => {
    if (!window.confirm("Xác nhận đã chuyển tiền cho đơn này?")) return;

    fetch(`http://localhost:3212/booking/${bookingId}/complete`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setBookings((prev) =>
            prev.map((b) =>
              b.id === bookingId ? { ...b, status: "COMPLETED" } : b,
            ),
          );
        }
      })
      .catch(console.error);
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Admin Dashboard
      </h1>

      {/* ===================== STATS ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<FaCar />} label="Tổng số xe" value="—" />
        <StatCard icon={<FaUsers />} label="Người dùng" value="—" />
        <StatCard
          icon={<FaClipboardList />}
          label="Đơn thuê xe"
          value={bookings.length}
        />
      </div>

      {/* ===================== FILTER ===================== */}
      <div className="flex gap-3 flex-wrap">
        {BOOKING_STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition
              ${
                status === s.value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ===================== TABLE ===================== */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Danh sách đơn thuê xe
          </h2>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500">Đang tải dữ liệu...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-300 border-b dark:border-gray-700">
                  <th className="py-3 px-6">Xe</th>
                  <th className="px-6">Người thuê</th>
                  <th className="px-6">Thời gian</th>
                  <th className="px-6">Trạng thái</th>
                  <th className="px-6">Hành động</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b.id}
                    className="border-b last:border-b-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                  >
                    {/* Car */}
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={b.car?.image}
                          alt={b.car?.name}
                          className="w-14 h-10 rounded object-cover border"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {b.car?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {b.car?.brand} · {b.car?.type}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Renter */}
                    <td className="px-6">
                      <div className="text-gray-900 dark:text-white">
                        {b.renter?.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {b.renter?.email}
                      </div>
                    </td>

                    {/* Time */}
                    <td className="px-6 text-gray-600 dark:text-gray-400">
                      {formatDate(b.startDate)} → {formatDate(b.endDate)}
                    </td>

                    {/* Status */}
                    <td className="px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          STATUS_STYLE[b.status] || "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6">
                      {b.status === "ACTIVE" && (
                        <button
                          onClick={() => handlePaid(b.id)}
                          className="px-3 py-1 text-xs font-semibold rounded bg-green-600 text-white hover:bg-green-700"
                        >
                          Chuyển tiền
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

/* ===================== COMPONENTS ===================== */

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6 flex items-center gap-4">
      <div className="text-3xl text-indigo-600 dark:text-indigo-400">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm">{label}</div>
      </div>
    </div>
  );
}

/* ===================== UTILS ===================== */

function formatDate(date) {
  return new Date(date).toLocaleDateString("vi-VN");
}
