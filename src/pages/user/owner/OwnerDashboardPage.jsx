import React, { useEffect, useState } from 'react';
import { FaCar, FaClipboardList } from 'react-icons/fa';
import axios from '../../services/axiosConfig';

/* ===================== CONSTANTS ===================== */

const STATUS_STYLE = {
  ACTIVE: 'bg-green-100 text-green-700',
  PENDING_CONFIRMATION: 'bg-yellow-100 text-yellow-700',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
  PENDING_PAYMENT: 'bg-purple-100 text-purple-700',
};

/* ===================== COMPONENT ===================== */

export default function OwnerDashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  api.get('/booking/owner')
    .then((res) => {
      if (res.data.success) {
        setBookings(res.data.data);
      }
    })
    .catch(console.error)
    .finally(() => setLoading(false));
}, []);

  return (
    <div className="space-y-10">
      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Owner Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard
          icon={<FaCar />}
          label="Số đơn thuê xe"
          value={bookings.length}
        />
        <StatCard
          icon={<FaClipboardList />}
          label="Đơn đang hoạt động"
          value={bookings.filter((b) => b.status === 'ACTIVE').length}
        />
      </div>

      {/* Booking table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Danh sách đơn thuê xe
          </h2>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500">Đang tải dữ liệu...</div>
        ) : bookings.length === 0 ? (
          <div className="p-6 text-gray-500">Chưa có đơn thuê nào</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 dark:text-gray-300 border-b dark:border-gray-700">
                  <th className="py-3 px-6">Xe</th>
                  <th className="px-6">Người thuê</th>
                  <th className="px-6">Thời gian</th>
                  <th className="px-6">Trạng thái</th>
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
                          STATUS_STYLE[b.status] ||
                          'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {b.status}
                      </span>
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
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          {label}
        </div>
      </div>
    </div>
  );
}

/* ===================== UTILS ===================== */

function formatDate(date) {
  return new Date(date).toLocaleDateString('vi-VN');
}
