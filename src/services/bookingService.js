import { get } from "react-hook-form";
import { apiClient } from "../utils/apiClient";
import axios from "axios";

const bookingService = {
  create: (data) =>
    apiClient.post("/booking/create", data).then(res => res.data),

  getBySlug: (slug) =>
    apiClient.get(`/booking?slug=${slug}`).then(res => res.data),

  // Get all bookings for renter with optional status filter
  // Status: active, pending_confirmation, completed, canceled
  getRenterBookings: (status) => {
    const url = status 
      ? `/booking/renter?status=${status}` 
      : '/booking/renter';
    return apiClient.get(url).then(res => res.data);
  },

  // Get all bookings for current user (legacy)
  getMyBookings: () =>
    apiClient.get("/booking/my-bookings").then(res => res.data),

  // Get bookings by status (legacy)
  getBookingsByStatus: (status) =>
    apiClient.get(`/booking/my-bookings?status=${status}`).then(res => res.data),

  // Update booking status (PENDING_CONFIRMATION -> ACTIVE or CANCELLED)
  updateBookingStatus: ({ slug, status }) =>
    apiClient.patch('/booking/update-status', { slug, status }).then(res => res.data),

  // Extend booking
  extendBooking: (bookingId, data) =>
    apiClient.put(`/booking/${bookingId}/extend`, data).then(res => res.data),
};

export default bookingService;
