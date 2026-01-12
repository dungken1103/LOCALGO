import React from 'react'
import { Car, DollarSign, Clock } from 'lucide-react'

const items = [
  { title: 'Đa dạng xe', desc: 'Từ xe tiết kiệm đến SUV và xe sang.', icon: Car },
  { title: 'Giá minh bạch', desc: 'Giá niêm yết, không phí ẩn.', icon: DollarSign },
  { title: 'Nhận/Trả linh hoạt', desc: 'Giao/nhận theo lịch của bạn.', icon: Clock }
]

export default function Features() {
  return (
    <section id="features" className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Tại sao chọn LocalGo</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">Dịch vụ thuê xe uy tín, đa dạng và tiện lợi — mọi thứ bạn cần cho chuyến đi.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((it, i) => {
          const Icon = it.icon
          return (
            <div key={i} className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-slate-200/5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{it.title}</h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{it.desc}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
