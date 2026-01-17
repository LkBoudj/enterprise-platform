import apiClient from '@/lib/apiClient';
import { ApiError } from '@/lib/apiError';
import { CreateUserType } from '../validation/create.user.validation';
import { UserType } from '../validation/read.user.validation';
import { UpdateUserType } from '../validation/update.user.validation';

interface ApiResponse<T> {
  data: T;
  success?: boolean;
  message: string;
  errors?: any;
}
/**
 * Fetches a list of all users from the API.
 * @returns A promise that resolves to an array of UserType.
 */

const getUsers = async (): Promise<UserType[]> => {
  try {
    const response = await apiClient.get<UserType[]>('/users');
    return response.data;
  } catch (error) {
    // The error is already an instance of ApiError thanks to the interceptor
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

/**
 * Fetches a single user by their ID.
 * @param userId The ID of the user to fetch.
 * @returns A promise that resolves to a UserType object.
 */
const getUserById = async (userId: string): Promise<UserType> => {
  try {
    const response = await apiClient.get<UserType>(`/users/${userId}`);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      // Provide a more specific error message for this common case
      throw new ApiError({
        ...error,
        message: `User with ID "${userId}" was not found.`,
      });
    }
    console.error(`Failed to fetch user ${userId}:`, error);
    throw error;
  }
};

/**
 * Creates a new user.
 * @param userData The data for the new user.
 * @returns A promise that resolves to the newly created UserType object.
 */
const createUser = async (userData: CreateUserType): Promise<UserType> => {
  try {
    const response = await apiClient.post<UserType>('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

/**
 * Updates an existing user by their ID.
 * @param userId The ID of the user to update.
 * @param updates The data to update.
 * @returns A promise that resolves to the updated UserType object.
 */
const updateUser = async (userId: string, updates: UpdateUserType): Promise<UserType> => {
  try {
    const response = await apiClient.patch<UserType>(`/users/${userId}`, updates);
    return response.data;
  } catch (error) {
    console.error(`Failed to update user ${userId}:`, error);
    throw error;
  }
};

/**
 * Deletes a user by their ID.
 * @param userId The ID of the user to delete.
 * @returns A promise that resolves when the user is deleted.
 */
const deleteUser = async (userId: string): Promise<void> => {
  try {
    await apiClient.delete(`/users/${userId}`);
  } catch (error) {
    console.error(`Failed to delete user ${userId}:`, error);
    throw error;
  }
};

export const userService = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
