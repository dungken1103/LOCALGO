import React from 'react';
import useTheme from '../../hooks/useTheme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Booking = () => {
  const { theme, toggleTheme } = useTheme();
  const bookings = [
    { id: 1, car: 'Toyota Camry', date: '2025-12-28', price: 100, location: 'Hanoi' },
    { id: 2, car: 'Honda Civic', date: '2025-12-30', price: 80, location: 'Ho Chi Minh City' },
  ];

  return (
    <div className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Đơn đặt xe của bạn</h2>
          <ul className="mt-6 space-y-4">
            {bookings.map((booking) => (
              <li key={booking.id} className="border-b pb-4">
                <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{booking.car}</p>
                <p className="text-gray-600 dark:text-gray-400">Ngày: {booking.date}</p>
                <p className="text-gray-600 dark:text-gray-400">Giá: ${booking.price}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Địa điểm: {booking.location}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;