import "./output.css";
import "./index.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import useTheme from "./hooks/useTheme";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home.jsx";
import CarDetails from "./pages/user/CarDetails.jsx";
import Booking from "./pages/user/Booking.jsx";
import Login from "./pages/public/Login.jsx";
import Register from "./pages/public/Register.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import OwnerDashboard from "./pages/user/OwnerDashboard.jsx";
import ChatWithOwner from "./pages/user/ChatWithOwner.jsx";
import RentalContract from "./pages/user/RentalContract.jsx";
import DepositPage from "./pages/user/DepositPage.jsx";
import WithdrawPage from "./pages/user/WithdrawPage.jsx";
import NotFoundPage from "./pages/public/NotFoundPage.jsx";
import GoogleLoginSuccess from "./components/GoogleLoginSuccess";
import OwnerDashboardPage from "./pages/user/owner/OwnerDashboardPage";
import CarFormPage from "./pages/user/owner/CarFormPage";
import CarRentalPage from "./pages/CarRentalPage.jsx";
import UserLayout from "./layouts/UserLayout";
import BookingPage from "./pages/user/Booking.jsx";
import MyBookings from "./pages/user/MyBookings.jsx";
function App() {
  // initialize theme hook (keeps in localStorage and on <html> class)
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(theme === "dark" ? "dark" : "light");
  }, [theme]);

  return (
    <Routes>
      <Route path="/admin" element={<UserLayout><AdminDashboard /></UserLayout>} />
      <Route path="/owner" element={<UserLayout><OwnerDashboard /></UserLayout>} />
      <Route path="/chat/:ownerId" element={<UserLayout><ChatWithOwner /></UserLayout>} />
      <Route path="/contract/:bookingId" element={<UserLayout><RentalContract /></UserLayout>} />
      <Route path="/deposit" element={<UserLayout><DepositPage /></UserLayout>} />
      <Route path="/withdraw" element={<UserLayout><WithdrawPage /></UserLayout>} />
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<App />} />
      <Route path="/car/:id" element={<UserLayout><CarDetails /></UserLayout>} />
      <Route path="/bookings" element={<UserLayout><Booking /></UserLayout>} />
      <Route path="/bookings/:slug" element={<BookingPage />} />
      <Route path="/my-bookings" element={<UserLayout><MyBookings /></UserLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login-success" element={<GoogleLoginSuccess />} />
      <Route path="/owner/dashboard" element={<UserLayout><OwnerDashboardPage /></UserLayout>} />
      <Route path="/owner/cars/new" element={<UserLayout><CarFormPage /></UserLayout>} />
      <Route path="/owner/cars/edit/:id" element={<CarFormPage isUpdate={true} />} />
      <Route path="/rental" element={<UserLayout><CarRentalPage /></UserLayout>} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
