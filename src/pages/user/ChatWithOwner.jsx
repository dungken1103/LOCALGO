import React from "react";

export default function ChatWithOwner() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-[70vh]">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">CT</div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">Chủ xe: Nguyễn Văn A</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Đang hoạt động</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          <div className="flex justify-end">
            <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg max-w-xs">Chào anh, xe còn sẵn không ạ?</div>
          </div>
          <div className="flex justify-start">
            <div className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 px-4 py-2 rounded-lg max-w-xs">Chào bạn, xe còn nhé!</div>
          </div>
        </div>
        <form className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
          <input
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
            placeholder="Nhập tin nhắn..."
          />
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold transition">Gửi</button>
        </form>
      </div>
    </div>
  );
}
