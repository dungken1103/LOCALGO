import React from 'react';

const QRCodeDisplay = ({ value, size = 256 }) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={value}
        width={size}
        height={size}
        alt="SePay QR"
      />
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Quét mã QR để thanh toán
      </p>
    </div>
  );
};

export default QRCodeDisplay;
