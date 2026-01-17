import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/userService';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });
};

export const useGetUser = (id?: string) => {
  
  return useQuery({
    queryKey: ['user'],
    enabled:  Boolean(id),
    queryFn: () => userService.getUserById(id as string),
    staleTime: 60_000, 
  });
};
