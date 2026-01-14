import React from 'react';
import { useParams } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import { useCar, useCarDetails } from '../../hooks/useCar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CarDetails = () => {
  const { id } = useParams();
  const { theme, toggleTheme } = useTheme();
  const { data: car, isLoading, error } = useCarDetails(id);

  if (isLoading) {
    return (
      <div className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center`}>
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center`}>
        <div className="text-xl text-red-500">Lỗi khi tải dữ liệu xe</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center`}>
        <div className="text-xl">Không tìm thấy xe</div>
      </div>
    );
  }

  return (
    <div className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
      <main className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img src={car.image} alt={car.name} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{car.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">{car.pricePerDay?.toLocaleString()} VNĐ/ngày</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Địa điểm: {car.location}</p>
            <p className="mt-4 text-gray-800 dark:text-gray-200">{car.description}</p>
            {car.features && (
              <ul className="mt-4 space-y-2">
                {car.features.map((feature, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">- {feature}</li>
                ))}
              </ul>
            )}
            <button className="mt-6 w-full bg-blue-500 dark:bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition">
              Đặt xe ngay
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CarDetails;