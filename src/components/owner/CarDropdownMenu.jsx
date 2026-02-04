import React, { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { carService } from "../../services/carService";
import Swal from "sweetalert2";

export default function CarDropdownMenu({ car }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: async ({ slug, status }) => {
      return await carService.updateCarStatus(slug, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars", "owner-cars"] });
      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Đã cập nhật trạng thái xe",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: error.message || "Không thể cập nhật trạng thái xe",
      });
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleStatus = async () => {
    const newStatus = car.status === "AVAILABLE" ? "UNAVAILABLE" : "AVAILABLE";
    const statusText = newStatus === "AVAILABLE" ? "Có sẵn" : "Không có sẵn";

    const result = await Swal.fire({
      title: "Xác nhận thay đổi",
      text: `Bạn có muốn đổi trạng thái xe thành "${statusText}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      updateStatusMutation.mutate({ slug: car.slug, status: newStatus });
      setIsOpen(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "RENTED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "UNAVAILABLE":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "AVAILABLE":
        return "Có sẵn";
      case "RENTED":
        return "Đang thuê";
      case "UNAVAILABLE":
        return "Không có sẵn";
      default:
        return status;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        aria-label="More options"
      >
        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
          <div className="py-1">
            {/* Status Badge Display */}
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Trạng thái hiện tại:
              </span>
              <div className="mt-1">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                    car.status
                  )}`}
                >
                  {getStatusText(car.status)}
                </span>
              </div>
            </div>

            {/* Toggle Status Button */}
            <button
              onClick={handleToggleStatus}
              disabled={
                updateStatusMutation.isPending || car.status === "RENTED"
              }
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {updateStatusMutation.isPending
                ? "Đang cập nhật..."
                : car.status === "AVAILABLE"
                ? "Đánh dấu không có sẵn"
                : car.status === "RENTED"
                ? "Đang được thuê"
                : "Đánh dấu có sẵn"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
