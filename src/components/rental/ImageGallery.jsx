import React from 'react';

const ImageGallery = ({ images, currentImageIndex, setCurrentImageIndex }) => {
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      {/* Gallery hình ảnh */}
      <div className="relative mb-6">
        <img
          src={images[currentImageIndex]}
          alt="Car"
          className="w-full h-96 object-cover rounded-lg transition-opacity duration-500"
        />
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          ‹
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          ›
        </button>
        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'}`}
            />
          ))}
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex space-x-2 mb-6 overflow-x-auto">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </>
  );
};

export default ImageGallery;