import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../../services/axiosConfig";
import { v4 as uuidv4 } from "uuid";

const BANK_CODE = "TPB";
const ACCOUNT_NO = "43311032004";
const ACCOUNT_NAME = "Tran Dinh Dung";

const PaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
  const [txCode, setTxCode] = useState("");
  const [status, setStatus] = useState("IDLE"); // IDLE | PENDING | SUCCESS
  const [carId, setCarId] = useState("");
  const [days, setDays] = useState(1);

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

    // Lấy params từ URL
    const amt = searchParams.get("amount");
    const cid = searchParams.get("carId");
    const d = searchParams.get("days");
    if (amt) setAmount(amt);
    if (cid) setCarId(cid);
    if (d) setDays(d);
  }, [searchParams]);

  const userId = user ? user.id : null;

  /* =========================
     POLLING KHI PENDING
  ========================== */
  const checkStatus = async () => {
    const res = await axios.get(`/wallet/transaction/${txCode}`);
    if (res.data.status === "SUCCESS") {
      setStatus("SUCCESS");
      // Có thể tạo booking ở đây hoặc redirect
      // Ví dụ: navigate('/booking-success');
    }
  };

  useEffect(() => {
    if (status !== "PENDING") return;
    const interval = setInterval(checkStatus, 4000);
    return () => clearInterval(interval);
  }, [status, txCode]);

  /* =========================
     CREATE PAYMENT
  ========================== */
  const handleCreate = async () => {
    if (!userId || !amount) return alert("Thiếu thông tin thanh toán");

    const code = `BOOKING${uuidv4().replace(/-/g, "")}`;
    setTxCode(code);
    setStatus("PENDING");

    // 1️⃣ Tạo giao dịch PENDING trên server (có thể là booking payment)
    await axios.post(
      "/wallet/handle",
      {
        userId,
        amount: Number(amount),
        sepayOrderId: code,
        type: "booking", // Thêm type để phân biệt
        carId,
        days,
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
  };

  /* =========================
     QR LINK
  ========================== */
  const qrUrl =
    `https://img.vietqr.io/image/${BANK_CODE}-${ACCOUNT_NO}-compact.png
    ?amount=${amount}
    &addInfo=${txCode}
    &accountName=${ACCOUNT_NAME}`.replace(/\s/g, "");

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Thanh toán đặt xe</h1>

      {/* FORM */}
      {status === "IDLE" && (
        <div className="space-y-4">
          <input
            placeholder="User ID"
            className="border p-2 w-full"
            value={userId}
            readOnly
          />
          <input
            type="number"
            placeholder="Số tiền"
            className="border p-2 w-full"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white w-full py-2 rounded"
          >
            Tạo QR thanh toán
          </button>
        </div>
      )}

      {/* QR */}
      {status === "PENDING" && (
        <div className="text-center space-y-3">
          <p className="font-medium">Quét QR để chuyển khoản</p>
          <img src={qrUrl} alt="QR" className="mx-auto w-64" />
          <p className="text-sm">
            Nội dung: <b className="text-blue-600">{txCode}</b>
          </p>
          <p className="text-yellow-600 animate-pulse">
            ⏳ Đang chờ hệ thống xác nhận...
          </p>
        </div>
      )}

      {/* SUCCESS */}
      {status === "SUCCESS" && (
        <div className="bg-green-100 p-4 rounded text-center">
          <h2 className="text-green-700 font-bold text-lg">
            ✅ Thanh toán thành công
          </h2>
          <p>Đặt xe của bạn đã được xác nhận!</p>
          <button
            className="mt-3 underline text-blue-600"
            onClick={() => navigate('/')}
          >
            Về trang chủ
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;