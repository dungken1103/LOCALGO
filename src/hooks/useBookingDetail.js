import { useEffect, useState } from "react";
import bookingService from "../services/bookingService";

export const useBookingDetails = (slug) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    bookingService
      .get(slug)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [slug]);

  return { data, loading, error };
};
