import React, { useState } from 'react';

const Sidebar = ({ filters, onFilterChange, onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
    onFilterChange({ ...filters, priceRange: [0, value] });
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleSeatsChange = (seats) => {
    const newSeats = filters.seats.includes(seats)
      ? filters.seats.filter(s => s !== seats)
      : [...filters.seats, seats];
    onFilterChange({ ...filters, seats: newSeats });
  };

  const handleTransmissionChange = (transmission) => {
    const newTransmissions = filters.transmissions.includes(transmission)
      ? filters.transmissions.filter(t => t !== transmission)
      : [...filters.transmissions, transmission];
    onFilterChange({ ...filters, transmissions: newTransmissions });
  };

  return (
    <div className="w-full lg:w-64 lg:sticky lg:top-16 lg:self-start bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Bộ lọc</h3>

      {/* Khoảng giá */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Khoảng giá (VNĐ/ngày)</label>
        <input
          type="range"
          min="0"
          max="1000000"
          step="50000"
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer dark:bg-orange-700"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>{priceRange[1].toLocaleString()} VNĐ</span>
        </div>
      </div>

      {/* Hãng xe */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Hãng xe</label>
        {['Toyota', 'Honda', 'Mazda', 'Hyundai', 'Kia', 'Ford', 'BMW', 'Mercedes'].map(brand => (
          <label key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => handleBrandChange(brand)}
              className="mr-2 accent-orange-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">{brand}</span>
          </label>
        ))}
      </div>

      {/* Số chỗ ngồi */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Số chỗ ngồi</label>
        {[4, 5, 7].map(seats => (
          <label key={seats} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filters.seats.includes(seats)}
              onChange={() => handleSeatsChange(seats)}
              className="mr-2 accent-orange-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">{seats} chỗ</span>
          </label>
        ))}
      </div>

      {/* Loại truyền động */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Loại truyền động</label>
        {['Tự động', 'Số sàn'].map(transmission => (
          <label key={transmission} className="flex items-center mb-1">
            <input
              type="checkbox"
              checked={filters.transmissions.includes(transmission)}
              onChange={() => handleTransmissionChange(transmission)}
              className="mr-2 accent-orange-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">{transmission}</span>
          </label>
        ))}
      </div>

      <button
        onClick={onApplyFilters}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
      >
        Áp dụng bộ lọc
      </button>
    </div>
  );
};

export default Sidebar;