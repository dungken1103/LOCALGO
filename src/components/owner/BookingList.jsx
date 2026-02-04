import React, { useState } from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';
import BookingItem from './BookingItem';

const BookingList = ({ bookings, onStatusChange, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.car?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.renter?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.renter?.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === 'ALL' || booking.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Danh sách đơn thuê xe
          </h2>

          <div className="flex flex-col md:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition w-full md:w-64"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none cursor-pointer"
              >
                <option value="ALL">Tất cả</option>
                <option value="PENDING_CONFIRMATION">Chờ xác nhận</option>
                <option value="PENDING_PAYMENT">Chờ thanh toán</option>
                <option value="ACTIVE">Đang hoạt động</option>
                <option value="COMPLETED">Hoàn thành</option>
                <option value="CANCELLED">Đã hủy</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-500 dark:text-gray-400 mt-4">Đang tải dữ liệu...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          {searchTerm || filterStatus !== 'ALL'
            ? 'Không tìm thấy đơn thuê nào phù hợp'
            : 'Chưa có đơn thuê xe nào'}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 border-b dark:border-gray-700">
                <th className="py-4 px-6 font-semibold">Xe</th>
                <th className="px-6 font-semibold">Người thuê</th>
                <th className="px-6 font-semibold">Thời gian</th>
                <th className="px-6 font-semibold">Tổng tiền</th>
                <th className="px-6 font-semibold">Trạng thái</th>
                <th className="px-6 font-semibold">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {filteredBookings.map((booking) => (
                <BookingItem
                  key={booking.id}
                  booking={booking}
                  onStatusChange={onStatusChange}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer with pagination info */}
      {!loading && filteredBookings.length > 0 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-400">
          Hiển thị {filteredBookings.length} / {bookings.length} đơn thuê
        </div>
      )}
    </div>
  );
};

export default BookingList;
