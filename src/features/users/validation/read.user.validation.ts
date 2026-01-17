// read.user.validation.ts
import { z } from 'zod';
import { zId, zEmail, zPhone, zOptionalTrimmed } from '@/validation/validation.helpers';

// Define Enums separately for reusability
export const UserRoleEnum = z.enum(['Admin', 'User', 'Manager']);
export const UserStatusEnum = z.enum(['active', 'inactive', 'suspended']);

export const UserSchema = z.object({
  id: zId,

  name: z.string().trim().min(1, { message: 'Name cannot be empty' }),

  email: zEmail,

  role: UserRoleEnum,

  phone: zPhone,

  status: UserStatusEnum,

  country: z.string().trim().min(1, { message: 'Country is required' }),

  // Allow URL or any non-empty string (file path / stored key)
  photo: zOptionalTrimmed.or(z.url('Invalid URL')),

  // Allow Date or ISO string; optional because sometimes list endpoints omit it
  lastActive: z.coerce.date().optional(),
});

// Export the Type derived from the Schema
export type UserType = z.infer<typeof UserSchema>;
