import { get } from "react-hook-form";
import { apiClient } from "../utils/apiClient";
import axios from "axios";

const bookingService = {
  create: (data) =>
    apiClient.post("/booking/create", data).then(res => res.data),

  getBySlug: (slug) =>
    apiClient.get(`/booking?slug=${slug}`).then(res => res.data),
};

export default bookingService;
