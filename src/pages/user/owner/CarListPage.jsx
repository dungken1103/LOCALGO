import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { useOwnerCars } from "../../../hooks/useCar";
import { Pen } from "lucide-react";
import CarDropdownMenu from "../../../components/owner/CarDropdownMenu";

export default function CarListPage() {
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark");
    if (theme === "dark") html.classList.add("dark");
  }, [theme]);

  const {
    data: carsData,
    isLoading: loadingCars,
  } = useOwnerCars();

  return (
    <>
    <main className="">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Danh sách xe
        </h2>

        {loadingCars ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            Loading...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carsData.map((car) => (
              <div
                key={car.slug}
                className="border rounded-lg p-4 shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow relative"
              >
                {/* Three-dot menu in top right corner */}
                <div className="absolute top-4 right-4 z-10">
                  <CarDropdownMenu car={car} />
                </div>

                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="mt-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {car.name}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {car.pricePerDay}/day
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Brand: {car.brand}
                  </p>
                  <Link
                    to={`/car/${car.slug}`}
                    className="block mt-4 text-center bg-blue-500 dark:bg-blue-600 text-white py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                  >
                    Xem chi tiết
                  </Link>
                  <Link to={`/owners/edit-car/${car.slug}`}
                  className="block mt-4 text-center bg-green-500 dark:bg-green-600 text-black py-2 rounded hover:bg-green-600 dark:hover:bg-green-700 transition">
                   Chỉnh sửa xe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
