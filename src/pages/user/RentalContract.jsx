import React from "react";

export default function RentalContract() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Hợp đồng thuê xe</h1>
        <div className="space-y-4 text-gray-700 dark:text-gray-200 text-sm">
          <p><span className="font-semibold">Bên cho thuê:</span> Nguyễn Văn A</p>
          <p><span className="font-semibold">Bên thuê:</span> Trần Thị B</p>
          <p><span className="font-semibold">Xe:</span> Toyota Camry - 29A-123.45</p>
          <p><span className="font-semibold">Thời gian thuê:</span> 01/01/2026 - 05/01/2026</p>
          <p><span className="font-semibold">Giá thuê:</span> 1.500.000đ/ngày</p>
          <p><span className="font-semibold">Điều khoản:</span> Xe trả đúng hạn, không hút thuốc, không chở hàng cấm...</p>
        </div>
        <div className="mt-8 flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <div>
            <div className="font-semibold">Bên cho thuê</div>
            <div className="mt-8">(Ký tên)</div>
          </div>
          <div>
            <div className="font-semibold">Bên thuê</div>
            <div className="mt-8">(Ký tên)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
