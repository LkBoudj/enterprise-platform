import * as z from "zod";

export const trim = (v: unknown) => (typeof v === "string" ? v.trim() : v);

export const zTrimmedString = z.string().trim();

export const zNonEmpty = (msg = "Required") => z.string().trim().min(1, msg);

export const zOptionalTrimmed = z.string().trim().min(1).optional();

export const zNullableOptionalTrimmed = z.string().trim().min(1).nullable().optional();

// Zod v4 preferred formats (use preprocess because z.email() / z.url() are not strings)
export const zEmail = z.preprocess(trim, z.email("Invalid email"));

export const zUrlOptional = z.preprocess(trim, z.url("Invalid URL")).optional();

export const zPhone = zTrimmedString
  .min(6, "Invalid phone")
  .max(20, "Invalid phone")
  .regex(/^[+()\-.\s\d]+$/, "Invalid phone");

// flexible id (uuid/cuid/nanoid/db id) - customize if needed
export const zId = zTrimmedString.min(1, "Invalid id");

// date helpers
export const zCoerceDateOptional = z.coerce.date().optional();
export const zCoerceDateNullableOptional = z.coerce.date().nullable().optional();

// common result helpers
export function parseOrThrow<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  return schema.parse(data);
}

export function safeParse<T extends z.ZodTypeAny>(schema: T, data: unknown) {
  return schema.safeParse(data);
}



// 1. The Generic Schema Factory Function
export const createApiResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) => {
  return z.object({
    data: z.array(itemSchema), // Here is where the "Generic" T is injected
    meta: z.object({
      total: z.number(),
      page: z.number(),
      limit: z.number(),
      lastPage: z.number(),
    }),
  });
};