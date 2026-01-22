import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaCar } from 'react-icons/fa';

export default function EmptyBookingState({ activeTab }) {
  const navigate = useNavigate();

  const getEmptyMessage = () => {
    switch (activeTab) {
      case 'active':
        return 'Bạn chưa có chuyến xe nào đang thuê';
      case 'upcoming':
        return 'Bạn chưa có chuyến xe nào sắp diễn ra';
      case 'completed':
        return 'Bạn chưa có chuyến xe nào hoàn thành';
      case 'cancelled':
        return 'Bạn chưa có chuyến xe nào bị hủy';
      default:
        return 'Bạn chưa có chuyến đi nào';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 dark:bg-gray-700 p-8 rounded-full mb-6">
        <FaCalendarAlt className="text-6xl text-gray-400 dark:text-gray-500" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {getEmptyMessage()}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md">
        Hãy bắt đầu hành trình của bạn bằng cách đặt một chiếc xe phù hợp ngay hôm nay!
      </p>
      
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
      >
        <FaCar className="text-lg" />
        Tìm xe ngay
      </button>
    </div>
  );
}
