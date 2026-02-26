import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./output.css";
import App from "./App.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { initGA, logPageView, logScrollDepth } from './services/googleAnalytics';

const queryClient = new QueryClient();

// Khởi tạo Google Analytics với Measurement ID
initGA('G-09DG9LRV5G');

// Theo dõi pageview khi ứng dụng được tải
logPageView(window.location.pathname);

// Theo dõi mức độ cuộn trang
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = Math.round((scrollTop / docHeight) * 100);

  if (scrollPercent % 25 === 0) {
    logScrollDepth(scrollPercent);
  }
});

const Main = () => (
  <StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HashRouter>
  </StrictMode>
);

createRoot(document.getElementById("root")).render(<Main />);
