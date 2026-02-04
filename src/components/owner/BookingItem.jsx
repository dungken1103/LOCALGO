import React, { useState } from 'react';
import { FaEye, FaEdit, FaCheckCircle, FaTimes } from 'react-icons/fa';
import StatusBadge from './StatusBadge';

const BookingItem = ({ booking, onStatusChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleStatusChange = (newStatus) => {
    onStatusChange(booking.id, newStatus);
    setIsEditing(false);
  };

  const getAvailableActions = () => {
    const actions = [];
    if (booking.status === 'PENDING_CONFIRMATION') {
      actions.push({ status: 'ACTIVE', label: 'Xác nhận', icon: <FaCheckCircle />, color: 'text-green-600' });
      actions.push({ status: 'CANCELLED', label: 'Từ chối', icon: <FaTimes />, color: 'text-red-600' });
    }
    if (booking.status === 'ACTIVE') {
      actions.push({ status: 'COMPLETED', label: 'Hoàn thành', icon: <FaCheckCircle />, color: 'text-blue-600' });
    }
    return actions;
  };

  const availableActions = getAvailableActions();

  return (
    <tr className="border-b last:border-b-0 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition">
      {/* Car Info */}
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <img
            src={booking.car?.image || '/default-car.png'}
            alt={booking.car?.name}
            className="w-16 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700 shadow-sm"
          />
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {booking.car?.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {booking.car?.brand} · {booking.car?.type}
            </div>
          </div>
        </div>
      </td>

      {/* Renter Info */}
      <td className="px-6">
        <div className="font-medium text-gray-900 dark:text-white">
          {booking.renter?.name}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {booking.renter?.email}
        </div>
      </td>

      {/* Rental Period */}
      <td className="px-6">
        <div className="text-sm text-gray-900 dark:text-white font-medium">
          {formatDate(booking.startDate)}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          đến {formatDate(booking.endDate)}
        </div>
      </td>

      {/* Total Price */}
      <td className="px-6">
        <div className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatCurrency(booking.totalPrice)}
        </div>
      </td>

      {/* Status */}
      <td className="px-6">
        <StatusBadge status={booking.status} />
      </td>

      {/* Actions */}
      <td className="px-6">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            {availableActions.map((action) => (
              <button
                key={action.status}
                onClick={() => handleStatusChange(action.status)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${action.color} hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Hủy
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              disabled={availableActions.length === 0}
              className="p-2 rounded-lg text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
              title="Thay đổi trạng thái"
            >
              <FaEdit />
            </button>
            <button
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              title="Xem chi tiết"
            >
              <FaEye />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};

export default BookingItem;
