import React from "react";
import { useParams } from "react-router-dom";
import { useCarDetails } from "../../../hooks/useCar";
import CarFormPage from "./CarFormPage";

export default function EditCarPage() {
  const { slug } = useParams();
  const { data: car, isLoading, error } = useCarDetails(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-300">Đang tải...</p>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Không tìm thấy xe hoặc có lỗi xảy ra.</p>
      </div>
    );
  }

  return <CarFormPage car={car} isUpdate={true} />;
}
