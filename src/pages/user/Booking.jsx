import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService";
import useTheme from "../../hooks/useTheme";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Booking = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const bookingData = await bookingService.getBySlug(slug);
        setBooking(bookingData);
        console.log(bookingData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!booking) return <div>Dữ liệu không đầy đủ</div>;

  const { car, owner, renter, amount, startDate, endDate } = booking.data;
  const rentalDays = Math.max(
    1,
    Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
    ),
  );

  const pricePerDay = car.pricePerDay || 0;
  const rentalFee = rentalDays * pricePerDay;
  const serviceFee = rentalFee * 0.05;
  const total = rentalFee + serviceFee;

  const handleConfirm = () => {
    const bookingInfo = {
      id: booking.data.id,
      carName: car.name,
      days: rentalDays,
      rentalFee,
      serviceFee,
      amount: total,
      carId: car.id,
    };
    navigate("/deposit", { state: bookingInfo });
  };
  return (
    <div className="app-root">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main className="container mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Trang chủ /{" "}
          <span className="text-gray-900 dark:text-white font-medium">
            Xác nhận đặt xe
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* LEFT – 75% */}
          <div className="flex-1 lg:basis-[75%] space-y-8">
            {/* Thông tin chuyến đi */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8">
              <h2 className="text-2xl font-bold mb-6">Thông tin chuyến đi</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base">
                <div>
                  <p className="text-gray-500 mb-1">Tên xe</p>
                  <p className="font-semibold text-lg">{car.name}</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Giá / ngày</p>
                  <p className="font-semibold text-lg">{car.pricePerDay}đ</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Chủ xe</p>
                  <p className="font-medium">{owner.name}</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Người thuê</p>
                  <p className="font-medium">{renter.name}</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Nhận xe</p>
                  <p className="font-medium">{startDate}</p>
                </div>

                <div>
                  <p className="text-gray-500 mb-1">Trả xe</p>
                  <p className="font-medium">{endDate}</p>
                </div>
              </div>
            </section>

            {/* Hợp đồng thuê xe */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8">
              <h3 className="text-2xl font-semibold mb-5">Hợp đồng thuê xe</h3>

              <div className="h-80 overflow-y-auto text-base leading-relaxed text-gray-700 dark:text-gray-300 space-y-4 border rounded-xl p-6">
                <p>
                  Bên cho thuê đồng ý cho Bên thuê sử dụng xe trong thời gian đã
                  thỏa thuận. Bên thuê cam kết sử dụng xe đúng mục đích, không
                  vi phạm pháp luật.
                </p>
                <p>
                  Bên thuê chịu trách nhiệm bảo quản xe, không tự ý sửa chữa
                  hoặc thay đổi kết cấu xe khi chưa có sự đồng ý của Bên cho
                  thuê.
                </p>
                <p>
                  Mọi thiệt hại phát sinh trong quá trình thuê xe do lỗi của Bên
                  thuê sẽ do Bên thuê chịu trách nhiệm bồi thường.
                </p>
                <p>
                  Xe phải được trả đúng thời gian và trong tình trạng ban đầu
                  (ngoại trừ hao mòn tự nhiên).
                </p>
                <p>
                  Hợp đồng có hiệu lực kể từ thời điểm xác nhận đặt xe thành
                  công.
                </p>
              </div>
            </section>
          </div>

          {/* RIGHT – 25% */}
          <aside className="w-full lg:basis-[25%]">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 sticky top-28">
              <h3 className="text-base font-semibold mb-4">Thanh toán</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>
                    Tiền thuê ({pricePerDay}đ × {rentalDays} ngày)
                  </span>
                  <span>{rentalFee}đ</span>
                </div>

                <div className="flex justify-between">
                  <span>Phí dịch vụ (5%)</span>
                  <span>{serviceFee}đ</span>
                </div>

                <div className="border-t pt-2 flex justify-between font-semibold text-base">
                  <span>Tổng</span>
                  <span className="text-blue-600">{total}đ</span>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition"
              >
                Xác nhận & ký hợp đồng
              </button>

              <button
                onClick={() => navigate("/")}
                className="mt-3 w-full text-xs text-gray-500 hover:underline"
              >
                ← Quay về trang chủ
              </button>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
