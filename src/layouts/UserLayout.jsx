import { useEffect } from "react";
import useTheme from "../hooks/useTheme";
import UserHeader from "../components/UserHeader";

const UserLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark");
    if (theme === "dark") html.classList.add("dark");
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <UserHeader theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-grow px-4">
        {children}
      </main>
    </div>
  );
};

export default UserLayout;