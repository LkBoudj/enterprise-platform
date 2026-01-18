import { z } from 'zod';

// 1. Enums for fixed values (cleaner architecture)
export const UserRoleEnum = z.enum(['Admin', 'User', 'Manager']);
export const UserStatusEnum = z.enum(['active', 'inactive', 'suspended']);

// 2. The Main User Schema
export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.email({ message: "Invalid email address" }),
  role: UserRoleEnum,
  phone: z.string().min(10, { message: "Phone number is too short" }),
  status: UserStatusEnum,
  country: z.string().min(2),
  photo: z.url().optional().or(z.literal('')), // Allows valid URL, empty string, or undefined
  lastActive: z.coerce.date().optional(), // Validates ISO 8601 format
});

// 3. Export the inferred TypeScript Type for reading users
export type UserType = z.infer<typeof UserSchema>;

// 4. Schema for creating a new user (omits generated fields)
export const CreateUserSchema = UserSchema.omit({
  id: true,
  photo: true,
  lastActive: true,
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

// 5. Schema for updating an existing user (all fields are optional)
export const UpdateUserSchema = UserSchema.partial();
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
