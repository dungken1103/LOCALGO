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
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/owner" element={<OwnerDashboard />} />
      <Route path="/chat/:ownerId" element={<ChatWithOwner />} />
      <Route path="/contract/:bookingId" element={<RentalContract />} />
      <Route path="/deposit" element={<DepositPage />} />
      <Route path="/withdraw" element={<WithdrawPage />} />
      <Route path="/" element={<Home />} />
      <Route path="/app" element={<App />} />
      <Route path="/car/:id" element={<CarDetails />} />
      <Route path="/bookings" element={<Booking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login-success" element={<GoogleLoginSuccess />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
