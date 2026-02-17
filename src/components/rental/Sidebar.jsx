import React, { useState } from "react";

const Sidebar = ({
  filters,
  onFilterChange,
  onApplyFilters,
  searchQuery,
  onSearchQueryChange,
}) => {
  const [priceRange, setPriceRange] = useState([0, 1000000]);

  const handlePriceChange = (e) => {
    const value = Number(e.target.value);
    setPriceRange([0, value]);
    onFilterChange({ ...filters, priceRange: [0, value] });
  };

  return (
    <div
      className="
        w-full lg:w-72 lg:sticky lg:top-20
        rounded-3xl p-5
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
        border border-gray-200 dark:border-gray-700
        shadow-xl
      "
    >
      <h3
        className="
          text-xl font-bold mb-6 text-center
          bg-gradient-to-r from-blue-500 to-cyan-500
          bg-clip-text text-transparent
        "
      >
        Bộ lọc
      </h3>

      <div className="mb-6">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Tìm kiếm xe
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Nhập tên xe, hãng xe..."
          className="w-full mt-2 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Price */}
      <div className="mb-6">
        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Khoảng giá (VNĐ/ngày)
        </label>
        <input
          type="range"
          min={0}
          max={1000000}
          step={50000}
          value={priceRange[1]}
          onChange={handlePriceChange}
          className="w-full mt-2 accent-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          0 – {priceRange[1].toLocaleString()} VNĐ
        </p>
      </div>

      {/* Brand */}
      <FilterSection
        title="Hãng xe"
        options={["Toyota", "Honda", "Mazda", "Hyundai", "Kia", "Ford", "BMW", "Mercedes"]}
        selected={filters.brands}
        onChange={(value) =>
          onFilterChange({
            ...filters,
            brands: filters.brands.includes(value)
              ? filters.brands.filter(b => b !== value)
              : [...filters.brands, value],
          })
        }
      />

      {/* Seats */}
      <FilterSection
        title="Số chỗ"
        options={[4, 5, 7]}
        selected={filters.seats}
        suffix=" chỗ"
        onChange={(value) =>
          onFilterChange({
            ...filters,
            seats: filters.seats.includes(value)
              ? filters.seats.filter(s => s !== value)
              : [...filters.seats, value],
          })
        }
      />

      {/* Transmission */}
      <FilterSection
        title="Truyền động"
        options={["Tự động", "Số sàn"]}
        selected={filters.transmissions}
        onChange={(value) =>
          onFilterChange({
            ...filters,
            transmissions: filters.transmissions.includes(value)
              ? filters.transmissions.filter(t => t !== value)
              : [...filters.transmissions, value],
          })
        }
      />

      <button
        onClick={onApplyFilters}
        className="
          w-full mt-6 py-3 rounded-xl text-white font-semibold
          bg-gradient-to-r from-blue-500 to-cyan-500
        "
      >
        Áp dụng bộ lọc
      </button>
    </div>
  );
};

const FilterSection = ({ title, options, selected, onChange, suffix = "" }) => (
  <div className="mb-6">
    <p className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
      {title}
    </p>
    {options.map((o) => (
      <label key={o} className="flex items-center gap-2 mb-1 text-sm text-gray-500 dark:text-gray-400">
        <input
          type="checkbox"
          checked={selected.includes(o)}
          onChange={() => onChange(o)}
          className="accent-blue-500"
        />
        {o}{suffix}
      </label>
    ))}
  </div>
);

export default Sidebar;
