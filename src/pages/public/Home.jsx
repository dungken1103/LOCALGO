import React from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../../hooks/useTheme';
import Header from '../../components/Header';
import Hero from '../../components/Hero';
import Features from '../../components/Features';
import Footer from '../../components/Footer';
import { useEffect } from 'react';

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
  const html = document.documentElement;
  html.classList.remove('dark');
  if (theme === 'dark') html.classList.add('dark');
}, [theme]);

  const cars = [
    { id: 1, name: 'Toyota Camry', price: 100, image: '/images/camry.jpg', location: 'Hanoi' },
    { id: 2, name: 'Honda Civic', price: 80, image: '/images/civic.jpg', location: 'Ho Chi Minh City' },
    { id: 3, name: 'Mazda 3', price: 90, image: '/images/mazda3.jpg', location: 'Da Nang' },
  ];

  return (
    <div className="app-root" >
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <Features />
      <main className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Xe nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded" />
              <div className="mt-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{car.name}</h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">${car.price}/day</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Địa điểm: {car.location}</p>
                <Link to={`/car/${car.id}`} className="block mt-4 text-center bg-blue-500 dark:bg-blue-600 text-white py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;