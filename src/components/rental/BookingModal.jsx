import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingModal = ({ showModal, setShowModal, car, days, rentalFee, serviceFee, total }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    const bookingInfo = {
      carName: car.name,
      days,
      rentalFee,
      serviceFee,
      amount: total,
      carId: car.id,
    };
    navigate('/deposit', { state: bookingInfo });
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-bold mb-4">Xác nhận đặt xe</h2>
        <div className="mb-4">
          <p><strong>Xe:</strong> {car.name}</p>
          <p><strong>Giá thuê:</strong> {rentalFee.toLocaleString()} VNĐ ({days} ngày)</p>
          <p><strong>Phí dịch vụ:</strong> {serviceFee.toLocaleString()} VNĐ</p>
          <p><strong>Tổng:</strong> {total.toLocaleString()} VNĐ</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Hủy
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-blue-500 dark:bg-blue-600 text-white py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;