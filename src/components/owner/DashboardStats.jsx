import React from 'react';
import { FaCar, FaClipboardList, FaCheckCircle, FaClock } from 'react-icons/fa';

const DashboardStats = ({ bookings }) => {
  const stats = [
    {
      icon: <FaCar className="text-4xl" />,
      label: 'Tổng đơn thuê',
      value: bookings.length,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: <FaClipboardList className="text-4xl" />,
      label: 'Đang hoạt động',
      value: bookings.filter((b) => b.status === 'ACTIVE').length,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: <FaClock className="text-4xl" />,
      label: 'Chờ xác nhận',
      value: bookings.filter((b) => b.status === 'PENDING_CONFIRMATION').length,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    },
    {
      icon: <FaCheckCircle className="text-4xl" />,
      label: 'Đã hoàn thành',
      value: bookings.filter((b) => b.status === 'COMPLETED').length,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

const StatCard = ({ icon, label, value, color, bgColor }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4">
        <div className={`${bgColor} ${color} p-4 rounded-xl`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </div>
          <div className="text-gray-600 dark:text-gray-400 text-sm mt-1">
            {label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
