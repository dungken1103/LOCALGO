import React from "react";
import OwnerApplicationsTable from "../../components/admin/OwnerApplicationsTable";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>

        <OwnerApplicationsTable />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-indigo-500 mb-2">120</div>
            <div className="text-gray-700 dark:text-gray-300">Tổng số xe</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-indigo-500 mb-2">350</div>
            <div className="text-gray-700 dark:text-gray-300">Tổng người dùng</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-indigo-500 mb-2">15</div>
            <div className="text-gray-700 dark:text-gray-300">Đơn chờ duyệt</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Quản lý xe</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <th className="py-2">Tên xe</th>
                <th>Biển số</th>
                <th>Chủ xe</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2">Toyota Camry</td>
                <td>29A-123.45</td>
                <td>Nguyễn Văn A</td>
                <td><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Đang hoạt động</span></td>
              </tr>
              <tr>
                <td className="py-2">Mazda 3</td>
                <td>30B-456.78</td>
                <td>Trần Thị B</td>
                <td><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">Chờ duyệt</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
