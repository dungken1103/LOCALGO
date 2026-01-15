import React from "react";
import CarCard from "./CarCard";

const MainContent = ({ cars, onRentNow, onCardClick }) => {
  const list = Array.isArray(cars) ? cars : [];

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {list.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onRentNow={onRentNow}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
