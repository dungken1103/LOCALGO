import React, { useState } from 'react';
import { FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import { useRenterBookings } from '../../hooks/useBookings';
import MyBookingCard from '../../components/booking/MyBookingCard';
import EmptyBookingState from '../../components/booking/EmptyBookingState';
import { logConversion } from '../../services/googleAnalytics';

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState('all');

  // Map UI tabs to API status
  const getApiStatus = (tab) => {
    const statusMap = {
      all: null,
      active: 'ACTIVE',
      upcoming: 'PENDING_CONFIRMATION',
      completed: 'COMPLETED',
      cancelled: 'CANCELLED', // API uses 'CANCELED' (single 'l')
      pending_payment: 'PENDING_PAYMENT',
    };
    return statusMap[tab];
  };

  // Fetch bookings with TanStack Query
  const { data, isLoading, isError, error, refetch } = useRenterBookings(getApiStatus(activeTab));

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'active', label: 'Đang thuê' },
    { id: 'upcoming', label: 'Sắp diễn ra' },
    { id: 'completed', label: 'Hoàn thành' },
    { id: 'cancelled', label: 'Đã hủy' },
    { id: 'pending_payment', label: 'Chờ thanh toán' },
  ];

  // Get bookings from data
  const bookings = data?.data || [];

  // Get count for each tab - fetch all bookings for accurate counts
  const { data: allBookingsData } = useRenterBookings(null);
  const allBookings = allBookingsData?.data || [];

  const getTabCount = (tabId) => {
    if (tabId === 'all') {
      return allBookings.length;
    }
    
    const statusMap = {
      active: 'ACTIVE',
      upcoming: 'PENDING_CONFIRMATION',
      completed: 'COMPLETED',
      cancelled: 'CANCELLED',
      pending_payment: 'PENDING_PAYMENT',
    };
    
    return allBookings.filter(booking => booking.status === statusMap[tabId]).length;
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    // Gửi sự kiện chuyển đổi khi người dùng thay đổi tab
    logConversion('Booking Tab Change', tabId);
  };

  // Update tabs with counts
  const tabsWithCounts = tabs.map(tab => ({
    ...tab,
    count: getTabCount(tab.id)
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <FaCalendarAlt className="text-3xl text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Xe của tôi
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Quản lý tất cả các chuyến xe của bạn
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {tabsWithCounts.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`
                    ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
                    ${activeTab === tab.id
                      ? 'bg-white text-blue-600'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                    }
                  `}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <FaSpinner className="animate-spin text-4xl text-blue-600 dark:text-blue-400" />
          </div>
        ) : isError ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-800 dark:text-red-200">
              {error?.message || 'Không thể tải danh sách đặt xe. Vui lòng thử lại sau.'}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Thử lại
            </button>
          </div>
        ) : bookings.length === 0 ? (
          <EmptyBookingState activeTab={activeTab} />
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <MyBookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
