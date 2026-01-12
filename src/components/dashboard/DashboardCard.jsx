import React from "react";

export default function DashboardCard({ title, value, icon, bgColor }) {
  return (
    <div className="flex items-center justify-between p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow duration-200">
      <div>
        <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${bgColor} text-white`}>
        {icon}
      </div>
    </div>
  );
}
