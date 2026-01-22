import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaCalendarCheck,
  FaClock,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaTimes,
  FaStar,
  FaMapMarkerAlt,
  FaCheck,
} from "react-icons/fa";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useUpdateBookingStatus } from "../../hooks/useBookings";
import Swal from "sweetalert2";

export default function MyBookingCard({ booking }) {
  const navigate = useNavigate();
  const updateStatus = useUpdateBookingStatus();

  // Get status badge style
  const getStatusBadge = (status) => {
    const badges = {
      ACTIVE: {
        bg: "bg-green-100 dark:bg-green-900",
        text: "text-green-800 dark:text-green-200",
        label: "Đang thuê",
      },
      PENDING_CONFIRMATION: {
        bg: "bg-blue-100 dark:bg-blue-900",
        text: "text-blue-800 dark:text-blue-200",
        label: "Sắp diễn ra",
      },
      COMPLETED: {
        bg: "bg-gray-100 dark:bg-gray-700",
        text: "text-gray-800 dark:text-gray-200",
        label: "Hoàn thành",
      },
      CANCELLED: {
        bg: "bg-red-100 dark:bg-red-900",
        text: "text-red-800 dark:text-red-200",
        label: "Đã hủy",
      },
    };
    return badges[status] || badges.PENDING_CONFIRMATION;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return format(new Date(dateString), "dd/MM/yyyy HH:mm", { locale: vi });
  };

  // Calculate days difference
  const getDaysDifference = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Get remaining time for active booking
  const getRemainingTime = (endDate) => {
    if (!endDate) return "";
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;

    if (diffTime <= 0) return "Đã hết hạn";

    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );

    if (days > 0) {
      return `Còn ${days} ngày ${hours} giờ`;
    }
    return `Còn ${hours} giờ`;
  };

  const statusBadge = getStatusBadge(booking.status);
  const days = getDaysDifference(booking.startDate, booking.endDate);

  const handleGoToDeposit = () => {
    const start = new Date(booking.startDate);
    const end = new Date(booking.endDate);

    const rentalDays = Math.max(
      1,
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)),
    );

    const pricePerDay = booking.car.pricePerDay || 0;
    const rentalFee = rentalDays * pricePerDay;
    const serviceFee = rentalFee * 0.05;
    const total = rentalFee + serviceFee;

    navigate("/deposit", {
      state: {
        bookingId: booking.id,
        slug: booking.slug,
        carId: booking.car.id,
        carName: booking.car.name,
        days: rentalDays,
        rentalFee,
        serviceFee,
        amount: total,
      },
    });
  };

  // Action buttons based on status
  const renderActionButtons = () => {
    switch (booking.status) {
      case "ACTIVE":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/bookings/${booking.slug}/extend`)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Gia hạn
            </button>
            <button
              onClick={() => navigate(`/chat/${booking.car.ownerId}`)}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FaPhoneAlt /> Liên hệ
            </button>
          </div>
        );
      case "PENDING_CONFIRMATION":
      case "pending_confirmation": // Support lowercase as fallback
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleConfirmBooking(booking.slug)}
              disabled={updateStatus.isPending}
              className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2
                ${
                  updateStatus.isPending
                    ? "bg-green-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white`}
            >
              {updateStatus.isPending ? (
                <>
                  <FaClock className="animate-spin" /> Đang xử lý...
                </>
              ) : (
                <>
                  <FaCheck /> Xác nhận
                </>
              )}
            </button>
            <button
              onClick={() => handleCancelBooking(booking.slug)}
              disabled={updateStatus.isPending}
              className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2
                ${
                  updateStatus.isPending
                    ? "bg-red-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } text-white`}
            >
              {updateStatus.isPending ? (
                <>
                  <FaClock className="animate-spin" /> Đang xử lý...
                </>
              ) : (
                <>
                  <FaTimes /> Hủy
                </>
              )}
            </button>
          </div>
        );
      case "COMPLETED":
        return (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/car/${booking.car.id}`)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Thuê lại
            </button>
            <button
              onClick={() => handleReview(booking.id)}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FaStar /> Đánh giá
            </button>
          </div>
        );
      case "CANCELLED":
      case "canceled": // Support lowercase as fallback
        return (
          <button
            onClick={() => navigate(`/rental`)}
            className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Xem thêm
          </button>
        );
      case "PENDING_PAYMENT":
        return (
          <div className="flex gap-2">
            <button
              onClick={handleGoToDeposit}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Thanh toán
            </button>
          </div>
        );
      default:
        // Fallback: if status not matched, show debug info
        console.warn("Unknown booking status:", booking.status);
        return (
          <div className="text-sm text-red-600 dark:text-red-400">
            Status không hợp lệ: {booking.status}
          </div>
        );
    }
  };

  // Render timeline/reminder bar for active/upcoming bookings
  const renderTimeline = () => {
    if (booking.status === "ACTIVE") {
      return (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaClock className="text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              {getRemainingTime(booking.endDate)}
            </span>
          </div>
          <button
            onClick={() => navigate(`/bookings/${booking.slug}/route`)}
            className="text-sm text-green-600 dark:text-green-400 hover:underline flex items-center gap-1"
          >
            <FaMapMarkerAlt /> Xem lộ trình
          </button>
        </div>
      );
    }

    if (booking.status === "PENDING_CONFIRMATION") {
      return (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            ⚠️ Nhắc nhở: Hãy mang theo CCCD và GPLX khi nhận xe
          </p>
        </div>
      );
    }

    return null;
  };

  const handleCancelBooking = async (slug) => {
    const result = await Swal.fire({
      title: "Xác nhận hủy chuyến",
      text: "Bạn có chắc chắn muốn hủy chuyến xe này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hủy chuyến",
      cancelButtonText: "Đóng",
    });

    if (result.isConfirmed) {
      try {
        await updateStatus.mutateAsync({ slug, status: "CANCELLED" });
        Swal.fire({
          title: "Đã hủy!",
          text: "Chuyến xe đã được hủy thành công.",
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        Swal.fire({
          title: "Lỗi!",
          text:
            error.response?.data?.message ||
            "Không thể hủy chuyến xe. Vui lòng thử lại.",
          icon: "error",
        });
      }
    }
  };

  const handleConfirmBooking = async (slug) => {
    const result = await Swal.fire({
      title: "Xác nhận đặt xe",
      text: "Xác nhận bạn đã sẵn sàng thuê xe này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Xác nhận",
      cancelButtonText: "Đóng",
    });

    if (result.isConfirmed) {
      try {
        await updateStatus.mutateAsync({ slug, status: "ACTIVE" });
        Swal.fire({
          title: "Thành công!",
          text: "Đặt xe đã được xác nhận. Trạng thái chuyển sang Đang thuê.",
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        Swal.fire({
          title: "Lỗi!",
          text:
            error.response?.data?.message ||
            "Không thể xác nhận đặt xe. Vui lòng thử lại.",
          icon: "error",
        });
      }
    }
  };

  const handleReview = (bookingId) => {
    // Open review modal or navigate to review page
    console.log("Review booking:", bookingId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Car Image and Basic Info */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3">
          <img
            src={booking.car.image || "/placeholder-car.jpg"}
            alt={booking.car.name}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>

        <div className="md:w-2/3 p-5">
          {/* Header with Status Badge */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                {booking.car.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mã đặt xe: <span className="font-semibold">{booking.slug}</span>
              </p>
            </div>
            <span
              className={`${statusBadge.bg} ${statusBadge.text} px-3 py-1 rounded-full text-sm font-semibold`}
            >
              {statusBadge.label}
            </span>
          </div>

          {/* Timeline/Reminder */}
          {renderTimeline()}

          {/* Booking Information Grid */}
          <div className="grid grid-cols-2 gap-4 my-4">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ngày đặt
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDate(booking.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaCalendarCheck className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ngày nhận
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDate(booking.startDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaCalendarCheck className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ngày trả
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDate(booking.endDate)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FaClock className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Số ngày
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {days} ngày
                </p>
              </div>
            </div>
          </div>

          {/* Total Price */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600 dark:text-green-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Tổng thanh toán
                </span>
              </div>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                {booking.totalPrice?.toLocaleString("vi-VN")} VNĐ
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          {renderActionButtons()}
        </div>
      </div>
    </div>
  );
}
