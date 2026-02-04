import React from 'react';
import DashboardStats from '../../../components/owner/DashboardStats';
import BookingList from '../../../components/owner/BookingList';
import { useOwnerBookings, useUpdateBookingStatusByOwner } from '../../../hooks/useBookings';

export default function OwnerDashboardPage() {
  const { data: bookings = [], isLoading: loading, error } = useOwnerBookings();
  const updateStatusMutation = useUpdateBookingStatusByOwner();

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ bookingId, status: newStatus });
      alert('Cập nhật trạng thái thành công!');
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6 flex items-center justify-center">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 dark:text-red-400 font-semibold mb-2">Lỗi tải dữ liệu</h2>
          <p className="text-red-600 dark:text-red-300 text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Owner Dashboard</h1>
          <p className="text-blue-100">Quản lý đơn thuê xe của bạn</p>
        </div>

        {/* Stats */}
        <DashboardStats bookings={bookings} />

        {/* Booking List */}
        <BookingList
          bookings={bookings}
          onStatusChange={handleStatusChange}
          loading={loading}
        />
      </div>
    </div>
  );
}
