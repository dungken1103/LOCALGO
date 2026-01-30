import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaUniversity, FaCreditCard, FaCamera, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { useProfile } from '../../hooks/useProfile';
import api from '../../services/axiosConfig';

const ApplyOwner = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { data: profileData, isLoading: isLoadingProfile } = useProfile(user?.userId || user?.id);

  const [formData, setFormData] = useState({
    avatar: null,
    fullName: '',
    email: '',
    phone: '',
    bank: '',
    accountNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Auto-fill form with existing user data
  useEffect(() => {
    if (profileData) {
      setFormData(prev => ({
        avatar: prev.avatar,
        fullName: profileData.fullName || profileData.name || prev.fullName,
        email: profileData.email || prev.email,
        phone: profileData.phone || profileData.phoneNumber || prev.phone,
        bank: profileData.bank || profileData.bankName || prev.bank,
        accountNumber: profileData.accountNumber || profileData.bankAccountNumber || prev.accountNumber
      }));

      // Set preview image if avatar exists
      if (profileData.avatar || profileData.avatarUrl || profileData.image) {
        setPreviewImage(profileData.avatar || profileData.avatarUrl || profileData.image);
      }
    }
  }, [profileData]);

  const banks = [
    'Vietcombank',
    'VietinBank',
    'BIDV',
    'Agribank',
    'Techcombank',
    'MB Bank',
    'ACB',
    'VPBank',
    'TPBank'
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

<<<<<<< HEAD
    // if (!formData.avatar) {
    //   newErrors.avatar = 'Vui lòng tải lên ảnh đại diện';
    // }

=======
>>>>>>> b25d001e2ad992d030b7a76272da219f732c28e4
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Họ và tên phải có ít nhất 3 ký tự';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải có đúng 10 số';
    }

    if (!formData.bank) {
      newErrors.bank = 'Vui lòng chọn ngân hàng';
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = 'Vui lòng nhập số tài khoản';
    } else if (formData.accountNumber.trim().length < 6) {
      newErrors.accountNumber = 'Số tài khoản phải có ít nhất 6 số';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, avatar: 'Kích thước ảnh không được vượt quá 5MB' });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, avatar: 'Vui lòng chọn file ảnh' });
        return;
      }

      setFormData({ ...formData, avatar: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Clear error
      const newErrors = { ...errors };
      delete newErrors.avatar;
      setErrors(newErrors);
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData({ ...formData, avatar: null });
    setPreviewImage(null);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Backend only needs email, phone, and bankAccount
      // fullName and bankName are taken from JWT token
      const requestBody = {
        email: formData.email,
        phone: formData.phone,
        bankAccount: formData.accountNumber,
        avatar: 'abc.jpg' // Placeholder; actual file upload handling not implemented
      };

      console.log('Request body:', requestBody);

      const response = await api({
        method: 'post',
        url: '/users/apply-owner',
        data: requestBody,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${localStorage.getItem('token')}`,
        },
      });
      
      // Success
      setIsSuccess(true);
      
      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          avatar: null,
          fullName: '',
          email: '',
          phone: '',
          bank: '',
          accountNumber: ''
        });
        setPreviewImage(null);
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      console.error('Error response:', error.response?.data);
      
      // Extract error message from different possible formats
      let errorMessage = 'Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại!';
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          if (Array.isArray(error.response.data.message)) {
            errorMessage = error.response.data.message.join(', ');
          } else {
            errorMessage = error.response.data.message;
          }
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      }
      
      setErrors({
        submit: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading screen
  if (isLoadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-600 dark:text-gray-300">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Success screen
  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center animate-fadeIn">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <FaCheckCircle className="text-5xl text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Đăng Ký Thành Công!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Yêu cầu đăng ký làm chủ xe của bạn đã được gửi đi. Chúng tôi sẽ xem xét và phản hồi sớm nhất!
            </p>
          </div>
          <div className="space-y-2 text-left bg-green-50 dark:bg-gray-700 p-4 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Họ và tên:</strong> {formData.fullName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Email:</strong> {formData.email}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Số điện thoại:</strong> {formData.phone}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Ngân hàng:</strong> {formData.bank}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Đăng Ký Làm Chủ Xe
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Điền thông tin để bắt đầu cho thuê xe của bạn
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}

          {/* Avatar Upload */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Ảnh Đại Diện <span className="text-red-500">*</span>
            </label>
            
            <div className="flex flex-col items-center">
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-40 object-cover border-4 border-blue-500 shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <label className="w-full h-40 flex flex-col items-center justify-center border-gray-300 dark:border-gray-600 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors bg-gray-50 dark:bg-gray-700">
                  <FaCamera className="text-4xl text-gray-400 dark:text-gray-500 mb-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">Tải ảnh lên</span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Max 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            {errors.avatar && (
              <p className="text-red-500 text-sm mt-2 text-center">{errors.avatar}</p>
            )}
          </div>

          {/* Full Name */}
          <div className="mb-6">
            <div className="flex items-center mb-2  mb-2">
        
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 text-center ml-3 align-items-center">
              Họ và Tên <span className="text-red-500">*</span>
            </label>
            </div>
            <div className="relative">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all`}
                placeholder="Nguyễn Văn A"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
            
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all`}
                placeholder="email@example.com"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Số Điện Thoại <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all`}
                placeholder="0912345678"
                maxLength="10"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Bank */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Ngân Hàng <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              
              <select
                name="bank"
                value={formData.bank}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.bank ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all appearance-none cursor-pointer`}
              >
                <option value="">Chọn ngân hàng</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>
                    {bank}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.bank && (
              <p className="text-red-500 text-sm mt-1">{errors.bank}</p>
            )}
          </div>

          {/* Account Number */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Số Tài Khoản Ngân Hàng <span className="text-red-500">*</span>
            </label>
            <div className="relative">
             
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.accountNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all`}
                placeholder="1234567890"
              />
            </div>
            {errors.accountNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`     w-full mt-6 py-3 rounded-xl text-white font-semibold
          bg-gradient-to-r from-blue-500 to-cyan-500 ${
              isSubmitting
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'text-white hover:opacity-90 active:opacity-80 transform hover:scale-105'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang xử lý...
              </span>
            ) : (
              'Gửi Đăng Ký'
            )}
          </button>
        </form>

        {/* Info Note */}
        <div className="mt-6 bg-blue-50 dark:bg-gray-800 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <strong>Lưu ý:</strong> Thông tin của bạn sẽ được bảo mật và chỉ sử dụng cho mục đích xác thực tài khoản chủ xe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApplyOwner;