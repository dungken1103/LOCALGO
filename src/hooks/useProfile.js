import { useQuery } from '@tanstack/react-query';
import userService from '../services/userService';

export const ProfileKeys = {
  all: ['profiles'],
  byId: (userId) => ['profiles', userId],
};


export function useProfile(userId) {
  return useQuery({
    queryKey: ProfileKeys.byId(userId),
    queryFn: () => userService.getUserById(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 10, // 10 minutes
  });
}