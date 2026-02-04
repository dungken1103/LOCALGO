import { useEffect } from "react";
import useTheme from "../hooks/useTheme";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const {user} = useAuth();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <DashboardHeader theme={theme} toggleTheme={toggleTheme} />

      {/* Body */}
      <div className="flex pt-16">
        {/* Sidebar */}
        <DashboardSidebar user={user} />

        {/* Main content */}
        <main className="flex-1 ml-64 p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
