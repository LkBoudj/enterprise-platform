import { useMutation, useQuery, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { productService } from '../services/productService';
import { IBaseFilter } from '@/types';
import { CreateProductDto, ProductType, UpdateProductDto } from '../validation/product.schema';

// ==============================
// 🟢 READ (GET) - Multiple Products
// ==============================

export const useGetProducts = (filters: IBaseFilter) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: async ({ signal }) => await productService.getAll(signal, filters),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

// ==============================
// 🟢 READ (GET) - Single Product
// ==============================

export const useGetProduct = (code?: string) => {
  return useQuery({
    queryKey: ['products', code],
    enabled: !!code, // Only run if CODE exists
    queryFn: ({ signal }) => productService.getById(code as string, signal),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// ==============================
// 🟡 CREATE (POST)
// ==============================

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductDto) => productService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// ==============================
// 🔵 UPDATE (PUT)
// ==============================

interface UpdateProductParams {
  code: string; // Changed from id to code
  data: UpdateProductDto;
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ code, data }: UpdateProductParams) => productService.update(code, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// ==============================
// 🔴 DELETE (DELETE)
// ==============================

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => productService.delete(code), // Changed from id to code
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
