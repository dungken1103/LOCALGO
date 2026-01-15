import React from 'react';

const CarInfo = ({ car, specs, rules }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{car.name}</h1>
      <div className="flex items-center mt-2">
        <span className="text-yellow-500">★★★★☆</span> {/* Mock rating */}
        <span className="ml-2 text-gray-600 dark:text-gray-400">{car.location}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="text-center">
          <p className="text-sm text-gray-500">Số chỗ</p>
          <p className="font-semibold">{specs.seats}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Truyền động</p>
          <p className="font-semibold">{specs.transmission}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Nhiên liệu</p>
          <p className="font-semibold">{specs.fuel}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Năm SX</p>
          <p className="font-semibold">{specs.year}</p>
        </div>
      </div>
      <p className="mt-6 text-gray-800 dark:text-gray-200">{car.description}</p>
      {car.features && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Tính năng</h3>
          <ul className="space-y-2">
            {car.features.map((feature, index) => (
              <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                <span className="text-green-500 mr-2">✓</span> {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Quy định sử dụng xe</h3>
        <ul className="space-y-2">
          {rules.map((rule, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">- {rule}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarInfo;