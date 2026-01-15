import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/rental/Sidebar';
import MainContent from '../components/rental/MainContent';
import useTheme from '../hooks/useTheme';
import UserHeader from '../components/UserHeader';
import { useCar } from '../hooks/useCar';

const CarRentalPage = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    brands: [],
    seats: [],
    transmissions: []
  });
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark');
    if (theme === 'dark') html.classList.add('dark');
  }, [theme]);

  const { data: cars, isLoading, isError, error } = useCar();
  // console.log('Fetched cars:', cars);
  // Normalize API response to an array for MainContent
  const carsList = Array.isArray(cars) ? cars : (cars?.data ?? cars?.cars ?? []);

  const handleCardClick = (slug) => navigate(`/car/${slug}`);
  const handleRentNow = (slug) => navigate(`/car/${slug}`);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-64 mx-5">
            <Sidebar filters={filters} setFilters={setFilters} />
          </aside>
          <main className="flex-1">
            {isLoading && <div>Đang tải danh sách xe...</div>}
            {isError && <div className="text-red-500">Lỗi: {error?.message || 'Không thể tải dữ liệu'}</div>}
            {!isLoading && !isError && (
              <MainContent cars={carsList} onRentNow={handleRentNow} onCardClick={handleCardClick} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CarRentalPage;
