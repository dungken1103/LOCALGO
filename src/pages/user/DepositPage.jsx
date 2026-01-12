// import React, { useState, useEffect, useRef } from "react";
// import axios from "../../services/axiosConfig";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import { v4 as uuidv4 } from "uuid";

// const DepositPage = () => {
//   const bankCode = "TPB";
//   const accountNumber = "43311032004";
//   const accountName = "Tran Dinh Dung";

//   const [theme, setTheme] = useState("light"); // theme
//   const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

//   const [amount, setAmount] = useState("");
//   const [userId, setUserId] = useState("");
//   const [transactionCode, setTransactionCode] = useState("");
//   const [timestamp, setTimestamp] = useState(Date.now());
//   const [submitted, setSubmitted] = useState(false);
//   const [transactions, setTransactions] = useState([]);

//   const mainRef = useRef(null);

//   const fetchTransactions = async (id) => {
//     try {
//       const res = await axios.get(`/wallet/user/${id}`, {
//         withCredentials: true,
//       });
//       setTransactions(res.data);
//     } catch (error) {
//       console.error("Lỗi khi lấy lịch sử nạp:", error);
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchTransactions(userId);
//     }
//   }, [userId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userId) {
//       alert("Vui lòng nhập User ID.");
//       return;
//     }
//     if (isNaN(amount) || parseFloat(amount) <= 0) {
//       alert("Vui lòng nhập số tiền hợp lệ.");
//       return;
//     }

//     const rawUuid = uuidv4();
//     const cleanUuid = rawUuid.replace(/-/g, "");
//     const code = `PAYUID${cleanUuid}`;
//     setTransactionCode(code);
//     setTimestamp(Date.now());
//     setSubmitted(true);

//     try {
//       await axios.post(
//         `/wallet/handle`,
//         {
//           userId,
//           amount: parseInt(amount),
//           transactionCode: code,
//         },
//         { withCredentials: true }
//       );

//       fetchTransactions(userId);
//     } catch (error) {
//       console.error("Lỗi khi gửi yêu cầu nạp tiền:", error);
//       alert("Không thể gửi yêu cầu nạp tiền. Vui lòng thử lại.");
//     }
//   };

//   const handleCheckout = async () => {
//     if (!userId || !amount) return alert("Nhập UserID và số tiền");

//     try {
//       const res = await axios.post("/wallet/create-checkout", {
//         userId,
//         amount: parseInt(amount),
//       });

//       const url = res.data.checkoutUrl;
//       // Redirect user tới SePay
//       window.location.href = url;
//     } catch (err) {
//       console.error(err);
//       alert("Không tạo được link thanh toán");
//     }
//   };

//   const qrLink = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact.png?amount=${amount}&addInfo=${transactionCode}&accountName=${accountName}&t=${timestamp}`;

//   useEffect(() => {
//     if (!submitted) return;

//     const interval = setInterval(() => {
//       setTimestamp(Date.now());
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [submitted]);

//   return (
//     <div
//       className={`${
//         theme === "dark"
//           ? "bg-gray-900 text-gray-100"
//           : "bg-gray-50 text-gray-900"
//       } min-h-screen font-sans`}
//     >
//       <Header theme={theme} toggleTheme={toggleTheme} />
//       <main ref={mainRef} className="container mx-auto py-12 px-4 max-w-3xl">
//         <div
//           className={`${
//             theme === "dark" ? "bg-gray-800" : "bg-white"
//           } rounded-lg shadow-lg p-8`}
//         >
//           <h1 className="text-3xl font-bold mb-6 text-center">
//             Nạp tiền vào ví
//           </h1>

