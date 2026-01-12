import React, { useEffect, useState } from "react";
import useTheme from '../../../hooks/useTheme';
import DashboardHeader from "../../../components/dashboard/DashboardHeader";
import DashboardSidebar from "../../../components/dashboard/DashboardSidebar";
import DashboardContent from "../../../components/dashboard/DashboardContent";

export default function OwnerDashboardPage() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Đồng bộ theme giống Home
    const html = document.documentElement;
    html.classList.remove("dark");
    if (theme === "dark") html.classList.add("dark");
  }, [theme]);

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader theme={theme} toggleTheme={toggleTheme} />
        <DashboardContent />
      </div>
    </div>
  );
}
