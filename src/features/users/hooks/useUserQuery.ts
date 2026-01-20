import { useMutation, useQuery, keepPreviousData } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { IBaseFilter } from '@/types';
import { CreateUserDto } from '../validation/user.schema';

// ==============================
// 🟢 READ (GET)
// ==============================

export const useGetUsers = (filters: IBaseFilter) => {
  return useQuery({
    // Filter MUST be in the key to trigger refetch on change
    queryKey: ['users', filters], 
    queryFn: async ({ signal }) => await userService.getUsers(signal, filters),
    
    // UX: Keep showing old list while fetching new page
    placeholderData: keepPreviousData, 
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

export const useGetUser = (code?: string) => {
  return useQuery({
    queryKey: ['users', code], 
    enabled: !!code, // Only run if CODE exists
    queryFn: () => userService.getUserById(code as string),
    staleTime: 1000 * 60 * 5, 
  });
};

// ==============================
// 🟡 CREATE (POST)
// ==============================

export const useCreateUser = () => {
  return useMutation({
    mutationFn: (data: CreateUserDto) => userService.createUser(data),
  });
};

// ==============================
// 🔵 UPDATE (PUT/PATCH)
// ==============================

// We need an object that contains both CODE and Data
interface UpdateUserParams {
  id: string; // Changed from id to code
  data: Partial<CreateUserDto>; // Partial allows sending only changed fields
}

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ id, data }: UpdateUserParams) => userService.updateUser(id, data),
  });
};

// ==============================
// 🔴 DELETE (DELETE)
// ==============================

export const useDeleteUser = () => {
  return useMutation({
    mutationFn: (code: string) => userService.deleteUser(code), // Changed from id to code
  });
};