import { z } from "zod";
import { userFields } from "./users-form";

const shape: Record<string, z.ZodTypeAny> = {};

userFields.forEach((field) => {
  // start with a base schema depending on field type
  let schema: z.ZodTypeAny;

  switch (field.type) {
    case "email":
      schema = z.string().email("Invalid email address");
      break;
    case "tel":
      // allow only digits and require exactly 10 digits
      schema = z
        .string()
        .regex(/^\d+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must be exactly 10 digits");
      break;
    case "date":
      schema = z.string().refine((value) => {
        const date = new Date(value);
        return !isNaN(date.getTime());
      }, "Invalid date");
      break;
    case "number":
      // accept numeric input as string but ensure it's a valid number
      schema = z.string().refine((value) => {
        if (value === undefined || value === null || value === "") return false;
        const num = Number(value);
        return !isNaN(num);
      }, "Invalid number");
      break;
    default:
      schema = z.string();
  }

  if (field.required) {
    shape[field.name] = (schema as z.ZodString).min(
      1,
      `${field.label} is required`,
    );
  } else {
    shape[field.name] = schema.optional();
  }
});

export const userSchema = z.object(shape);
export type UserFormValues = z.infer<typeof userSchema>;
