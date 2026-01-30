import React, { useState, useMemo } from 'react';
import { useOwnerApplications } from '../../hooks/useOwnerApplications';
import OwnerApplicationCard from './OwnerApplicationCard';

const OwnerApplicationsTable = () => {
  const { data: applications, isLoading, isError, error } = useOwnerApplications();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and search applications
  const filteredApplications = useMemo(() => {
    if (!applications) return [];

    let filtered = applications;

    // Filter by status
    if (filterStatus !== 'ALL') {
      filtered = filtered.filter((app) => app.status === filterStatus);
    }

    // Search by name or email
    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.identityNumber?.includes(searchTerm)
      );
    }

    return filtered;
  }, [applications, filterStatus, searchTerm]);

  // Count by status
  const statusCounts = useMemo(() => {
    if (!applications) return { PENDING: 0, APPROVED: 0, REJECTED: 0 };

    return applications.reduce(
      (acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1;
        return acc;
      },
      { PENDING: 0, APPROVED: 0, REJECTED: 0 }
    );
  }, [applications]);

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">
            Đang tải dữ liệu...
          </span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 border border-red-200 dark:border-red-700">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
            Lỗi khi tải dữ liệu
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {error?.response?.data?.message || error?.message || 'Đã xảy ra lỗi'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Quản lý đơn đăng ký chủ xe
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {applications?.length || 0}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Tổng số đơn</div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">
              {statusCounts.PENDING}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-500">Chờ duyệt</div>
          </div>
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-2xl font-bold text-green-700 dark:text-green-400">
              {statusCounts.APPROVED}
            </div>
            <div className="text-sm text-green-600 dark:text-green-500">Đã phê duyệt</div>
          </div>
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">
              {statusCounts.REJECTED}
            </div>
            <div className="text-sm text-red-600 dark:text-red-500">Đã từ chối</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, CMND..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Status filter */}
          <div className="flex gap-2">
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status === 'ALL' && 'Tất cả'}
                {status === 'PENDING' && 'Chờ duyệt'}
                {status === 'APPROVED' && 'Đã duyệt'}
                {status === 'REJECTED' && 'Đã từ chối'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications grid */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 border border-gray-200 dark:border-gray-700 text-center">
          <svg
            className="mx-auto h-16 w-16 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            Không có đơn đăng ký nào
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {searchTerm || filterStatus !== 'ALL'
              ? 'Không tìm thấy đơn đăng ký phù hợp với bộ lọc'
              : 'Chưa có đơn đăng ký chủ xe nào'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <OwnerApplicationCard key={application.id} application={application} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerApplicationsTable;