//           {!submitted ? (
//             <form onSubmit={handleSubmit} className="space-y-5">
//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   User ID
//                 </label>
//                 <input
//                   type="text"
//                   value={userId}
//                   onChange={(e) => setUserId(e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-md ${
//                     theme === "dark"
//                       ? "dark:bg-gray-700 dark:text-gray-100 border-gray-600"
//                       : "border-gray-300"
//                   }`}
//                   placeholder="Nhập User ID"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-1">
//                   Số tiền muốn nạp (VNĐ)
//                 </label>
//                 <input
//                   type="number"
//                   min="1000"
//                   step="1000"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   className={`w-full px-4 py-2 border rounded-md ${
//                     theme === "dark"
//                       ? "dark:bg-gray-700 dark:text-gray-100 border-gray-600"
//                       : "border-gray-300"
//                   }`}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
//               >
//                 Tạo mã QR
//               </button>
//             </form>
//           ) : (
//             <div>
//               <div
//                 className={`${
//                   theme === "dark" ? "bg-gray-700" : "bg-gray-100"
//                 } p-4 rounded mb-4 text-left`}
//               >
//                 <p>
//                   <strong>Ngân hàng:</strong> TP Bank
//                 </p>
//                 <p>
//                   <strong>Số tài khoản:</strong> {accountNumber}
//                 </p>
//                 <p>
//                   <strong>Chủ tài khoản:</strong> {accountName}
//                 </p>
//                 <p>
//                   <strong>Số tiền:</strong> {parseInt(amount).toLocaleString()}{" "}
//                   VNĐ
//                 </p>
//                 <p>
//                   <strong>Nội dung chuyển khoản:</strong>{" "}
//                   <span className="text-blue-600">{transactionCode}</span>
//                 </p>
//               </div>

//               <p className="mb-2 text-center">
//                 Quét mã QR bằng ứng dụng ngân hàng để chuyển khoản:
//               </p>
//               <img
//                 key={timestamp}
//                 src={qrLink}
//                 alt="QR Code"
//                 className="mx-auto w-64 h-64 border rounded-md"
//               />

//               <p
//                 className={`text-sm mt-4 text-center ${
//                   theme === "dark" ? "text-gray-300" : "text-gray-500"
//                 }`}
//               >
//                 Sau khi chuyển khoản, hệ thống sẽ tự động ghi nhận nếu bạn nhập
//                 đúng nội dung.
//               </p>

//               <button
//                 className="mt-4 text-blue-600 hover:underline block mx-auto"
//                 onClick={() => setSubmitted(false)}
//               >
//                 Quay lại
//               </button>
//             </div>
//           )}

//           <div className="mt-12">
//             <h2 className="text-xl font-semibold mb-4">Lịch sử nạp tiền</h2>
//             <div className="overflow-x-auto">
//               <table
//                 className={`${
//                   theme === "dark" ? "bg-gray-700" : "bg-white"
//                 } min-w-full border`}
//               >
//                 <thead>
//                   <tr
//                     className={`${
//                       theme === "dark" ? "bg-gray-600" : "bg-gray-200"
//                     }`}
//                   >
//                     <th className="px-4 py-2 border">Giao dịch</th>
//                     <th className="px-4 py-2 border">Mã nạp</th>
//                     <th className="px-4 py-2 border">Trạng thái</th>
//                     <th className="px-4 py-2 border">Số tiền</th>
//                     <th className="px-4 py-2 border">Ngày nạp</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transactions.length > 0 ? (
//                     transactions.map((item) => (
//                       <tr key={item.id} className="text-center">
//                         <td className="px-4 py-2 border text-red-600 font-medium">
//                           {item.id}
//                         </td>
//                         <td className="px-4 py-2 border">
//                           {item.transactionCode}
//                         </td>
//                         <td className="px-4 py-2 border">
//                           {item.status === "PENDING"
//                             ? "Chờ chuyển khoản"
//                             : "Đã chuyển khoản"}
//                         </td>
//                         <td className="px-4 py-2 border">
//                           {item.amount.toLocaleString()}đ
//                         </td>
//                         <td className="px-4 py-2 border">
//                           {new Date(item.createdAt).toLocaleString()}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td className="px-4 py-2 border text-center" colSpan="5">
//                         Chưa có giao dịch nào
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default DepositPage;
import React, { useState, useEffect, useRef } from "react";
import axios from "../../services/axiosConfig";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { v4 as uuidv4 } from "uuid";

