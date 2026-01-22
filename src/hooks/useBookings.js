import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import bookingService from '../services/bookingService';

// Query keys
export const bookingKeys = {
  all: ['bookings'],
  renter: (status) => ['bookings', 'renter', status].filter(Boolean),
};


export function useRenterBookings(status = null) {
  return useQuery({
    queryKey: bookingKeys.renter(status),
    queryFn: () => bookingService.getRenterBookings(status),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, status }) => bookingService.updateBookingStatus({ slug, status }),
    onSuccess: () => {
      // Invalidate all renter bookings queries
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
    },
  });
}

/**
 * Hook to extend a booking
 */
export function useExtendBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, data }) => bookingService.extendBooking(bookingId, data),
    onSuccess: () => {
      // Invalidate all renter bookings queries
      queryClient.invalidateQueries({ queryKey: bookingKeys.all });
    },
  });
}
