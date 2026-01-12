import React, { useEffect, useState } from "react";
import axios from "../../services/axiosConfig";
import { v4 as uuidv4 } from "uuid";

const BANK_CODE = "TPB";
const ACCOUNT_NO = "43311032004";
const ACCOUNT_NAME = "Tran Dinh Dung";

export default function DepositPage() {
  
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState("");
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

    await axios.post(
      "/wallet/handle",
      {
        userId,
        amount: Number(amount),
        sepayOrderId: code,
      },
      { withCredentials: true }
    );

    fetchTransactions();
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
      <h1 className="text-2xl font-bold text-center">Nạp tiền ví</h1>

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
            ✅ Nạp tiền thành công
          </h2>
          <button
            className="mt-3 underline text-blue-600"
            onClick={() => {
              setStatus("IDLE");
              setAmount("");
              setTxCode("");
            }}
          >
            Nạp thêm
          </button>
        </div>
      )}

      {/* HISTORY */}
      <div>
        <h2 className="font-semibold mb-2">Lịch sử giao dịch</h2>
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-1">Mã</th>
              <th className="border p-1">Tiền</th>
              <th className="border p-1">Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="text-center">
                <td className="border">{t.sepayOrderId}</td>
                <td className="border">{t.amount.toLocaleString()}đ</td>
                <td className="border">
                  {t.status === "PENDING" ? "⏳ Chờ" : "✅ Thành công"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
