import { z } from 'zod';
import { createApiResponseSchema } from '@/validation/validation.helpers';

// Enums for fixed values
export const ProductStatusEnum = z.enum(['In Stock', 'Out of Stock']);

// Main Product Schema
export const ProductSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  stock: z.number().int().min(0, { message: "Stock cannot be negative" }),
  category: z.string().min(2, { message: "Category is required" }),
  status: ProductStatusEnum,
});

// Inferred TypeScript Type for a single product
export type ProductType = z.infer<typeof ProductSchema>;

// API Response Schema for a list of products
export const ProductApiResponseSchema = createApiResponseSchema(ProductSchema);
export type ProductApiResponse = z.infer<typeof ProductApiResponseSchema>;

// Schema for creating a new product (omits generated fields like id)
export const CreateProductSchema = ProductSchema.omit({ id: true });
export type CreateProductDto = z.infer<typeof CreateProductSchema>;

// Schema for updating an existing product (all fields are optional)
export const UpdateProductSchema = ProductSchema.partial();
export type UpdateProductDto = z.infer<typeof UpdateProductSchema>;
