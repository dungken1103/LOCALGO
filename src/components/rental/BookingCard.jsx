import React from 'react';

const BookingCard = ({ car, owner, pickupDate, setPickupDate, returnDate, setReturnDate, onRentNow, availabilityData, isCheckingAvailability }) => {
  return (
    <div className="w-80 sticky top-6 h-fit">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {/* Status Badge */}
        {car.status && (
          <div className="mb-4 text-center">
            <span className={`
              inline-block px-4 py-2 rounded-full text-sm font-semibold
              ${car.status === 'AVAILABLE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
              ${car.status === 'RENTED' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : ''}
              ${car.status === 'UNAVAILABLE' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' : ''}
            `}>
              {car.status === 'AVAILABLE' ? '✓ Sẵn sàng cho thuê' : ''}
              {car.status === 'RENTED' ? '✗ Đang được thuê' : ''}
              {car.status === 'UNAVAILABLE' ? '✗ Không khả dụng' : ''}
            </span>
          </div>
        )}
        
        {/* Availability Check Result */}
        {pickupDate && returnDate && !isCheckingAvailability && availabilityData && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${
            availabilityData.isAvailable 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
          }`}>
            {availabilityData.message}
          </div>
        )}
        
        {isCheckingAvailability && pickupDate && returnDate && (
          <div className="mb-4 p-3 rounded-lg text-sm bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200">
            Đang kiểm tra lịch trống...
          </div>
        )}
        <div className="text-center mb-4">
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{car.pricePerDay?.toLocaleString()} VNĐ</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">/ ngày</p>
        </div>
        <div className="flex items-center mb-4">
          <img src={owner.avatar} alt="Owner" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <p className="font-semibold">{owner.name || 'Chủ xe'}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">★ {owner.rating} ({owner.trips} chuyến)</p>
          </div>
        </div>
        <p className="text-sm mb-2">Tỉ lệ phản hồi: {owner.responseRate}</p>
        <p className="text-sm mb-4">Thời gian phản hồi: {owner.responseTime}</p>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ngày nhận xe</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Ngày trả xe</label>
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <button
          onClick={onRentNow}
          disabled={car.status !== 'AVAILABLE' || (availabilityData && !availabilityData.isAvailable)}
          className={`w-full py-3 rounded-lg font-semibold mb-2 transition
            ${car.status === 'AVAILABLE' && (!availabilityData || availabilityData.isAvailable)
              ? 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 cursor-pointer' 
              : 'bg-gray-400 dark:bg-gray-600 text-gray-200 cursor-not-allowed opacity-60'
            }
          `}
        >
          {car.status !== 'AVAILABLE' 
            ? (car.status === 'RENTED' ? 'Xe đang được thuê' : 'Xe không khả dụng')
            : (availabilityData && !availabilityData.isAvailable)
              ? 'Xe đã có lịch thuê'
              : 'Thuê xe ngay'
          }
        </button>
        <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600">
          Nhắn tin
        </button>
        <div className="mt-4 text-center">
          <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-2 py-1 rounded text-sm">Bảo hiểm đầy đủ</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;