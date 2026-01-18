import { httpClient } from '@/core/network/axios.adapter'; // Using the consistent http client
import { IHttpClient } from '@/core/network/http.types';
import { ApiResponse, IBaseFilter } from '@/types';
import {
  CreateProductDto,
  ProductSchema,
  ProductType,
  UpdateProductDto,
} from '../validation/product.schema';

// This is an interface for basic CRUD operations.
// ICrudService (Interface for Create, Read, Update, Delete)
// <T> is the main entity type (e.g., ProductType, UserType)
// <C> is the Create DTO (Data Transfer Object) type
// <U> is the Update DTO type
export interface ICrudService<T, C, U> {
  // Read operations
  getAll(signal?: AbortSignal, params?: IBaseFilter): Promise<ApiResponse<T>>;
  getById(id: string, signal?: AbortSignal): Promise<T>;

  // Write operations
  create(data: C): Promise<T>;
  update(id: string, data: U): Promise<T>;
  delete(id: string): Promise<void>;
}

// ProductService: Implements ICrudService for ProductType
export class ProductService implements ICrudService<ProductType, CreateProductDto, UpdateProductDto> {
  // Dependency Injection: httpClient is passed during instantiation
  constructor(private readonly http: IHttpClient) {}

  // Retrieves a list of products with optional filters
  async getAll(signal?: AbortSignal, params?: IBaseFilter): Promise<ApiResponse<ProductType>> {
    return this.http.get<ApiResponse<ProductType>>('/products', {
      // schema: createApiResponseSchema(ProductSchema), // Removed as per userService pattern
      signal,
      params,
    });
  }

  // Retrieves a single product by its ID
  async getById(id: string, signal?: AbortSignal): Promise<ProductType> {
    return this.http.get<ProductType>(`/products/${id}`, {
      schema: ProductSchema, // Validates the response against the ProductSchema
      signal,
    });
  }

  // Creates a new product
  async create(data: CreateProductDto): Promise<ProductType> {
    return this.http.post<ProductType>('/products', data, {
      schema: ProductSchema, // Validates the response against the ProductSchema
    });
  }

  // Updates an existing product by its ID
  async update(id: string, data: UpdateProductDto): Promise<ProductType> {
    return this.http.put<ProductType>(`/products/${id}`, data, {
      schema: ProductSchema, // Validates the response against the ProductSchema
    });
  }

  // Deletes a product by its ID
  async delete(id: string): Promise<void> {
    return this.http.delete<void>(`/products/${id}`);
  }
}

// Export a singleton instance of ProductService
export const productService = new ProductService(httpClient);