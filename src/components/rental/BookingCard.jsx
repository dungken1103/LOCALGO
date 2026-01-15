import React from 'react';

const BookingCard = ({ car, owner, pickupDate, setPickupDate, returnDate, setReturnDate, onRentNow }) => {
  return (
    <div className="w-80 sticky top-6 h-fit">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
          className="w-full bg-blue-500 dark:bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 mb-2"
        >
          Thuê xe ngay
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