const DepositPage = () => {
  const bankCode = "TPB";
  const accountNumber = "43311032004";
  const accountName = "Tran Dinh Dung";

  const [theme, setTheme] = useState("light"); // theme
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [transactionCode, setTransactionCode] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());
  const [submitted, setSubmitted] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const mainRef = useRef(null);

  const fetchTransactions = async (id) => {
    try {
      const res = await axios.get(`/wallet/user/${id}`, { withCredentials: true });
      setTransactions(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy lịch sử nạp:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchTransactions(userId);
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !amount || parseFloat(amount) <= 0) return alert("Nhập UserID và số tiền hợp lệ");

    const rawUuid = uuidv4();
    const code = `PAYUID${rawUuid.replace(/-/g, "")}`;
    setTransactionCode(code);
    setTimestamp(Date.now());
    setSubmitted(true);

    try {
      await axios.post(
        "/wallet/handle",
        { userId, amount: parseInt(amount), transactionCode: code },
        { withCredentials: true }
      );
      fetchTransactions(userId);
    } catch (err) {
      console.error(err);
      alert("Không thể gửi yêu cầu nạp tiền");
    }
  };

  const handleCheckout = async () => {
    if (!userId || !amount) return alert("Nhập UserID và số tiền");

    try {
      const res = await axios.post("/wallet/create-checkout", {
        userId,
        amount: parseInt(amount),
      });
      const url = res.data.checkoutUrl;
      window.location.href = url; // redirect sang SePay
    } catch (err) {
      console.error(err);
      alert("Không tạo được link thanh toán");
    }
  };

  const qrLink = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact.png?amount=${amount}&addInfo=${transactionCode}&accountName=${accountName}&t=${timestamp}`;

  useEffect(() => {
    if (!submitted) return;
    const interval = setInterval(() => setTimestamp(Date.now()), 60000);
    return () => clearInterval(interval);
  }, [submitted]);

  return (
    <div className={`${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"} min-h-screen font-sans`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main ref={mainRef} className="container mx-auto py-12 px-4 max-w-3xl">
        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-8`}>
          <h1 className="text-3xl font-bold mb-6 text-center">Nạp tiền vào ví</h1>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md ${theme === "dark" ? "dark:bg-gray-700 dark:text-gray-100 border-gray-600" : "border-gray-300"}`}
                  placeholder="Nhập User ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Số tiền muốn nạp (VNĐ)</label>
                <input
                  type="number"
                  min="1000"
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-md ${theme === "dark" ? "dark:bg-gray-700 dark:text-gray-100 border-gray-600" : "border-gray-300"}`}
                  required
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4 mt-4">
                <button
                  type="submit"
                  className="w-full md:w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Tạo mã QR
                </button>
                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full md:w-1/2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                >
                  Thanh toán SePay
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className={`${theme === "dark" ? "bg-gray-700" : "bg-gray-100"} p-4 rounded mb-4 text-left`}>
                <p><strong>Ngân hàng:</strong> TP Bank</p>
                <p><strong>Số tài khoản:</strong> {accountNumber}</p>
                <p><strong>Chủ tài khoản:</strong> {accountName}</p>
                <p><strong>Số tiền:</strong> {parseInt(amount).toLocaleString()} VNĐ</p>
                <p><strong>Nội dung chuyển khoản:</strong> <span className="text-blue-600">{transactionCode}</span></p>
              </div>

              <p className="mb-2 text-center">Quét mã QR bằng ứng dụng ngân hàng để chuyển khoản:</p>
              <img key={timestamp} src={qrLink} alt="QR Code" className="mx-auto w-64 h-64 border rounded-md" />

              <p className={`text-sm mt-4 text-center ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
                Sau khi chuyển khoản, hệ thống sẽ tự động ghi nhận nếu bạn nhập đúng nội dung.
              </p>

              <button className="mt-4 text-blue-600 hover:underline block mx-auto" onClick={() => setSubmitted(false)}>
                Quay lại
              </button>
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Lịch sử nạp tiền</h2>
            <div className="overflow-x-auto">
              <table className={`${theme === "dark" ? "bg-gray-700" : "bg-white"} min-w-full border`}>
                <thead>
                  <tr className={`${theme === "dark" ? "bg-gray-600" : "bg-gray-200"}`}>
                    <th className="px-4 py-2 border">Giao dịch</th>
                    <th className="px-4 py-2 border">Mã nạp</th>
                    <th className="px-4 py-2 border">Trạng thái</th>
                    <th className="px-4 py-2 border">Số tiền</th>
                    <th className="px-4 py-2 border">Ngày nạp</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length > 0 ? transactions.map(item => (
                    <tr key={item.id} className="text-center">
                      <td className="px-4 py-2 border text-red-600 font-medium">{item.id}</td>
                      <td className="px-4 py-2 border">{item.transactionCode}</td>
                      <td className="px-4 py-2 border">{item.status === "PENDING" ? "Chờ chuyển khoản" : "Đã chuyển khoản"}</td>
                      <td className="px-4 py-2 border">{item.amount.toLocaleString()}đ</td>
                      <td className="px-4 py-2 border">{new Date(item.createdAt).toLocaleString()}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td className="px-4 py-2 border text-center" colSpan="5">Chưa có giao dịch nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DepositPage;
