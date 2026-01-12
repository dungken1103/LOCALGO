import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./output.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home.jsx";
import CarDetails from "./pages/user/CarDetails.jsx";
import Booking from "./pages/user/Booking.jsx";
import { AuthProvider } from "./context/AuthContext";
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

const queryClient = new QueryClient();

const Main = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/owner" element={<OwnerDashboard />} />
              <Route path="/chat/:ownerId" element={<ChatWithOwner />} />
              <Route path="/contract/:bookingId" element={<RentalContract />} />
              <Route path="/deposit" element={<DepositPage />} />
              <Route path="/withdraw" element={<WithdrawPage />} />
              <Route path="/*" element={<NotFoundPage />} />
              <Route path="/" element={<Home />} />
              <Route path="/app" element={<App />} />
              <Route path="/car/:id" element={<CarDetails />} />
              <Route path="/bookings" element={<Booking />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login-success" element={<GoogleLoginSuccess />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);

createRoot(document.getElementById("root")).render(<Main />);
