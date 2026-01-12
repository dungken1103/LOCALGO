import React from 'react';
import { useParams } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const CarDetails = () => {
  const { id } = useParams();
  const { theme, toggleTheme } = useTheme();
  const car = {
    id: 1,
    name: 'Toyota Camry',
    price: 100,
    image: '/images/camry.jpg',
    location: 'Hanoi',
    description: 'A comfortable and fuel-efficient sedan, perfect for city and highway driving.',
    features: ['Air Conditioning', 'Automatic Transmission', 'GPS Navigation'],
  };

  return (
    <div className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img src={car.image} alt={car.name} className="w-full h-64 object-cover" />
          <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{car.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mt-2">${car.price}/day</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Địa điểm: {car.location}</p>
            <p className="mt-4 text-gray-800 dark:text-gray-200">{car.description}</p>
            <ul className="mt-4 space-y-2">
              {car.features.map((feature, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">- {feature}</li>
              ))}
            </ul>
            <button className="mt-6 w-full bg-blue-500 dark:bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 dark:hover:bg-blue-700 transition">
              Đặt xe ngay
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CarDetails;