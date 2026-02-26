import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../services/axiosConfig";
import { v4 as uuidv4 } from "uuid";
import { id } from "zod/v4/locales";
import { logConversion } from '../../services/googleAnalytics';

const BANK_CODE = "TPB";
const ACCOUNT_NO = "43311032004";
const ACCOUNT_NAME = "Tran Dinh Dung";

export default function DepositPage() {
  const location = useLocation();
  const bookingInfo = location.state || {};

  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(bookingInfo.amount || "");
  const [txCode, setTxCode] = useState("");
  const [status, setStatus] = useState("IDLE"); // IDLE | PENDING | SUCCESS
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    }
  }, []);
  const userId = user ? user.id : null;

  /* =========================
     TỰ ĐỘNG TẠO QR KHI CÓ BOOKING INFO
  ========================== */
  useEffect(() => {
    if (userId && bookingInfo.amount && status === "IDLE") {
      handleCreate();
    }
  }, [userId, bookingInfo.amount]);

  /* =========================
     POLLING KHI PENDING
  ========================== */
  const checkStatus = async () => {
    const res = await axios.get(`/wallet/transaction/${txCode}`);
    if (res.data.status === "SUCCESS") {
      setStatus("SUCCESS");
    }
  };

  useEffect(() => {
    if (status !== "PENDING") return;
    const interval = setInterval(checkStatus, 4000);
    return () => clearInterval(interval);
  }, [status, txCode]);

  /* =========================
     CREATE DEPOSIT
  ========================== */
  const handleCreate = async () => {
    if (!userId || !amount) return alert("Nhập đầy đủ thông tin");

    const code = `PAYUID${uuidv4().replace(/-/g, "")}`;
    setTxCode(code);
    setStatus("PENDING");

    // 1️⃣ Tạo giao dịch PENDING trên server
    await axios.post(
      "/wallet/handle",
      {
        userId,
        amount: Number(amount),
        sepayOrderId: code,
        bookingId: bookingInfo?.id ?? null,
      },
      { withCredentials: true }
    );

    // 2️⃣ Gọi webhook giả lập Sepay
    await axios.post(
      "/sepay/webhook",
      {
        amount: Number(amount),
        sepayOrderId: code,
        status: "SUCCESS",
      },
      { withCredentials: true }
    );

    // Gửi sự kiện chuyển đổi khi nạp tiền thành công
    logConversion('Deposit Success', parseFloat(amount));

    setStatus("SUCCESS");
  };
  console.log(bookingInfo);

  /* =========================
     QR LINK
  ========================== */
  const qrUrl =
    `https://img.vietqr.io/image/${BANK_CODE}-${ACCOUNT_NO}-compact.png
    ?amount=${amount}
    &addInfo=${txCode}
    &accountName=${ACCOUNT_NAME}`.replace(/\s/g, "");

  return (
    <div className=" min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          {bookingInfo.carName ? "Thanh toán thuê xe" : "Nạp tiền vào ví"}
        </h1>

        {/* BOOKING INFO */}
        {bookingInfo.carName && (
          <div className="rounded-xl bg-blue-50 dark:bg-blue-900/30 p-4 space-y-2">
            <h2 className="font-semibold text-lg text-blue-700 dark:text-blue-300">
              Thông tin đặt xe
            </h2>

            <div className="text-sm text-gray-700 dark:text-gray-200 space-y-1">
              <p>
                <span className="font-medium">Xe:</span> {bookingInfo.carName}
              </p>
              <p>
                <span className="font-medium">Số ngày thuê:</span>{" "}
                {bookingInfo.days} ngày
              </p>
              <p>
                <span className="font-medium">Giá thuê:</span>{" "}
                {bookingInfo.rentalFee?.toLocaleString()} VNĐ
              </p>
              <p>
                <span className="font-medium">Phí dịch vụ:</span>{" "}
                {bookingInfo.serviceFee?.toLocaleString()} VNĐ
              </p>
            </div>

            <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                Tổng thanh toán: {bookingInfo.amount?.toLocaleString()} VNĐ
              </p>
            </div>
          </div>
        )}

        {/* FORM */}
        {status === "IDLE" && !bookingInfo.amount && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                User ID
              </label>
              <input
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-2"
                value={userId}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                Số tiền (VNĐ)
              </label>
              <input
                type="number"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button
              onClick={handleCreate}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Tạo QR thanh toán
            </button>
          </div>
        )}

        {/* QR */}
        {status === "PENDING" && (
          <div className="text-center space-y-4">
            <p className="font-medium text-gray-700 dark:text-gray-200">
              Quét QR để chuyển khoản
            </p>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl inline-block">
              <img src={qrUrl} alt="QR" className="w-64 h-64 mx-auto" />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Nội dung chuyển khoản
            </p>
            <p className="font-mono text-blue-600 dark:text-blue-400 break-all">
              {txCode}
            </p>

            <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400 animate-pulse">
              <span className="text-lg">⏳</span>
              <span>Đang chờ hệ thống xác nhận...</span>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {status === "SUCCESS" && (
          <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-xl text-center space-y-3">
            <h2 className="text-green-700 dark:text-green-400 font-bold text-lg">
              Thanh toán thành công
            </h2>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              Giao dịch đã được ghi nhận vào hệ thống
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
