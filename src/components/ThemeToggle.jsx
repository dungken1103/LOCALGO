import React from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = ({ theme, toggleTheme }) => {
  const isDark = theme === "dark";

  return (
    <div
      onClick={toggleTheme}
      className="w-[65px] h-[32px] bg-gray-300 dark:bg-gray-700
                 rounded-full flex items-center px-1 cursor-pointer
                 relative transition-all duration-300"
    >
      {/* Nút tròn */}
      <div
        className={`
          w-[28px] h-[28px] bg-white dark:bg-gray-900 
          rounded-full  flex items-center justify-center
          transform transition-all duration-300
          ${isDark ? "translate-x-8" : ""}
        `}
      >
        {isDark ? (
          <Moon size={22} className="text-blue-400" />
        ) : (
          <Sun size={22} className="text-yellow-500" />
        )}
      </div>
    </div>
  );
};

export default ThemeToggle;
