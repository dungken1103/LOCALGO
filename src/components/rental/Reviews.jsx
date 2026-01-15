import React from 'react';

const Reviews = ({ reviews }) => {
  if (reviews.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Đánh giá từ khách hàng</h3>
      {reviews.map((review, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 last:border-b-0">
          <p className="font-semibold">{review.user}</p>
          <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
          <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;