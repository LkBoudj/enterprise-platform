import { z } from "zod";

// ✅ roles (DummyJSON ممكن ما يرجع role دائمًا، لذلك نخليه اختياري)
export const UserRoleEnum = z.enum(["admin", "moderator", "user"]);
export type UserRole = z.infer<typeof UserRoleEnum>;

// ✅ schemas فرعية
export const CoordinatesSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const AddressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: z.string(),
  stateCode: z.string().optional(),
  postalCode: z.string().optional(),
  coordinates: CoordinatesSchema.optional(),
  country: z.string().optional(),
});

export const HairSchema = z.object({
  color: z.string().optional(),
  type: z.string().optional(),
});

export const CompanySchema = z
  .object({
    department: z.string().optional(),
    name: z.string().optional(),
    title: z.string().optional(),
    address: AddressSchema.optional(),
  })
  .optional();

// ✅ main user schema (DummyJSON)
export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  maidenName: z.string().optional(),
  age: z.number().int().nonnegative().optional(),
  gender: z.enum(["male", "female"]).optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  username: z.string().min(1),

  // ملاحظة: DummyJSON قد يرجع password في بعض endpoints، لا تعتمد عليه في UI
  password: z.string().optional(),

  birthDate: z.string().optional(), // "1996-5-30" ليس ISO كامل دائمًا
  image: z.string().url().optional(),

  bloodGroup: z.string().optional(),
  height: z.number().optional(),
  weight: z.number().optional(),
  eyeColor: z.string().optional(),
  hair: HairSchema.optional(),

  address: AddressSchema.optional(),
  company: CompanySchema,

  role: UserRoleEnum.optional(), // إذا موجود عندك
});

// ✅ TypeScript type
export type UserType = z.infer<typeof UserSchema>;

// ✅ Create / Update (لأن DummyJSON غالبًا تجريبي، نخليها “واجهة” فقط)
export const CreateUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  username: z.string().min(1).optional(),
  gender: z.enum(["male", "female"]).optional(),
  image: z.string().url().optional(),
  role: UserRoleEnum.optional(),
  address: AddressSchema.partial().optional(),
});
export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
