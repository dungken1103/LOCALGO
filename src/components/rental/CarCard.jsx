import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

const CarCard = ({ car, onRentNow, onCardClick = () => {} }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      onClick={() => onCardClick(car.slug)}
      role="button"
      tabIndex={0}
      className="
        group cursor-pointer rounded-3xl overflow-hidden
        bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl
        border border-gray-200 dark:border-gray-700
        shadow-xl hover:shadow-2xl transition-all
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Status Badge */}
        {car.status && (
          <div className="absolute top-3 left-3">
            <span className={`
              px-3 py-1 rounded-full text-xs font-semibold
              ${car.status === 'AVAILABLE' ? 'bg-green-500/90 text-white' : ''}
              ${car.status === 'RENTED' ? 'bg-red-500/90 text-white' : ''}
              ${car.status === 'UNAVAILABLE' ? 'bg-gray-500/90 text-white' : ''}
            `}>
              {car.status === 'AVAILABLE' ? 'Sẵn sàng' : ''}
              {car.status === 'RENTED' ? 'Đang thuê' : ''}
              {car.status === 'UNAVAILABLE' ? 'Không khả dụng' : ''}
            </span>
          </div>
        )}

        {/* Favorite */}
        <button
          onClick={toggleFavorite}
          className="
            absolute top-3 right-3 p-2 rounded-full
            bg-white/80 dark:bg-gray-900/70 backdrop-blur
            shadow hover:scale-110 transition
          "
        >
          {isFavorite ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {car.name}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {car.location}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {car.seats} chỗ • {car.transmission}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < car.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({car.trips} chuyến)
          </span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-2">
          <span
            className="
              text-lg font-bold
              bg-gradient-to-r from-blue-500 to-cyan-500
              bg-clip-text text-transparent
            "
          >
            {car.pricePerDay.toLocaleString()} VNĐ/ngày
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (car.status !== 'AVAILABLE') {
                alert(car.status === 'RENTED' ? 'Xe đang được thuê' : 'Xe không khả dụng');
                return;
              }
              onRentNow?.(car.slug);
            }}
            disabled={car.status !== 'AVAILABLE'}
            className={`
              px-4 py-2 rounded-xl text-white font-medium
              transition
              ${car.status === 'AVAILABLE' 
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:opacity-90 cursor-pointer' 
                : 'bg-gray-400 cursor-not-allowed opacity-60'
              }
            `}
          >
            Thuê ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
