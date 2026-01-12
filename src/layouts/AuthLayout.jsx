import { useEffect } from "react";
import useTheme from "../hooks/useTheme";
import AuthHeader from "../components/AuthHeader";

const AuthLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark");
    if (theme === "dark") html.classList.add("dark");
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <AuthHeader theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-grow flex items-center justify-center px-4 mx-5">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
