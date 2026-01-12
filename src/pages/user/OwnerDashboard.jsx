import React from "react";

export default function OwnerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Chủ xe Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-lg font-semibold mb-2">Xe của bạn</div>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Toyota Camry - 29A-123.45</span>
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Đang cho thuê</span>
              </li>
              <li className="flex justify-between items-center">
                <span>Mazda 3 - 30B-456.78</span>
                <span className="px-2 py-1 rounded bg-gray-200 text-gray-700 text-xs">Sẵn sàng</span>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-lg font-semibold mb-2">Theo dõi hành trình xe</div>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-gray-400 dark:text-gray-300">
              (Bản đồ/Tracking sẽ hiển thị ở đây)
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Lịch sử cho thuê</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                <th className="py-2">Khách thuê</th>
                <th>Xe</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <td className="py-2">Trần Thị B</td>
                <td>Toyota Camry</td>
                <td>01/01/2026 - 05/01/2026</td>
                <td><span className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs">Hoàn thành</span></td>
              </tr>
              <tr>
                <td className="py-2">Nguyễn Văn C</td>
                <td>Mazda 3</td>
                <td>10/01/2026 - 12/01/2026</td>
                <td><span className="px-2 py-1 rounded bg-yellow-100 text-yellow-700 text-xs">Đang thuê</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
