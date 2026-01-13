import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useTheme from '../../../hooks/useTheme';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function CarListPage() {
  const { theme, toggleTheme } = useTheme();
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove('dark');
    if (theme === 'dark') html.classList.add('dark');
  }, [theme]);

  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get('/cars');
        setCars(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCars();
  }, []);

  return (
    <div className="app-root">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Danh sách xe
        </h2>

        {isLoading ? (
          <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car.id}
                className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow"
              >
                {car.image && (
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded"
                  />
                )}
                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{car.name}</h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">{car.pricePerDay}/day</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Brand: {car.brand}</p>
                  <Link
                    to={`/car/${car.id}`}
                    className="block mt-4 text-center bg-blue-500 dark:bg-blue-600 text-white py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
