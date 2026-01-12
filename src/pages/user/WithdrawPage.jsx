import React, { useState } from 'react';
import useTheme from '../../hooks/useTheme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const WithdrawPage = () => {
  const { theme, toggleTheme } = useTheme();
  const [amount, setAmount] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankName, setBankName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = () => {
    setIsLoading(true);
    // Handle withdrawal logic here
    alert(`Rút tiền: ${amount} VNĐ từ tài khoản ${bankAccount} tại ${bankName}`);
    setIsLoading(false);
  };

  return (
    <div className={`app-root ${theme} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="container mx-auto py-12 px-4 max-w-4xl">
        {isLoading && <p>Loading...</p>}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Rút tiền</h2>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Số tiền (VNĐ)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Nhập số tiền"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bankAccount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Số tài khoản ngân hàng
            </label>
            <input
              type="text"
              id="bankAccount"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Nhập số tài khoản"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tên ngân hàng
            </label>
            <input
              type="text"
              id="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Nhập tên ngân hàng"
            />
          </div>
          <button
            onClick={handleWithdraw}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            Rút tiền
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WithdrawPage;
