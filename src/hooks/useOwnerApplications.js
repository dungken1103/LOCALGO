import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllOwnerApplications,
  getOwnerApplicationById,
  approveOwnerApplication,
  rejectOwnerApplication,
} from '../services/ownerApplicationService';
import Swal from 'sweetalert2';

/**
 * Hook to fetch all owner applications
 */
export const useOwnerApplications = () => {
  return useQuery({
    queryKey: ['ownerApplications'],
    queryFn: getAllOwnerApplications,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useOwnerApplication = (applicationId) => {
  return useQuery({
    queryKey: ['ownerApplication', applicationId],
    queryFn: () => getOwnerApplicationById(applicationId),
    enabled: !!applicationId, // Only run if applicationId exists
  });
};

export const useApproveOwnerApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: approveOwnerApplication,
    onSuccess: () => {
      // Invalidate and refetch owner applications
      queryClient.invalidateQueries({ queryKey: ['ownerApplications'] });
      
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Đã phê duyệt đơn đăng ký làm chủ xe',
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: error.response?.data?.message || 'Không thể phê duyệt đơn đăng ký',
      });
    },
  });
};


export const useRejectOwnerApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ applicationId, reviewData }) => 
      rejectOwnerApplication(applicationId, reviewData),
    onSuccess: () => {
      // Invalidate and refetch owner applications
      queryClient.invalidateQueries({ queryKey: ['ownerApplications'] });
      
      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Đã từ chối đơn đăng ký làm chủ xe',
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi!',
        text: error.response?.data?.message || 'Không thể từ chối đơn đăng ký',
      });
    },
  });
};
