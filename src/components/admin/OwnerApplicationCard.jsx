import React, { useState } from 'react';
import { format } from 'date-fns';
import { useApproveOwnerApplication, useRejectOwnerApplication } from '../../hooks/useOwnerApplications';
import Swal from 'sweetalert2';

const OwnerApplicationCard = ({ application }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const approveApplication = useApproveOwnerApplication();
  const rejectApplication = useRejectOwnerApplication();

  // Map status to Vietnamese
  const getStatusText = (status) => {
    const statusMap = {
      PENDING: 'Chờ duyệt',
      APPROVED: 'Đã phê duyệt',
      REJECTED: 'Đã từ chối',
    };
    return statusMap[status] || status;
  };

  // Get status badge color
  const getStatusColor = (status) => {
    const colorMap = {
      PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      APPROVED: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      REJECTED: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800';
  };

  const handleApprove = async () => {
    const result = await Swal.fire({
      title: 'Xác nhận phê duyệt',
      text: `Bạn có chắc muốn phê duyệt đơn của ${application.user?.name || 'người dùng này'}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Phê duyệt',
      cancelButtonText: 'Hủy',
    });

    if (result.isConfirmed) {
      approveApplication.mutate(application.id);
    }
  };

  const handleReject = async () => {
    const { value: reason } = await Swal.fire({
      title: 'Từ chối đơn đăng ký',
      input: 'textarea',
      inputLabel: 'Lý do từ chối',
      inputPlaceholder: 'Nhập lý do từ chối...',
      inputAttributes: {
        'aria-label': 'Nhập lý do từ chối',
      },
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Từ chối',
      cancelButtonText: 'Hủy',
      inputValidator: (value) => {
        if (!value) {
          return 'Vui lòng nhập lý do từ chối!';
        }
      },
    });

    if (reason) {
      rejectApplication.mutate({
        applicationId: application.id,
        reviewData: {},
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {application.user?.name || 'N/A'}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {application.user?.email || 'N/A'}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}
        >
          {getStatusText(application.status)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
            Số CMND/CCCD:
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {application.identityNumber || 'N/A'}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
            Số điện thoại:
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {application.phone || 'N/A'}
          </span>
        </div>
        <div className="flex items-center text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
            Ngày đăng ký:
          </span>
          <span className="text-gray-600 dark:text-gray-400">
            {format(new Date(application.createdAt), 'dd/MM/yyyy HH:mm')}
          </span>
        </div>
      </div>

      {/* Address (collapsible) */}
      {application.address && (
        <div className="mb-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            {isExpanded ? '▼' : '▶'} Xem địa chỉ
          </button>
          {isExpanded && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pl-4">
              {application.address}
            </p>
          )}
        </div>
      )}

      {/* Review details if rejected */}
      {application.status === 'REJECTED' && application.reviewNote && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/10 rounded border border-red-200 dark:border-red-800">
          <p className="text-sm font-medium text-red-800 dark:text-red-400 mb-1">
            Lý do từ chối:
          </p>
          <p className="text-sm text-red-700 dark:text-red-300">
            {application.reviewNote}
          </p>
          {application.reviewedAt && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">
              {format(new Date(application.reviewedAt), 'dd/MM/yyyy HH:mm')}
            </p>
          )}
        </div>
      )}

      {/* Action buttons (only show for PENDING status) */}
      {application.status === 'PENDING' && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleApprove}
            disabled={approveApplication.isPending}
            className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
          >
            {approveApplication.isPending ? 'Đang xử lý...' : 'Phê duyệt'}
          </button>
          <button
            onClick={handleReject}
            disabled={rejectApplication.isPending}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
          >
            {rejectApplication.isPending ? 'Đang xử lý...' : 'Từ chối'}
          </button>
        </div>
      )}
    </div>
  );
};

export default OwnerApplicationCard;
