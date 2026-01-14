import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';

const CarCard = ({ car, onRentNow, onCardClick = () => {} }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onCardClick(car.slug)}
      role="button"
      tabIndex={0}
    >
      <div className="relative overflow-hidden">
        <img src={car.image} alt={car.name} className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300" />
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-400" />}
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{car.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{car.location}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">{car.seats} chỗ • {car.transmission}</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={`w-4 h-4 ${i < car.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">({car.trips} chuyến)</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-orange-500">{car.pricePerDay.toLocaleString()} VNĐ/ngày</span>
          <button
            onClick={(e) => { e.stopPropagation(); onRentNow && onRentNow(car.slug); }}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Thuê ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;