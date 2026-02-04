import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import bookingService from '../services/bookingService';

// Query keys
export const bookingKeys = {
  all: ['bookings'],
  renter: (status) => ['bookings', 'renter', status].filter(Boolean),
  owner: () => ['bookings', 'owner'],
};


export function useRenterBookings(status = null) {
  return useQuery({
    queryKey: bookingKeys.renter(status),
    queryFn: () => bookingService.getRenterBookings(status),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (previously cacheTime)
  });
}

export function useOwnerBookings() {
  return useQuery({
    queryKey: bookingKeys.owner(),
    queryFn: async () => {
      const response = await bookingService.getOwnerBookings();
      return response.success ? response.data : [];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
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

/**
 * Hook to update booking status by owner
 */
export function useUpdateBookingStatusByOwner() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookingId, status }) => 
      bookingService.updateBookingStatusByOwner(bookingId, status),
    onSuccess: () => {
      // Invalidate owner bookings query
      queryClient.invalidateQueries({ queryKey: bookingKeys.owner() });
    },
    onError: (error) => {
      console.error('Error updating booking status:', error);
    },
  });
}
