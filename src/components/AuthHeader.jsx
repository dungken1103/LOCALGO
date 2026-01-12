import ThemeToggle from "./ThemeToggle";

export default function AuthHeader({ theme, toggleTheme }) {
  return (
    <header className={`border-b border-slate-200/10 dark:border-white/5 sticky top-0 z-40 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto flex items-center justify-between gap-4 py-4 px-4">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-md flex items-center justify-center font-bold ${theme === 'dark' ? 'bg-gradient-to-r from-gray-700 to-gray-900 text-blue-200' : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-gray-50 dark:text-gray-950'}`}>LG</div>
            <div className="hidden sm:block">
              <div className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>LocalGo</div>
              <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Thuê xe ô tô nhanh chóng</div>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-3">
          

          <div className=" sm:flex gap-2 items-center">
            <a href="/login" className="text-sm rounded-md text-gray-700 dark:text-gray-200 hover:underline px-5">Đăng nhập</a>
            <a href="/register" className="text-sm rounded-md bg-blue-500 hover:bg-blue-600 text-white px-5 py-1 ">Đăng ký</a>
          </div>

          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </header>
  );
}
