import { httpClient } from '@/core/network/axios.adapter';
import { IHttpClient } from '@/core/network/http.types';
import { IBaseFilter } from '@/types';
import { CreateUserDto, UserSchema, UserType } from '../validation/user.schema'; // Ensure this path matches your structure
import { UserApiResponse } from '../types';

export class UserService {
  constructor(private readonly http: IHttpClient) { }

  // 🟢 READ ALL
  async getUsers(signal?: AbortSignal, params?: IBaseFilter): Promise<UserApiResponse> {

    return this.http.get<UserApiResponse>('/users', {
      // schema: createApiResponseSchema(UserSchema), // FORCE VALIDATION: Must be a UsersApiResponse
      signal, // ENABLE CANCELLATION
      params: { q: params?.q },
    });
  }

  // 🟢 READ ONE
  async getUserById(id: string): Promise<UserType> {
    return this.http.get<UserType>(`/users/${id}`, {
      schema: UserSchema, // FORCE VALIDATION: Must be a single User
    });
  }

  // 🟡 CREATE
  async createUser(data: CreateUserDto): Promise<UserType> {
    return this.http.post<UserType>('/users', data, {
      schema: UserSchema, // Validate the created user response
    });
  }

  // 🔵 UPDATE
  // We use Partial<CreateUserDto> to allow updating specific fields
  async updateUser(id: string, data: Partial<CreateUserDto>): Promise<UserType> {
    return this.http.put<UserType>(`/users/${id}`, data, {
      schema: UserSchema, // Validate the updated user response
    });
  }

  // 🔴 DELETE
  async deleteUser(id: string): Promise<void> {
    return this.http.delete<void>(`/users/${id}`);
  }
}

export const userService = new UserService(httpClient);
