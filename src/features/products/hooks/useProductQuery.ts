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

export const useGetProduct = (id?: string) => {
  return useQuery({
    queryKey: ['products', id],
    enabled: !!id, // Only run if ID exists
    queryFn: ({ signal }) => productService.getById(id as string, signal),
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
  id: string;
  data: UpdateProductDto;
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: UpdateProductParams) => productService.update(id, data),
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
    mutationFn: (id: string) => productService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};
