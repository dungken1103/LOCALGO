import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/rental/Sidebar';
import MainContent from '../components/rental/MainContent';
import useTheme from '../hooks/useTheme';
import { useCar, useSearchCars } from '../hooks/useCar';

const CarRentalPage = () => {
  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    brands: [],
    seats: [],
    transmissions: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedSearchQuery, setAppliedSearchQuery] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(0);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark');
    if (theme === 'dark') html.classList.add('dark');
  }, [theme]);

  const { data: cars, isLoading, isError, error } = useCar();
  const {
    data: searchedCars,
    isLoading: isSearchLoading,
    isError: isSearchError,
    error: searchError,
  } = useSearchCars(appliedSearchQuery, searchTrigger);

  const currentCars = appliedSearchQuery.trim() ? searchedCars : cars;
  const carsList = Array.isArray(currentCars)
    ? currentCars
    : (currentCars?.data ?? currentCars?.cars ?? []);

  const loadingState = isLoading || (!!appliedSearchQuery.trim() && isSearchLoading);
  const errorState = isError || (!!appliedSearchQuery.trim() && isSearchError);
  const currentError = searchError || error;

  const handleCardClick = (slug) => navigate(`/car/${slug}`);
  const handleRentNow = (slug) => navigate(`/car/${slug}`);
  const handleApplyFilters = () => {
    setAppliedSearchQuery(searchQuery.trim());
    setSearchTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <aside className="w-64 mx-5">
            <Sidebar
              filters={filters}
              onFilterChange={setFilters}
              onApplyFilters={handleApplyFilters}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />
          </aside>
          <main className="flex-1">
            {loadingState && <div>Đang tải danh sách xe...</div>}
            {errorState && <div className="text-red-500">Lỗi: {currentError?.message || 'Không thể tải dữ liệu'}</div>}
            {!loadingState && !errorState && (
              <MainContent cars={carsList} onRentNow={handleRentNow} onCardClick={handleCardClick} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CarRentalPage;
