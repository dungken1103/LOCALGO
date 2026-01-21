import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import { useCarDetails } from "../../hooks/useCar";
import Footer from "../../components/Footer";
import ImageGallery from "../../components/rental/ImageGallery";
import CarInfo from "../../components/rental/CarInfo";
import Reviews from "../../components/rental/Reviews";
import BookingCard from "../../components/rental/BookingCard";
import BookingModal from "../../components/rental/BookingModal";
import { useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService";

const CarDetails = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { data: car, isLoading, error } = useCarDetails(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div
        className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center`}
      >
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center`}
      >
        <div className="text-xl text-red-500">Lỗi khi tải dữ liệu xe</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div
        className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center`}
      >
        <div className="text-xl">Không tìm thấy xe</div>
      </div>
    );
  }

  const images = car.images || [car.image];
  const specs = car.specs || {
    seats: "4",
    transmission: "Tự động",
    fuel: "Xăng",
    year: "2020",
  };
  const rules = car.rules || [
    "Không hút thuốc",
    "Không mang thú cưng",
    "Trả xe đúng giờ",
  ];
  const reviews = car.reviews || [];
  const owner = car.owner || {
    avatar: "/default-avatar.png",
    rating: 4.5,
    trips: 120,
    responseRate: "95%",
    responseTime: "1 giờ",
  };

  const calculateTotal = () => {
    const days =
      pickupDate && returnDate
        ? Math.max(
            1,
            Math.ceil(
              (new Date(returnDate) - new Date(pickupDate)) /
                (1000 * 60 * 60 * 24),
            ),
          )
        : 1;
    const rentalFee = days * (car.pricePerDay || 0);
    const serviceFee = rentalFee * 0.05; // 10% phí dịch vụ
    return { days, rentalFee, serviceFee, total: rentalFee + serviceFee };
  };
  const { days, rentalFee, serviceFee, total } = calculateTotal();
  const handleRentNow = async () => {
    if (!pickupDate || !returnDate) {
      alert("Vui lòng chọn ngày nhận và trả xe");
      return;
    }

    try {
      const booking = await bookingService.create({
        carId: car.id,
        startDate: pickupDate,
        endDate: returnDate,
        slug: "booking" + Math.random().toString(36).substr(2, 9),
      });

      console.log("Booking response:", booking); // Thêm log để kiểm tra response từ API

      if (booking && booking.slug) {
        navigate(`/bookings/${booking.slug}`);
      } else {
        alert("Không thể tạo booking: slug không tồn tại trong response");
      }
    } catch (error) {
      console.error(error);
      alert("Không thể tạo booking");
    }
  };

  return (
    <div
      className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen`}
    >
      <main className="container mx-auto py-12 px-4 max-w-6xl flex gap-8">
        {/* Phần hình ảnh và thông tin xe */}
        <div className="flex-1">
          <ImageGallery
            images={images}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
          <CarInfo car={car} specs={specs} rules={rules} />
          <Reviews reviews={reviews} />
        </div>

        {/* Card đặt xe */}
        <BookingCard
          car={car}
          owner={owner}
          pickupDate={pickupDate}
          setPickupDate={setPickupDate}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          onRentNow={handleRentNow}
        />
      </main>

      <BookingModal
        showModal={showModal}
        setShowModal={setShowModal}
        car={car}
        days={days}
        rentalFee={rentalFee}
        serviceFee={serviceFee}
        total={total}
      />

      <Footer />
    </div>
  );
};

export default CarDetails;
