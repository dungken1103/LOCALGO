import axios from 'axios';

const API_BASE_URL = 'https://api.localgo.com';

export const getCars = async () => {
  const response = await axios.get(`${API_BASE_URL}/cars`);
  return response.data;
};

export const getCarDetails = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/cars/${id}`);
  return response.data;
};

export const bookCar = async (bookingData) => {
  const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
  return response.data;
};