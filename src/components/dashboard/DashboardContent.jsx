import React from "react";
import DashboardCard from "./DashboardCard";
import { FiUsers, FiShoppingCart, FiDollarSign, FiTruck } from "react-icons/fi";

export default function DashboardContent() {
  const stats = [
    { title: "Người dùng", value: 1200, icon: <FiUsers /> },
    { title: "Đơn hàng", value: 320, icon: <FiShoppingCart /> },
    { title: "Doanh thu", value: "$12,400", icon: <FiDollarSign /> },
    { title: "Xe cho thuê", value: 58, icon: <FiTruck />  },
  ];

  return (
    <main className="p-6 flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>
    </main>
  );
}
