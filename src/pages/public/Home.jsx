import React from "react";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/rental/Sidebar";
import MainContent from "../../components/rental/MainContent";
import { useState } from "react";
import { useCar } from "../../hooks/useCar";

const Home = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark");
    if (theme === "dark") html.classList.add("dark");
  }, [theme]);

  const [filters, setFilters] = useState({
    priceRange: [0, 1000000],
    brands: [],
    seats: [],
    transmissions: [],
  });

  const { data: cars, isLoading, isError, error } = useCar();
  // console.log('Fetched cars:', cars);
  // Normalize API response to an array for MainContent
  const carsList = Array.isArray(cars) ? cars : cars?.data ?? cars?.cars ?? [];

  const handleCardClick = (slug) => navigate(`/car/${slug}`);
  const handleRentNow = (slug) => navigate(`/car/${slug}`);

  return (
    <div className="app-root">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <Features />
      <main className="container mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Xe nổi bật
        </h2>
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            <main className="flex-1">
              {isLoading && <div>Đang tải danh sách xe...</div>}
              {isError && (
                <div className="text-red-500">
                  Lỗi: {error?.message || "Không thể tải dữ liệu"}
                </div>
              )}
              {!isLoading && !isError && (
                <MainContent
                  cars={carsList}
                  onRentNow={handleRentNow}
                  onCardClick={handleCardClick}
                />
              )}
            </main>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
