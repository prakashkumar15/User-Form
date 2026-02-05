import * as z from "zod";

const phoneSchema = z.string().regex(/^\d{10}$/, {
  message: "Invalid phone number format (must be 10 digits)",
});

export const userSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: phoneSchema,
  email: z.email("Invalid email address"),
});

export type UserFormValues = z.infer<typeof userSchema>;
