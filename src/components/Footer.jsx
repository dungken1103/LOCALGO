import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200/10 dark:border-white/5 bg-white dark:bg-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-3 py-8 px-4 text-sm text-slate-600 dark:text-slate-400">
        <div>
          <div className="text-base font-bold text-gray-900 dark:text-white">LocalGo</div>
          <div className="mt-1">© {new Date().getFullYear()} — Thuê xe ô tô</div>
        </div>
      </div>
    </footer>
  )
}
